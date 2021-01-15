require('dotenv').config();
const rp = require('request-promise');
const jsdom = require("jsdom");
const nodemailer = require('nodemailer');
const { JSDOM } = jsdom;

const PAGE_URL = 'http://boatagent.com/?sajt=kopbat_katalog&kategori=segelbat';
const IMG_URL = 'http://boatagent.com/';
const YACHT_URL = 'http://boatagent.com';
let PREV_TABLE = [];

const compareArrays = (array, newArray) => {
  const newElements = [];
  newArray.forEach((newelement) => {
    let flag = true;
    array.forEach((element) => {
      if(element.id === newelement.id) flag = false;
    })
    if(flag){
      newElements.push(newelement);
    }
  });
  return newElements;
};

const monitoringFunction = () => {
  rp(PAGE_URL)
  .then(function(content){
    const dom = new JSDOM(content);
    let table = [];
    dom.window.document.querySelectorAll("#content > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table:nth-child(10) > tbody > tr[bgcolor]").forEach((elem, index) => {
      let flag = false;
      if(elem.querySelector('font')) flag = true
      if(!flag) table.push({
        id: elem.querySelector('a').getAttribute('href').substring(1),
        name: elem.querySelector('.bat').textContent,
        yacht_url: YACHT_URL + elem.querySelector('a').getAttribute('href'),
        image_url: IMG_URL + elem.querySelector('img').getAttribute('src'),
        desc: elem.querySelector('p').textContent
      });
    }); 
    
    const newBoatsTable = compareArrays(PREV_TABLE, table);

    if(newBoatsTable.length > 0){
      //send notification
      console.log('send notification');

      let transporter = nodemailer.createTransport({
        host: "in-v3.mailjet.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });

      let mailOptions = {
        from: 'batagentBot@gmail.com',
        to: ["jakub.k.olejnik@gmail.com"], // pass here your emails
        subject: 'New Boats avaliable!',
        html: `
        <div style="background-color: #d4d4d4; padding: 20px; font-family: sans-serif; max-width: 400px; margin: 0 auto;">
          <p style="font-weight: bold; margin: 0 auto; text-align: center; margin-bottom: 20px; font-size: 20px;"> Nowe łódki na stronie Batgent.se!!!</h1>
          ${newBoatsTable.map(boat =>  `<div style="display: flex; flex-direction: row; margin: 20px 0; align-items: center; background-color: #e3e3e3e3;">
              <img src="${boat.image_url}" alt="lodka" style="height: 100%; display: block; margin: auto 0;"/>
              <div style="padding: 10px;">
                <p style="font-weight: bold;">${boat.name}</p>
                <p>${boat.desc}</p>
                <a href="${boat.yacht_url}" style="color: #0092c2; padding: 5px 10px;">zobacz łódkę</a>
              </div>
            </div>`
          ).join('')}
        </div>`
      };
      transporter.sendMail(mailOptions, function(error, data){
        if(error) console.error('error', error)
        else console.log('Email was send')
      })
    }
    PREV_TABLE = table;
  })
  .catch(function(err){
    console.error(`Error connecting to page`, err);
  });
};


console.log('Start batagent monitoring...');
setInterval(monitoringFunction, 5000);
