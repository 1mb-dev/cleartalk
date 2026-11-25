import { describe, it, expect } from 'vitest';
import indexHtml from '../../index.html?raw';
import readme from '../../README.md?raw';
import changelog from '../../CHANGELOG.md?raw';
import architecture from '../../docs/architecture.md?raw';
import llms from '../../public/llms.txt?raw';
import humans from '../../public/humans.txt?raw';
import viteConfig from '../../vite.config.ts?raw';

// The product is "Cleartalk" everywhere, read or not: copy, meta, comments, tests, docs.
const glob = (files: Record<string, string>) => Object.entries(files);
const sources = [
  ...glob(import.meta.glob<string>('../**/*.{ts,tsx,css,json}', { query: '?raw', eager: true, import: 'default' })),
  ...glob(import.meta.glob<string>('../../scripts/*.mjs', { query: '?raw', eager: true, import: 'default' })),
  ...glob(import.meta.glob<string>('../../e2e/*.ts', { query: '?raw', eager: true, import: 'default' })),
  ['index.html', indexHtml], ['README.md', readme], ['CHANGELOG.md', changelog], ['docs/architecture.md', architecture],
  ['public/llms.txt', llms], ['public/humans.txt', humans], ['vite.config.ts', viteConfig],
] as [string, string][];

// Built from fragments so this file does not match itself.
const WRONG = new RegExp(['Clear' + 'Talk', 'Clear' + ' Talk', 'CLEAR' + 'TALK'].join('|'));

describe('product name', () => {
  it('scans the sources', () => {
    expect(sources.length).toBeGreaterThan(50);
  });

  it('is spelled Cleartalk everywhere', () => {
    expect(sources.filter(([, text]) => WRONG.test(text)).map(([file]) => file)).toEqual([]);
  });
});
