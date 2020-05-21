const puppeteer = require('puppeteer');

async function scraperPruduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // const [e1] = await page.$x('/html/body/div[2]/div[1]/div[2]/div[5]/div[2]/div/div[1]/div/div/div/div[1]/div[1]/ul/li[1]/span/span/div/img');
    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imgUrl = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const rawTxt = await txt.jsonValue();
    const product_title = rawTxt.trim();


   // var matches = rawTxt.match(/[a-zA-Z]+/);

    const [el3] = await page.$x('//*[@id="priceblock_ourprice"]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    const [el4] = await page.$x('//*[@id="ourprice_shippingmessage"]');
    const txt3 = await el4.getProperty('textContent');
    const shipping = await txt3.jsonValue();





   // console.log({imgUrl, product_title, price, shipping});
   //  console.log({url, imgUrl, product_title, price});
     console.log({product_title, price});


    browser.close();

}

scraperPruduct('https://www.amazon.de/dp/B01MYADZ65/ref=dp_cerb_1');

scraperPruduct('https://www.amazon.de/gp/product/B01FDLD52A/ref=ox_sc_act_title_1?smid=APLJ5AXPSKRV0&psc=1');
scraperPruduct('https://www.amazon.de/gp/product/B07JQZ9KC5/ref=ox_sc_saved_title_4?smid=A2HPDDVOO82QB3&psc=1');
scraperPruduct('https://www.amazon.de/gp/product/B07S9TDM3T/ref=ox_sc_saved_title_7?smid=ARNP85SXIOHPU&psc=1');

