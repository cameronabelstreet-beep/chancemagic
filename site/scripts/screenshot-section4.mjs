import puppeteer from "puppeteer-core";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..", "..");
const outDir = path.join(projectRoot, "screenshots");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3000/";

const VIEWPORTS = [
  { name: "section4-desktop-1440", width: 1440, height: 900 },
  { name: "section4-mobile-375", width: 375, height: 812 },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: null,
  args: ["--hide-scrollbars", "--disable-gpu"],
});

try {
  for (const v of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 1 });
    await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });

    // Scroll to #services and wait for fonts + intersection-trigger animations to settle.
    await page.evaluate(() => {
      const el = document.getElementById("services");
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    });
    await page.evaluate(() => document.fonts ? document.fonts.ready : Promise.resolve());
    await new Promise((r) => setTimeout(r, 1500));

    const out = path.join(outDir, `${v.name}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`wrote ${out}`);
    await page.close();
  }
} finally {
  await browser.close();
}
