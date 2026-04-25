// Click through all 3 form steps + verify success state.
// Outputs screenshots so transitions can be eyeballed.
const path = require('path');
const puppeteer = require(path.resolve(__dirname, '..', 'site', 'node_modules', 'puppeteer-core'));

const CHROME =
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.env.SITE_URL || 'http://localhost:3004/';

(async () => {
  const out = path.resolve(__dirname, '..', 'screenshots');
  const errors = [];
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    defaultViewport: { width: 1440, height: 1100, deviceScaleFactor: 1 },
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
  });
  const page = await browser.newPage();
  page.on('console', (msg) => {
    const text = msg.text();
    if (
      msg.type() === 'error' &&
      !text.includes('favicon') &&
      !text.includes('Failed to load resource: the server responded with a status of 404')
    ) {
      errors.push('console.error: ' + text);
    }
  });
  page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
  page.on('response', (res) => {
    if (res.status() === 404 && !res.url().includes('favicon')) {
      errors.push('404: ' + res.url());
    }
  });

  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await page.evaluate(() => {
    document.querySelector('#book')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 2500));

  // Step 1 — fill required fields
  await page.type('#bk-name', 'Test Person');
  await page.type('#bk-email', 'test@example.com');
  await page.screenshot({
    path: path.join(out, 'section9-flow-step1.png'),
  });

  // Click Next
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find((b) => b.textContent && b.textContent.includes('Next'));
    next?.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  // Step 2
  await page.select('#bk-event-type', 'wedding');
  await page.evaluate(() => {
    const el = document.querySelector('#bk-date');
    if (el) {
      el.value = '2026-08-15';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await page.select('#bk-guests', '150-300');
  await page.type('#bk-location', 'Toronto');
  await page.screenshot({
    path: path.join(out, 'section9-flow-step2.png'),
  });

  // Click Next
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const next = btns.find((b) => b.textContent && b.textContent.includes('Next'));
    next?.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  // Step 3 — toggle 2 service pills, fill notes
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const close = btns.find((b) => b.textContent && b.textContent.trim() === 'Close-Up Magic');
    const stage = btns.find((b) => b.textContent && b.textContent.trim() === 'Stage Show');
    close?.click();
    stage?.click();
  });
  await page.type('#bk-notes', 'Outdoor reception, around 200 guests.');
  await page.screenshot({
    path: path.join(out, 'section9-flow-step3.png'),
  });

  // Submit
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submit = btns.find(
      (b) => b.textContent && b.textContent.includes('Send My Inquiry'),
    );
    submit?.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(out, 'section9-flow-success.png'),
  });

  await browser.close();

  if (errors.length) {
    console.log('PAGE ERRORS:');
    errors.forEach((e) => console.log(' - ' + e));
    process.exit(1);
  } else {
    console.log('OK — no console errors. wrote step1, step2, step3, success screenshots.');
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
