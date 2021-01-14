const rp = require('request-promise');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const PAGE_URL = 'http://boatagent.com/?sajt=kopbat_katalog&kategori=segelbat';
const IMG_URL = 'http://boatagent.com/';
const YACHT_URL = 'http://boatagent.com';
// let PREV_TABLE = [];
let PREV_TABLE = [
  {
    id: '4753',
    name: 'Arcona 370 RESERVERAD',
    yacht_url: 'http://boatagent.com/4753',
    image_url: 'http://boatagent.com/images/objekt/4753/standard_thumb1.jpg',
    desc: 'Year of production: 2004 - Price: 1 350 000 SEK / 133 179 EURO / 990 857 DKK'
  },
  {
    id: '4751',
    name: 'Arcona 355 RESERVERAD',
    yacht_url: 'http://boatagent.com/4751',
    image_url: 'http://boatagent.com/images/objekt/4751/standard_thumb1.jpg',
    desc: 'Year of production: 2007 - Price: 895 000 SEK / 88 293 EURO / 656 901 DKK'
  },
  {
    id: '4747',
    name: 'Brofjord 36 ',
    yacht_url: 'http://boatagent.com/4747',
    image_url: 'http://boatagent.com/images/objekt/4747/standard_thumb1.jpg',
    desc: 'Year of production: 1991 - Price: 695 000 SEK / 68 562 EURO / 510 108 DKK'
  },
  {
    id: '4745',
    name: 'Hanse 415',
    yacht_url: 'http://boatagent.com/4745',
    image_url: 'http://boatagent.com/images/objekt/4745/standard_thumb1.jpg',
    desc: 'Year of production: 2017 - Price: 2 400 000 SEK / 236 762 EURO / 1 761 523 DKK'
  },
  {
    id: '4739',
    name: 'Comfortina 32 RESERVERAD',
    yacht_url: 'http://boatagent.com/4739',
    image_url: 'http://boatagent.com/images/objekt/4739/standard_thumb1.jpg',
    desc: 'Year of production: 1988 - Price: 350 000 SEK / 34 528 EURO / 256 889 DKK'
  },
  {
    id: '4737',
    name: 'Nauticat 37 ',
    yacht_url: 'http://boatagent.com/4737',
    image_url: 'http://boatagent.com/images/objekt/4737/standard_thumb1.jpg',
    desc: 'Year of production: 2008 - Price: 2 295 000 SEK / 226 404 EURO / 1 684 457 DKK'
  },
  {
    id: '4239',
    name: 'Finngulf 41 RESERVERET',
    yacht_url: 'http://boatagent.com/4239',
    image_url: 'http://boatagent.com/images/objekt/4239/standard_thumb1.jpg',
    desc: 'Year of production: 2007 - Price: 1 345 000 DKK / 1 832 505 SEK / 180 778 EURO'
  },
  {
    id: '4731',
    name: 'Dehler 41 CR',
    yacht_url: 'http://boatagent.com/4731',
    image_url: 'http://boatagent.com/images/objekt/4731/standard_thumb1.jpg',
    desc: 'Year of production: 1997 - Price: 1 090 000 SEK / 107 530 EURO / 800 025 DKK'
  },
  {
    id: '4479',
    name: 'Boström 42 Karinika',
    yacht_url: 'http://boatagent.com/4479',
    image_url: 'http://boatagent.com/images/objekt/4479/standard_thumb1.jpg',
    desc: 'Year of production: 1967 - Price: 495 000 SEK / 48 832 EURO / 363 314 DKK'
  },
  {
    id: '1563',
    name: 'Havskryssare KR-S11',
    yacht_url: 'http://boatagent.com/1563',
    image_url: 'http://boatagent.com/images/objekt/1563/standard_thumb1.jpg',
    desc: 'Year of production: 1936 - Price: 300 000 SEK / 29 595 EURO / 220 190 DKK'
  },
  {
    id: '4721',
    name: 'Moody S31',
    yacht_url: 'http://boatagent.com/4721',
    image_url: 'http://boatagent.com/images/objekt/4721/standard_thumb1.jpg',
    desc: 'Year of production: 1997 - Price: 360 000 SEK / 35 514 EURO / 264 228 DKK'
  },
  {
    id: '4483',
    name: 'Gambler 38',
    yacht_url: 'http://boatagent.com/4483',
    image_url: 'http://boatagent.com/images/objekt/4483/standard_thumb1.jpg',
    desc: 'Year of production: 1989 - Price: 550 000 SEK / 54 258 EURO / 403 682 DKK'
  },
  {
    id: '4649',
    name: 'Grand Soleil 43 RESERVERAD',
    yacht_url: 'http://boatagent.com/4649',
    image_url: 'http://boatagent.com/images/objekt/4649/standard_thumb1.jpg',
    desc: 'Year of production: 2007 - Price: 2 250 000 SEK / 221 965 EURO / 1 651 428 DKK'
  },
  {
    id: '4635',
    name: 'Nauticat 33 RESERVERAD',
    yacht_url: 'http://boatagent.com/4635',
    image_url: 'http://boatagent.com/images/objekt/4635/standard_thumb1.jpg',
    desc: 'Year of production: 1977 - Price: 495 000 SEK / 48 832 EURO / 363 314 DKK'
  },
  {
    id: '4589',
    name: 'Colin Archer 40',
    yacht_url: 'http://boatagent.com/4589',
    image_url: 'http://boatagent.com/images/objekt/4589/standard_thumb1.jpg',
    desc: 'Year of production: 1998 - Price: 195 000 EUR / 1 976 665 SEK'
  },
  {
    id: '4327',
    name: 'Nauticat 44',
    yacht_url: 'http://boatagent.com/4327',
    image_url: 'http://boatagent.com/images/objekt/4327/standard_thumb1.jpg',
    desc: 'Year of production: 2005 - Price: 260 000 EUR / 2 635 554 SEK'
  },
  {
    id: '4491',
    name: 'Havskryssare Olle Enderlein',
    yacht_url: 'http://boatagent.com/4491',
    image_url: 'http://boatagent.com/images/objekt/4491/standard_thumb1.jpg',
    desc: 'Year of production: 1961 - Price: 45 000 EUR / 456 154 SEK'
  },
  {
    id: '4461',
    name: 'Hallberg Rassy 37',
    yacht_url: 'http://boatagent.com/4461',
    image_url: 'http://boatagent.com/images/objekt/4461/standard_thumb1.jpg',
    desc: 'Year of production: 2005 - Price: 1 975 000 SEK / 194 836 EURO / 1 449 587 DKK'
  },
  {
    id: '3977',
    name: 'Sparkman & Stephens Pilot Class Yawl',
    yacht_url: 'http://boatagent.com/3977',
    image_url: 'http://boatagent.com/images/objekt/3977/standard_thumb1.jpg',
    desc: 'Year of production: 1961 - Price: 58 000 EUR / 587 931 SEK'
  },
  {
    id: '4291',
    name: 'Hans Christian Christina 43',
    yacht_url: 'http://boatagent.com/4291',
    image_url: 'http://boatagent.com/images/objekt/4291/standard_thumb1.jpg',
    desc: 'Year of production: 1987 - Price: 2 325 000 SEK / 229 364 EURO / 1 706 476 DKK'
  },
  {
    id: '4219',
    name: 'Arcona 460',
    yacht_url: 'http://boatagent.com/4219',
    image_url: 'http://boatagent.com/images/objekt/4219/standard_thumb1.jpg',
    desc: 'Year of production: 2007 - Price: 2 995 000 SEK / 295 460 EURO / 2 198 234 DKK'
  },
  {
    id: '4203',
    name: 'Elan 40',
    yacht_url: 'http://boatagent.com/4203',
    image_url: 'http://boatagent.com/images/objekt/4203/standard_thumb1.jpg',
    desc: 'Year of production: 2002 - Price: 55 000 EUR / 557 521 SEK'
  },
  {
    id: '4199',
    name: 'Colin Archer 30',
    yacht_url: 'http://boatagent.com/4199',
    image_url: 'http://boatagent.com/images/objekt/4199/standard_thumb1.jpg',
    desc: 'Year of production: 2011 - Price: 105 000 EUR / 1 064 358 SEK'
  },
  {
    id: '4119',
    name: 'Colin Archer 30',
    yacht_url: 'http://boatagent.com/4119',
    image_url: 'http://boatagent.com/images/objekt/4119/standard_thumb1.jpg',
    desc: 'Year of production: 2014 - Price: 125 000 EUR / 1 267 093 SEK'
  },
  {
    id: '3343',
    name: 'Baltic 42 C C',
    yacht_url: 'http://boatagent.com/3343',
    image_url: 'http://boatagent.com/images/objekt/3343/standard_thumb1.jpg',
    desc: 'Year of production: 1978 - Price: 88 000 EUR / 892 034 SEK'
  },
  {
    id: '3747',
    name: 'Beneteau Oceanis 331 Clipper',
    yacht_url: 'http://boatagent.com/3747',
    image_url: 'http://boatagent.com/images/objekt/3747/standard_thumb1.jpg',
    desc: 'Year of production: 2003 - Price: 45 000 EUR / 456 154 SEK'
  },
  {
    id: '3731',
    name: 'Salona 45',
    yacht_url: 'http://boatagent.com/3731',
    image_url: 'http://boatagent.com/images/objekt/3731/standard_thumb1.jpg',
    desc: 'Year of production: 2015 - Price: 120 000 EUR / 1 216 409 SEK'
  },
  {
    id: '217',
    name: 'M/S JUDITH Båt med möjligheter ',
    yacht_url: 'http://boatagent.com/217',
    image_url: 'http://boatagent.com/images/objekt/217/standard_thumb1.jpg',
    desc: 'Year of production: 1929 - Price: 0 SEK / 0 EURO / 0 DKK'
  }
]
;


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
    }

    PREV_TABLE = table;


  })
  .catch(function(err){
    console.error(`Error connecting to page`, err);
  });
};


console.log('Start batagent monitoring...');
setInterval(monitoringFunction, 5000);
// monitoringFunction();
