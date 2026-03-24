/**
 * Generate all static image assets for ClearTalk.
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

// ---- App Icon (DISC motif with subtle overlap) ----
function iconSvg(size) {
  const s = size;
  const r = s * 0.22;
  const cx1 = s * 0.35, cy1 = s * 0.35;
  const cx2 = s * 0.65, cy2 = s * 0.35;
  const cx3 = s * 0.65, cy3 = s * 0.65;
  const cx4 = s * 0.35, cy4 = s * 0.65;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" rx="${s * 0.18}" fill="${BG}"/>
  <circle cx="${cx1}" cy="${cy1}" r="${r}" fill="${D}" opacity="0.85"/>
  <circle cx="${cx2}" cy="${cy2}" r="${r}" fill="${I}" opacity="0.85"/>
  <circle cx="${cx3}" cy="${cy3}" r="${r}" fill="${S}" opacity="0.85"/>
  <circle cx="${cx4}" cy="${cy4}" r="${r}" fill="${C}" opacity="0.85"/>
</svg>`;
}

// ---- OG Image (1200x630) ----
function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>

  <!-- DISC motif - left side -->
  <circle cx="280" cy="260" r="70" fill="${D}" opacity="0.15"/>
  <circle cx="380" cy="260" r="70" fill="${I}" opacity="0.15"/>
  <circle cx="380" cy="360" r="70" fill="${S}" opacity="0.15"/>
  <circle cx="280" cy="360" r="70" fill="${C}" opacity="0.15"/>
  <circle cx="280" cy="260" r="28" fill="${D}" opacity="0.85"/>
  <circle cx="380" cy="260" r="22" fill="${I}" opacity="0.85"/>
  <circle cx="380" cy="360" r="32" fill="${S}" opacity="0.85"/>
  <circle cx="280" cy="360" r="25" fill="${C}" opacity="0.85"/>

  <!-- Wordmark -->
  <text x="520" y="290" font-family="Georgia, serif" font-size="72" font-weight="400" fill="${TEXT}">ClearTalk</text>

  <!-- Tagline -->
  <text x="520" y="350" font-family="-apple-system, sans-serif" font-size="26" fill="#5c5854">A tool that helps you talk to people better</text>

  <!-- Bottom accent bar -->
  <rect x="0" y="600" width="300" height="30" fill="${D}" opacity="0.6"/>
  <rect x="300" y="600" width="300" height="30" fill="${I}" opacity="0.6"/>
  <rect x="600" y="600" width="300" height="30" fill="${S}" opacity="0.6"/>
  <rect x="900" y="600" width="300" height="30" fill="${C}" opacity="0.6"/>
</svg>`;
}

// ---- Generate all assets ----
async function main() {
  // PWA icons
  await sharp(Buffer.from(iconSvg(512))).png().toFile(`${OUT}/icon-512.png`);
  await sharp(Buffer.from(iconSvg(192))).png().toFile(`${OUT}/icon-192.png`);
  console.log('  icon-512.png, icon-192.png');

  // Apple touch icon (180x180, no rounded corners -- iOS adds them)
  const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${BG}"/>
  <circle cx="63" cy="63" r="28" fill="${D}" opacity="0.85"/>
  <circle cx="117" cy="63" r="28" fill="${I}" opacity="0.85"/>
  <circle cx="117" cy="117" r="28" fill="${S}" opacity="0.85"/>
  <circle cx="63" cy="117" r="28" fill="${C}" opacity="0.85"/>
</svg>`;
  await sharp(Buffer.from(appleSvg)).png().toFile(`${OUT}/apple-touch-icon.png`);
  console.log('  apple-touch-icon.png');

  // OG image
  await sharp(Buffer.from(ogSvg())).png().toFile(`${OUT}/og-image.png`);
  console.log('  og-image.png');

  console.log('Done. All assets at public/assets/');
}

main().catch(console.error);
