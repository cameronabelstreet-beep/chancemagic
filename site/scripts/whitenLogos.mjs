import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGOS_DIR = path.join(__dirname, "..", "public", "images", "logos");

const FILES = [
  "deloitte.jpg",
  "disney.png",
  "google.png",
  "coca-cola.webp",
  "microsoft.png",
  "raptors.jpg",
  "toronto.jpg",
];

for (const file of FILES) {
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  const inputPath = path.join(LOGOS_DIR, file);
  const outputPath = path.join(LOGOS_DIR, `${base}-white.png`);

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const out = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const origAlpha = data[i + 3];

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    let alpha = Math.round(255 - lum);
    if (alpha < 6) alpha = 0;
    alpha = Math.min(alpha, origAlpha);

    out[i] = 255;
    out[i + 1] = 255;
    out[i + 2] = 255;
    out[i + 3] = alpha;
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`✓ ${file} → ${path.basename(outputPath)}`);
}
