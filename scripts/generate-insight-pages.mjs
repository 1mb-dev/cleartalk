/**
 * Render each coaching card as a static public page: dist/insight/{pair}/{situation}/index.html.
 * The page is complete HTML and CSS with no app JavaScript, so readers, link previews and
 * crawlers all get the full card. Runs after `vite build`; Node strips the TypeScript types
 * from the imported data files.
 */

import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DISC_LABELS, SITUATION_LABELS } from '../src/engine/types.ts';
import { STYLE_LINES } from '../src/data/style-lines.ts';
import feedback from '../src/data/coaching-cards/feedback.ts';
import request from '../src/data/coaching-cards/request.ts';
import conflict from '../src/data/coaching-cards/conflict.ts';
import pitch from '../src/data/coaching-cards/pitch.ts';
import difficultNews from '../src/data/coaching-cards/difficult-news.ts';

const BASE_URL = 'https://cleartalk.1mb.dev';
const BYLINE = 'Written by one person who reads about how people talk. Not therapy, and not a personality test.';
const EXPECT_CAPTION = "People don't always match their style. Go by what you see.";

const root = join(import.meta.dirname, '..');
const distDir = join(root, 'dist');
const meta = JSON.parse(readFileSync(join(root, 'src', 'data', 'insight-pages.json'), 'utf-8'));
const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

// Public pages carry the same policy as the app. The CSP is a meta tag (see index.html), so it
// has to be copied; a page without it runs with no policy at all.
const csp = indexHtml.match(/<meta http-equiv="Content-Security-Policy"[^>]*>/)?.[0];
const styles = indexHtml.match(/<link[^>]*rel="stylesheet"[^>]*>/g) ?? [];
if (!csp || styles.length === 0) {
  throw new Error('dist/index.html is missing its CSP meta tag or stylesheet; build the app first');
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const section = (title, body, extra = '') =>
  `<section class="coaching-section${extra}">\n          <h2 class="coaching-section-title">${title}</h2>\n          ${body}\n        </section>`;
const para = (t) => `<p class="coaching-section-body">${esc(t)}</p>`;

function opener(o) {
  if (typeof o === 'string') return `<li>${esc(o)}</li>`;
  return `<li class="coaching-phrase-conditional"><span class="coaching-only-if">Only if ${esc(o.onlyIf)}</span><span class="coaching-line">${esc(o.line)}</span></li>`;
}

function page(card, key) {
  const m = meta[key];
  if (!m) throw new Error(`src/data/insight-pages.json has no entry for ${key}`);
  // The page is a directory index; Cloudflare 308s the slash-less form, so link the real address.
  const url = `${BASE_URL}/insight/${key}/`;
  const image = `${BASE_URL}/assets/og/${key.replace('/', '_')}.png`;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: m.h1,
    description: m.description,
    inLanguage: 'en',
    mainEntityOfPage: url,
    image,
    author: { '@type': 'Organization', name: 'ClearTalk', url: `${BASE_URL}/` },
    publisher: { '@type': 'Organization', name: '1mb-dev', url: 'https://github.com/1mb-dev' },
  }).replace(/</g, '\\u003c');
  const you = card.yourType;
  const them = card.theirType;

  return `<!doctype html>
<html lang="en" class="static-page">
  <head>
    <meta charset="UTF-8" />
    ${csp}
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#2c2926" />
    <title>${esc(m.title)}</title>
    <meta name="description" content="${esc(m.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${esc(m.title)}" />
    <meta property="og:description" content="${esc(m.description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:site_name" content="ClearTalk" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(m.title)}" />
    <meta name="twitter:description" content="${esc(m.description)}" />
    <meta name="twitter:image" content="${image}" />
    <link rel="icon" href="/favicon.ico" sizes="48x48" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
    <link rel="preload" href="/assets/fonts/fraunces-variable.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/assets/fonts/source-sans-3-variable.woff2" as="font" type="font/woff2" crossorigin />
    ${styles.join('\n    ')}
    <script type="application/ld+json">${jsonLd}</script>
  </head>
  <body>
    <a href="#main" class="skip-link">Skip to content</a>
    <main id="main" class="route-shell insight-page">
      <a class="insight-brand" href="/">
        <img src="/favicon.svg" width="24" height="24" alt="" />
        <span class="insight-brand-name">ClearTalk</span>
      </a>
      <article class="coaching-card">
        <header class="insight-header">
          <h1>${esc(m.h1)}</h1>
          <div class="coaching-card-header">
            <span class="type-badge disc-${you.toLowerCase()}">You: ${DISC_LABELS[you]}</span>
            <span class="coaching-arrow" aria-hidden="true">&rarr;</span>
            <span class="type-badge disc-${them.toLowerCase()}">Them: ${DISC_LABELS[them]}</span>
          </div>
          <p class="insight-gloss">${DISC_LABELS[you]}: ${STYLE_LINES[you].other}. ${DISC_LABELS[them]}: ${STYLE_LINES[them].other}.</p>
        </header>
        ${section('Approach', para(card.approach))}
        ${section('Open with', `<ul class="coaching-phrases">${card.openWith.map(opener).join('')}</ul>`)}
        ${section('Avoid', `<ul class="coaching-phrases">${card.avoid.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>`, ' coaching-warning')}
        ${section('Expect this', `<p class="coaching-caption">${EXPECT_CAPTION}</p>\n          ${para(card.theirReaction)}`)}
        ${section('If it goes sideways', para(card.ifGoesWrong))}
        ${section('Body language', para(card.bodyLanguage) + (card.onCall ? `\n          <p class="coaching-section-body coaching-on-call"><span class="coaching-on-call-label">On a call</span> ${esc(card.onCall)}</p>` : ''))}
      </article>
      <footer class="insight-cta">
        <p class="insight-byline">${BYLINE}</p>
        <p class="insight-cta-text">Add the people you talk to and ClearTalk gives you a card like this before each hard conversation. ${esc(SITUATION_LABELS[card.situation])} is one of five moments it covers.</p>
        <a class="btn-primary" href="/">Try ClearTalk - free, no sign-up</a>
      </footer>
    </main>
  </body>
</html>
`;
}

let generated = 0;
for (const card of [...feedback, ...request, ...conflict, ...pitch, ...difficultNews]) {
  const key = `${card.yourType.toLowerCase()}-to-${card.theirType.toLowerCase()}/${card.situation}`;
  const dir = join(distDir, 'insight', key);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(card, key));
  generated++;
}
if (generated !== 80) throw new Error(`expected 80 insight pages, generated ${generated}`);
console.log(`Generated ${generated} insight pages in dist/insight/`);
