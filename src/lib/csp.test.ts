import { describe, it, expect } from 'vitest';
import indexHtml from '../../index.html?raw';

// Read sources through Vite rather than node:fs -- the app tsconfig deliberately has no node
// types, and this check is not worth widening it for.
const sources = import.meta.glob<string>('../**/*.{ts,tsx}', {
  query: '?raw',
  eager: true,
  import: 'default',
});

// Fragments so this file does not match itself when scanned. The concatenation is the point.
const RAW_HTML_APIS = [
  'dangerously' + 'SetInnerHTML',
  'inner' + 'HTML',
  'outer' + 'HTML',
  'insertAdjacent' + 'HTML',
  'document.' + 'write',
];

const csp = /http-equiv="Content-Security-Policy" content="([^"]+)"/.exec(indexHtml)?.[1] ?? '';

function directive(name: string): string {
  return (
    csp
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${name} `)) ?? ''
  );
}

describe('content security policy', () => {
  it('is declared in index.html', () => {
    expect(csp).not.toBe('');
  });

  // Guards against the failure mode that would make the check below pass while testing nothing:
  // a glob that silently matches no files reports a clean scan and an empty scan identically.
  it('scans the source tree', () => {
    expect(Object.keys(sources).length).toBeGreaterThan(30);
  });

  // Positive control: the scan must be able to find a string that is genuinely present. Without
  // this, a broken matcher would report zero offenders and look like a pass.
  it('detects a string that is present', () => {
    const found = Object.entries(sources).filter(([, body]) => body.includes('sanitizeName'));
    expect(found.length).toBeGreaterThan(0);
  });

  // script-src may allow 'unsafe-inline' only because nothing here turns a string into markup,
  // so there is no path from attacker-controlled input to executing script. If that changes the
  // allowance is no longer safe, and nothing else in the suite would notice.
  it('renders no raw HTML while script-src allows unsafe-inline', () => {
    if (!directive('script-src').includes("'unsafe-inline'")) return;

    const offenders = Object.entries(sources)
      .filter(([path]) => !path.endsWith('.test.ts'))
      .filter(([, body]) => RAW_HTML_APIS.some((api) => body.includes(api)))
      .map(([path]) => path);

    expect(offenders).toEqual([]);
  });

  // connect-src is the directive that actually protects this app: it stops a compromised
  // dependency posting IndexedDB contents (contact names, conversation notes) to any endpoint.
  it('keeps connect-src restricted', () => {
    expect(directive('connect-src')).toContain("'self'");
    expect(directive('connect-src')).not.toContain('*');
  });
});
