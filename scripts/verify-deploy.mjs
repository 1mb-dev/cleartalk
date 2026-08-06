#!/usr/bin/env node
// Asserts the deploy this run just made was filed as PRODUCTION, not a preview.
//
// Releases v0.1.0 through v0.3.1 all exited 0 from wrangler while Cloudflare filed each one as a
// preview, so cleartalk.1mb.dev served the 2026-03-24 build for four months. Cloudflare never lied
// about it -- its API reported `environment: preview` the whole time. Nobody read the field. This
// reads the field.
//
// It deliberately does NOT fetch the public URL. Bot management is enabled zone-wide on 1mb.dev, so
// every datacenter IP -- which is every CI runner -- gets a 403 "Just a moment..." challenge. That
// is the zone policy working correctly, not something to spoof a User-Agent around. To check served
// bytes, run this from a normal network:
//
//     curl -s https://cleartalk.1mb.dev | grep -oE 'assets/index-[A-Za-z0-9_-]+\.js'
//
// and compare against dist/index.html.

const token = process.env.CLOUDFLARE_API_TOKEN;
const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const project = process.env.PAGES_PROJECT ?? 'cleartalk';
const commit = process.env.COMMIT_SHA;

const TIMEOUT_MS = Number(process.env.VERIFY_TIMEOUT_MS ?? 90_000);
const INTERVAL_MS = Number(process.env.VERIFY_INTERVAL_MS ?? 5_000);

for (const [name, value] of [
  ['CLOUDFLARE_API_TOKEN', token],
  ['CLOUDFLARE_ACCOUNT_ID', account],
  ['COMMIT_SHA', commit],
]) {
  if (!value) {
    console.error(`Missing ${name}. This check needs it to read the Pages deployment list.`);
    process.exit(2);
  }
}

const short = commit.slice(0, 7);
// Base is overridable so this script's own branches can be exercised against a mock. A check that
// gates releases should not itself be untested.
const apiBase = process.env.CF_API_BASE ?? 'https://api.cloudflare.com/client/v4';
const endpoint = `${apiBase}/accounts/${account}/pages/projects/${project}/deployments?per_page=25`;

console.log(`Expecting a production deployment of ${short} in Pages project "${project}"`);

const deadline = Date.now() + TIMEOUT_MS;
let attempts = 0;
let seen = [];

while (Date.now() < deadline) {
  attempts += 1;
  try {
    const response = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
    const payload = await response.json();

    if (!payload.success) {
      console.log(`  attempt ${attempts}: API error ${JSON.stringify(payload.errors)}`);
    } else {
      seen = payload.result.map((deployment) => ({
        commit: (deployment.deployment_trigger?.metadata?.commit_hash ?? '').slice(0, 7),
        environment: deployment.environment,
        created: deployment.created_on,
      }));

      const mine = seen.filter((deployment) => deployment.commit === short);
      const promoted = mine.find((deployment) => deployment.environment === 'production');

      if (promoted) {
        console.log(`OK: ${short} is deployed as production (attempt ${attempts})`);
        process.exit(0);
      }
      console.log(
        `  attempt ${attempts}: ${mine.length} deployment(s) for ${short}: ${mine.map((d) => d.environment).join(', ') || 'none yet'}`,
      );
    }
  } catch (error) {
    console.log(`  attempt ${attempts}: ${error.message}`);
  }
  await new Promise((resolve) => setTimeout(resolve, INTERVAL_MS));
}

const mine = seen.filter((deployment) => deployment.commit === short);
console.error(`
FAILED after ${attempts} attempts over ${TIMEOUT_MS / 1000}s.

  commit:               ${short}
  its deployments:      ${mine.map((d) => d.environment).join(', ') || '<none found>'}
  most recent overall:  ${seen.slice(0, 3).map((d) => `${d.commit}:${d.environment}`).join('  ') || '<none>'}

${
  mine.some((d) => d.environment === 'preview')
    ? `This commit deployed as a PREVIEW, so production did not move. The deploy command must pass
--branch=main explicitly: a tag checkout is a detached HEAD, where wrangler infers branch "HEAD",
which does not match the project's production_branch and makes Cloudflare file it as a preview.`
    : `No deployment for this commit was found at all. Check the wrangler step actually ran, and that
CLOUDFLARE_ACCOUNT_ID points at the account owning "${project}".`
}
`);
process.exit(1);
