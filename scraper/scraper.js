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


    const [el3] = await page.$x('//*[@id="priceblock_ourprice"]');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    const [el4] = await page.$x('//*[@id="ourprice_shippingmessage"]');
    const txt3 = await el4.getProperty('textContent');
    const shipping = await txt3.jsonValue();



    console.log({imgUrl, rawTxt, price, shipping});

    browser.close();

}

scraperPruduct('https://www.amazon.de/dp/B01MYADZ65/ref=dp_cerb_1');

