/**
 * Pre-render static HTML pages for each insight route.
 * Crawlers/bots get these HTML files with correct OG meta tags.
 * Human visitors get the SPA (JS takes over and renders the full experience).
 *
 * Generates 80 files: 4 types x 4 types x 5 situations = 80 pages.
 * Output: dist/insight/{pair}/{situation}/index.html
 */

import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DISC_LABELS = {
  D: 'Drive',
  I: 'Influence',
  S: 'Steady',
  C: 'Clarity',
};

const SITUATION_LABELS = {
  feedback: 'Give Feedback',
  request: 'Make a Request',
  conflict: 'Navigate Conflict',
  pitch: 'Pitch an Idea',
  difficult_news: 'Deliver Difficult News',
};

const TYPES = ['d', 'i', 's', 'c'];
const SITUATIONS = Object.keys(SITUATION_LABELS);
const BASE_URL = 'https://cleartalk.1mb.dev';

// Read the built index.html to get the correct asset paths
const distDir = join(import.meta.dirname, '..', 'dist');
const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

// Extract the script and link tags from the built index.html
const headMatch = indexHtml.match(/<head>([\s\S]*?)<\/head>/);
const scriptMatch = indexHtml.match(/<script[^>]*src="[^"]*"[^>]*><\/script>/g);
const linkMatch = indexHtml.match(/<link[^>]*rel="(?:stylesheet|modulepreload)"[^>]*>/g);

let generated = 0;

for (const yourType of TYPES) {
  for (const theirType of TYPES) {
    const pair = `${yourType}-to-${theirType}`;
    const yourLabel = DISC_LABELS[yourType.toUpperCase()];
    const theirLabel = DISC_LABELS[theirType.toUpperCase()];

    for (const situation of SITUATIONS) {
      const situationLabel = SITUATION_LABELS[situation].toLowerCase();
      const theirArticle = theirLabel[0] === 'I' ? 'an' : 'a';
      const yourArticle = yourLabel[0] === 'I' ? 'an' : 'a';
      const title = `How to ${situationLabel} with ${theirArticle} ${theirLabel} communicator - ClearTalk`;
      const description = `Coaching for ${yourArticle} ${yourLabel} communicator: how to ${situationLabel} effectively with someone who communicates like ${theirArticle} ${theirLabel}. What to say, what to avoid, and how to read the room.`;
      const url = `${BASE_URL}/insight/${pair}/${situation}`;

      const dir = join(distDir, 'insight', pair, situation);
      mkdirSync(dir, { recursive: true });

      const situationVerb = SITUATION_LABELS[situation].toLowerCase();
      const jsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to ${situationVerb} with ${theirArticle} ${theirLabel} communicator`,
        description,
        step: [
          { '@type': 'HowToStep', name: 'Understand the approach', text: `Learn how to approach ${situationVerb} with ${theirArticle} ${theirLabel} communication style.` },
          { '@type': 'HowToStep', name: 'Choose your opening', text: 'Use tailored phrases to start the conversation effectively.' },
          { '@type': 'HowToStep', name: 'Know what to avoid', text: `Understand the pitfalls when communicating with ${theirArticle} ${theirLabel} style.` },
        ],
        tool: { '@type': 'HowToTool', name: 'ClearTalk' },
      });

      const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#2c2926" />
    <meta name="description" content="${description}" />
    <script type="application/ld+json">${jsonLd}</script>

    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${BASE_URL}/assets/og/${pair}.png" />
    <meta property="og:site_name" content="ClearTalk" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${BASE_URL}/assets/og/${pair}.png" />

    <link rel="canonical" href="${url}" />

    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="ClearTalk" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

    <link rel="icon" href="/favicon.ico" sizes="48x48" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.webmanifest" />

    <link rel="preload" href="/assets/fonts/fraunces-variable.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/assets/fonts/source-sans-3-variable.woff2" as="font" type="font/woff2" crossorigin />

    ${(linkMatch ?? []).join('\n    ')}

    <title>${title}</title>
  </head>
  <body>
    <a href="#main" class="skip-link">Skip to content</a>
    <div id="app"></div>
    ${(scriptMatch ?? []).join('\n    ')}
  </body>
</html>
`;

      writeFileSync(join(dir, 'index.html'), html);
      generated++;
    }
  }
}

console.log(`Generated ${generated} insight pages in dist/insight/`);
