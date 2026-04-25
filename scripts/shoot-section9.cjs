const path = require('path');
const puppeteer = require(path.resolve(__dirname, '..', 'site', 'node_modules', 'puppeteer-core'));

const CHROME =
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.env.SITE_URL || 'http://localhost:3004/';

async function shoot(viewport, outFile) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    defaultViewport: viewport,
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
  });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await page.evaluate(() => {
    const el = document.querySelector('#book');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 3500));
  await page.screenshot({ path: outFile, type: 'png' });
  await browser.close();
  console.log('wrote', outFile);
}

(async () => {
  const out = path.resolve(__dirname, '..', 'screenshots');
  await shoot(
    { width: 1440, height: 900, deviceScaleFactor: 1 },
    path.join(out, 'section9-desktop-1440.png')
  );
  await shoot(
    { width: 375, height: 812, deviceScaleFactor: 2, isMobile: true },
    path.join(out, 'section9-mobile-375.png')
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
