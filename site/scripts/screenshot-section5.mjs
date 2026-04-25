import puppeteer from "puppeteer-core";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..", "..");
const outDir = path.join(projectRoot, "screenshots");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3000/";

const VIEWPORTS = [
  { name: "section5-desktop-1440", width: 1440, height: 900 },
  { name: "section5-mobile-375", width: 375, height: 812 },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: null,
  args: ["--hide-scrollbars", "--disable-gpu"],
});

const consoleErrors = [];

try {
  for (const v of VIEWPORTS) {
    const page = await browser.newPage();
    page.on("pageerror", (err) => consoleErrors.push(`[${v.name}] pageerror: ${err.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(`[${v.name}] console.error: ${msg.text()}`);
    });

    await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 1 });
    await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });

    await page.evaluate(() => {
      const el = document.getElementById("video");
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    });
    await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
    await new Promise((r) => setTimeout(r, 1500));

    const out = path.join(outDir, `${v.name}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`wrote ${out}`);
    await page.close();
  }
} finally {
  await browser.close();
}

if (consoleErrors.length) {
  console.log("\n--- Console errors ---");
  for (const e of consoleErrors) console.log(e);
  process.exitCode = 1;
} else {
  console.log("\nNo console errors.");
}
