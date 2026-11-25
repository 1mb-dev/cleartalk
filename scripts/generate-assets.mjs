/**
 * Generate all static image assets for Cleartalk.
 * Design: Overlapping circles (connection motif) + Magazine OG layout.
 * Run: node scripts/generate-assets.mjs
 */
import sharp from 'sharp';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';

// Drawn into og-image.png and every page preview; og/manifest.json records it so a rename can't skip the redraw.
const WORDMARK = 'Cleartalk';

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
// Dark background, large bold circles for home screen visibility
function iconSvg(size) {
  const s = size;
  const r = s * 0.22;
  const gap = s * 0.12;
  const cx = s / 2, cy = s / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" fill="${TEXT}"/>
  <circle cx="${cx - gap}" cy="${cy - gap}" r="${r}" fill="${D}" opacity="0.85"/>
  <circle cx="${cx + gap}" cy="${cy - gap}" r="${r}" fill="${I}" opacity="0.85"/>
  <circle cx="${cx + gap}" cy="${cy + gap}" r="${r}" fill="${S}" opacity="0.85"/>
  <circle cx="${cx - gap}" cy="${cy + gap}" r="${r}" fill="${C}" opacity="0.85"/>
</svg>`;
}

// ---- Maskable Icon: Same motif, inset to 80% safe zone ----
function maskableIconSvg(size) {
  const s = size;
  const pad = s * 0.1;
  const inner = s - pad * 2;
  const r = inner * 0.22;
  const gap = inner * 0.12;
  const cx = s / 2, cy = s / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" fill="${TEXT}"/>
  <circle cx="${cx - gap}" cy="${cy - gap}" r="${r}" fill="${D}" opacity="0.85"/>
  <circle cx="${cx + gap}" cy="${cy - gap}" r="${r}" fill="${I}" opacity="0.85"/>
  <circle cx="${cx + gap}" cy="${cy + gap}" r="${r}" fill="${S}" opacity="0.85"/>
  <circle cx="${cx - gap}" cy="${cy + gap}" r="${r}" fill="${C}" opacity="0.85"/>
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
  <text x="520" y="295" font-family="Georgia, serif" font-size="72" font-weight="400" fill="${TEXT}">${WORDMARK}</text>

  <!-- Tagline -->
  <text x="520" y="345" font-family="-apple-system, sans-serif" font-size="26" fill="${MUTED}">Know what to say before you say it.</text>
  <text x="520" y="380" font-family="-apple-system, sans-serif" font-size="22" fill="${MUTED}">Coaching for the person and the moment.</text>

  <!-- Bottom accent bar -->
  <rect x="0" y="600" width="300" height="30" fill="${D}" opacity="0.5"/>
  <rect x="300" y="600" width="300" height="30" fill="${I}" opacity="0.5"/>
  <rect x="600" y="600" width="300" height="30" fill="${S}" opacity="0.5"/>
  <rect x="900" y="600" width="300" height="30" fill="${C}" opacity="0.5"/>
</svg>`;
}

// ---- Per-pair OG images for insight routes (16 combinations) ----
const DISC_LABELS = { D: 'Drive', I: 'Influence', S: 'Steady', C: 'Clarity' };
const DISC_COLORS = { D, I, S, C };
const TYPES = ['D', 'I', 'S', 'C'];

const xml = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Greedy word wrap; the preview has to be readable as a thumbnail, so lines stay short. */
function wrap(text, max) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    if (line && (line + ' ' + word).length > max) { lines.push(line); line = word; }
    else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

