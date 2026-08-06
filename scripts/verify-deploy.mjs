#!/usr/bin/env node
// Asserts the live site is actually serving the artifact this run just built.
//
// A green wrangler step is not evidence of a deploy. Releases v0.1.0 through v0.3.1 all reported
// success while Cloudflare filed each one as a preview, and the custom domain kept serving the
// 2026-03-24 build for four months. This compares served bytes against the build output, which is
// the only signal that would have caught it.
//
// Polls rather than asserting immediately: propagation took ~30s when this was written, and a
// check that flakes gets disabled, which is worse than no check.

import { readFileSync } from 'node:fs';

const BUNDLE_REF = /assets\/index-[A-Za-z0-9_-]+\.js/;
// Overridable so the failure path can be exercised without waiting two minutes for it.
const TIMEOUT_MS = Number(process.env.VERIFY_TIMEOUT_MS ?? 120_000);
const INTERVAL_MS = Number(process.env.VERIFY_INTERVAL_MS ?? 5_000);

const url = process.argv[2];
if (!url) {
  console.error('usage: node scripts/verify-deploy.mjs <url>');
  process.exit(2);
}

const built = BUNDLE_REF.exec(readFileSync('dist/index.html', 'utf8'))?.[0];
if (!built) {
  console.error('No bundle reference in dist/index.html. Run the build before this check.');
  process.exit(2);
}

console.log(`Expecting ${url} to serve ${built}`);

const deadline = Date.now() + TIMEOUT_MS;
let served = null;
let attempts = 0;
let lastStatus = null;
let lastBody = '';

while (Date.now() < deadline) {
  attempts += 1;
  try {
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'text/html',
        // A browser User-Agent on purpose. Cloudflare bot management challenges requests from
        // datacenter IPs, which is every CI runner, and a challenge page contains no bundle
        // reference -- indistinguishable from a failed deploy unless we look like a browser.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
      },
      redirect: 'follow',
    });
    lastStatus = response.status;
    lastBody = await response.text();
    served = BUNDLE_REF.exec(lastBody)?.[0] ?? null;

    if (served === built) {
      console.log(`OK: serving ${served} (attempt ${attempts})`);
      process.exit(0);
    }
    console.log(`  attempt ${attempts}: HTTP ${lastStatus}, serving ${served ?? '<no bundle reference>'}`);
  } catch (error) {
    console.log(`  attempt ${attempts}: ${error.message}`);
  }
  await new Promise((resolve) => setTimeout(resolve, INTERVAL_MS));
}

// Distinguish "production is serving the wrong thing" from "we never managed to read production".
// Both are failures, but they send you to completely different places.
const looksLikeTheApp = lastBody.includes('<title>ClearTalk') || lastBody.includes('id="app"');
if (!looksLikeTheApp) {
  console.error(`
FAILED after ${attempts} attempts over ${TIMEOUT_MS / 1000}s: could not read production.

  built:       ${built}
  last status: ${lastStatus ?? '<no response>'}
  body length: ${lastBody.length}
  body head:   ${JSON.stringify(lastBody.slice(0, 300))}

The response does not look like ClearTalk at all, so this is most likely a Cloudflare bot
challenge served to the CI runner rather than a bad deploy. Confirm from a normal network:

    curl -s ${url} | grep -oE 'assets/index-[A-Za-z0-9_-]+\\.js'
    npx wrangler pages deployment list --project-name=cleartalk

If production is correct there, this check needs fixing -- do not "fix" the deploy.
`);
  process.exit(1);
}

console.error(`
FAILED after ${attempts} attempts over ${TIMEOUT_MS / 1000}s.
  built:  ${built}
  served: ${served ?? '<no bundle reference>'}

The deploy reported success but production is serving something else. Check, in order:

  1. Did it land as a preview instead of production?
       npx wrangler pages deployment list --project-name=cleartalk
     Read the Environment column. A tag checkout is a detached HEAD, so wrangler infers
     branch "HEAD" and Cloudflare files the deploy as a preview unless the deploy command
     passes --branch=main explicitly.

  2. Is the custom domain still attached to this Pages project?
       npx wrangler pages project list
`);
process.exit(1);
