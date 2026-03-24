/**
 * Generate all static image assets for ClearTalk.
 * Design: Overlapping circles (connection motif) + Magazine OG layout.
 * Run: node scripts/generate-assets.mjs
 */
import sharp from 'sharp';
import { mkdirSync } from 'fs';

const OUT = 'public/assets';
mkdirSync(OUT, { recursive: true });

// Brand colors
const D = '#e8614d';
const I = '#d4a017';
const S = '#2d9f83';
const C = '#5b7fa6';
const BG = '#faf8f5';
const TEXT = '#2c2926';
const MUTED = '#5c5854';

// ---- App Icon: Overlapping circles (connection motif) ----
function iconSvg(size) {
  const s = size;
  const r = s * 0.16;
  const gap = s * 0.11;
  const cx = s / 2, cy = s / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" rx="${s * 0.18}" fill="${BG}"/>
  <circle cx="${cx - gap}" cy="${cy - gap}" r="${r}" fill="${D}" opacity="0.7"/>
  <circle cx="${cx + gap}" cy="${cy - gap}" r="${r}" fill="${I}" opacity="0.7"/>
  <circle cx="${cx + gap}" cy="${cy + gap}" r="${r}" fill="${S}" opacity="0.7"/>
  <circle cx="${cx - gap}" cy="${cy + gap}" r="${r}" fill="${C}" opacity="0.7"/>
</svg>`;
}

// ---- OG Image: Magazine layout (motif left, text right) ----
function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>

  <!-- DISC motif, overlapping circles, left side -->
  <circle cx="260" cy="260" r="80" fill="${D}" opacity="0.12"/>
  <circle cx="370" cy="260" r="80" fill="${I}" opacity="0.12"/>
  <circle cx="370" cy="370" r="80" fill="${S}" opacity="0.12"/>
  <circle cx="260" cy="370" r="80" fill="${C}" opacity="0.12"/>
  <circle cx="260" cy="260" r="32" fill="${D}" opacity="0.8"/>
  <circle cx="370" cy="260" r="26" fill="${I}" opacity="0.8"/>
  <circle cx="370" cy="370" r="36" fill="${S}" opacity="0.8"/>
  <circle cx="260" cy="370" r="29" fill="${C}" opacity="0.8"/>

  <!-- Wordmark -->
  <text x="520" y="295" font-family="Georgia, serif" font-size="72" font-weight="400" fill="${TEXT}">ClearTalk</text>

  <!-- Tagline -->
  <text x="520" y="355" font-family="-apple-system, sans-serif" font-size="26" fill="${MUTED}">A tool that helps you talk to people better</text>

  <!-- Bottom accent bar -->
  <rect x="0" y="600" width="300" height="30" fill="${D}" opacity="0.5"/>
  <rect x="300" y="600" width="300" height="30" fill="${I}" opacity="0.5"/>
  <rect x="600" y="600" width="300" height="30" fill="${S}" opacity="0.5"/>
  <rect x="900" y="600" width="300" height="30" fill="${C}" opacity="0.5"/>
</svg>`;
}

// ---- Generate all assets ----
async function main() {
  // PWA icons (overlapping style)
  await sharp(Buffer.from(iconSvg(512))).png().toFile(`${OUT}/icon-512.png`);
  await sharp(Buffer.from(iconSvg(192))).png().toFile(`${OUT}/icon-192.png`);
  console.log('  icon-512.png, icon-192.png');

  // Apple touch icon (180x180 -- iOS adds its own rounded corners)
  await sharp(Buffer.from(iconSvg(180))).png().toFile(`${OUT}/apple-touch-icon.png`);
  console.log('  apple-touch-icon.png');

  // OG image (magazine layout)
  await sharp(Buffer.from(ogSvg())).png().toFile(`${OUT}/og-image.png`);
  console.log('  og-image.png');

  // Favicon PNG (32x32 for browsers that don't support SVG favicons)
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <circle cx="12" cy="12" r="8" fill="${D}" opacity="0.7"/>
    <circle cx="20" cy="12" r="8" fill="${I}" opacity="0.7"/>
    <circle cx="20" cy="20" r="8" fill="${S}" opacity="0.7"/>
    <circle cx="12" cy="20" r="8" fill="${C}" opacity="0.7"/>
  </svg>`;

  // Generate multiple sizes for ICO (16, 32, 48)
  const favicon16 = await sharp(Buffer.from(faviconSvg)).resize(16, 16).png().toBuffer();
  const favicon32 = await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toBuffer();
  const favicon48 = await sharp(Buffer.from(faviconSvg)).resize(48, 48).png().toBuffer();

  // Save 32x32 PNG favicon
  await sharp(favicon32).toFile('public/favicon-32x32.png');
  // Save 16x16 PNG favicon
  await sharp(favicon16).toFile('public/favicon-16x16.png');
  console.log('  favicon-16x16.png, favicon-32x32.png');

  // Build ICO file (multi-resolution: 16, 32, 48)
  // ICO format: header + directory entries + PNG data
  const images = [
    { size: 16, data: favicon16 },
    { size: 32, data: favicon32 },
    { size: 48, data: favicon48 },
  ];

  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * images.length;
  let dataOffset = headerSize + dirSize;

  // ICO header: reserved(2) + type(2, 1=icon) + count(2)
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);     // reserved
  header.writeUInt16LE(1, 2);     // type: icon
  header.writeUInt16LE(images.length, 4);

  const dirEntries = [];
  const imageDataBuffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.size === 256 ? 0 : img.size, 0);  // width
    entry.writeUInt8(img.size === 256 ? 0 : img.size, 1);  // height
    entry.writeUInt8(0, 2);       // color palette
    entry.writeUInt8(0, 3);       // reserved
    entry.writeUInt16LE(1, 4);    // color planes
    entry.writeUInt16LE(32, 6);   // bits per pixel
    entry.writeUInt32LE(img.data.length, 8);  // data size
    entry.writeUInt32LE(dataOffset, 12);       // data offset
    dirEntries.push(entry);
    imageDataBuffers.push(img.data);
    dataOffset += img.data.length;
  }

  const ico = Buffer.concat([header, ...dirEntries, ...imageDataBuffers]);
  const { writeFileSync } = await import('fs');
  writeFileSync('public/favicon.ico', ico);
  console.log('  favicon.ico (16+32+48)');

  console.log('Done. All assets generated.');
}

main().catch(console.error);
