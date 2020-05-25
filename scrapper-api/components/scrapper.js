const puppeteer = require('puppeteer');

const decode = (str) =>  {
  let s = decodeURIComponent(str.replace(/\+/g, ' '));
  s = removeLastHyphen(s);

  return s;
}

const removeLastHyphen = (str) => {
  if (str.slice(-1) == '/') {
    return str.slice(0, -1);  
  }
  return str;
}

const sanitize = (str) => {
  let l = str.replace('https://gate.sc?url=', '');
  l = l.substring(0, l.lastIndexOf('&token'));


  return l;
};

const scrape = async (url) => {
  const link = url;

  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 100,
    devtools: true,
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1199,
    height: 900,
  });
  await page.goto(link);
  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    const s = document.getElementsByClassName('web-profile sc-link-light');
    let userName = document.querySelector('.profileHeaderInfo__userName');

    while (userName.childNodes.length !== 1) {
      userName.lastChild.remove();
    }
    userName = userName.innerHTML.trim();
    const links = Array.from(s).map((v) => v.getAttribute('href'));
    return { userName, links};
  });

  browser.close();
  return {...result, scLink: link};
};

module.exports.sanitize = sanitize;
module.exports.scrape = scrape;
module.exports.decode = decode;
