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

  console.log('Done. All assets at public/assets/');
}

main().catch(console.error);