/** Link preview for one public card page: the page's own headline leads. */
function pageOgSvg(h1, situationLabel, yourType, theirType) {
  let size = 64;
  let lines = wrap(h1, 28);
  if (lines.length > 3) { size = 54; lines = wrap(h1, 34); }
  const lineHeight = Math.round(size * 1.18);
  const top = 250 - ((lines.length - 1) * lineHeight) / 2;
  const text = lines
    .map((l, i) => `<text x="80" y="${top + i * lineHeight}" font-family="Georgia, serif" font-size="${size}" fill="${TEXT}">${xml(l)}</text>`)
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <text x="80" y="96" font-family="-apple-system, sans-serif" font-size="26" font-weight="600" fill="${MUTED}">${xml(situationLabel)}</text>
  ${text}
  <rect x="80" y="508" width="14" height="40" rx="2" fill="${DISC_COLORS[yourType]}"/>
  <rect x="100" y="508" width="14" height="40" rx="2" fill="${DISC_COLORS[theirType]}"/>
  <text x="130" y="538" font-family="-apple-system, sans-serif" font-size="26" fill="${MUTED}">${DISC_LABELS[yourType]} to ${DISC_LABELS[theirType]}</text>
  <text x="1120" y="538" font-family="Georgia, serif" font-size="38" fill="${TEXT}" text-anchor="end">${WORDMARK}</text>
</svg>`;
}

// ---- Generate all assets ----
async function main() {
  // PWA icons (overlapping style)
  await sharp(Buffer.from(iconSvg(512))).png().toFile(`${OUT}/icon-512.png`);
  await sharp(Buffer.from(iconSvg(192))).png().toFile(`${OUT}/icon-192.png`);
  console.log('  icon-512.png, icon-192.png');

  // Maskable icon (safe zone padded for Android adaptive icons)
  await sharp(Buffer.from(maskableIconSvg(512))).png().toFile(`${OUT}/icon-maskable-512.png`);
  console.log('  icon-maskable-512.png');

  // Apple touch icon (180x180 -- iOS adds its own rounded corners)
  await sharp(Buffer.from(iconSvg(180))).png().toFile(`${OUT}/apple-touch-icon.png`);
  console.log('  apple-touch-icon.png');

  // OG image (magazine layout)
  await sharp(Buffer.from(ogSvg())).png().toFile(`${OUT}/og-image.png`);
  console.log('  og-image.png');

  // One preview per public card page, led by that page's headline
  const SITUATIONS = { feedback: 'Give Feedback', request: 'Make a Request', conflict: 'Navigate Conflict', pitch: 'Pitch an Idea', difficult_news: 'Deliver Difficult News' };
  const pages = JSON.parse(readFileSync('src/data/insight-pages.json', 'utf-8'));
  mkdirSync(`${OUT}/og`, { recursive: true });
  for (const [key, page] of Object.entries(pages)) {
    const [pair, situation] = key.split('/');
    const [yours, , theirs] = pair.toUpperCase().split('-');
    await sharp(Buffer.from(pageOgSvg(page.h1, SITUATIONS[situation], yours, theirs)))
      .png({ compressionLevel: 9, palette: true })
      .toFile(`${OUT}/og/${pair}_${situation}.png`);
  }
  // The headline each image was drawn from; src/data/og-manifest.test.ts fails when they drift.
  const manifest = { _wordmark: WORDMARK, ...Object.fromEntries(Object.entries(pages).map(([key, page]) => [key, page.h1])) };
  writeFileSync(`${OUT}/og/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`  og/*.png (${Object.keys(pages).length} page images) + manifest.json`);

  // Favicon PNG (32x32 for browsers that don't support SVG favicons)
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="6" fill="${TEXT}"/>
    <circle cx="12" cy="12" r="8" fill="${D}" opacity="0.85"/>
    <circle cx="20" cy="12" r="8" fill="${I}" opacity="0.85"/>
    <circle cx="20" cy="20" r="8" fill="${S}" opacity="0.85"/>
    <circle cx="12" cy="20" r="8" fill="${C}" opacity="0.85"/>
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
  writeFileSync('public/favicon.ico', ico);
  console.log('  favicon.ico (16+32+48)');

  console.log('Done. All assets generated.');
}

main().catch(console.error);
