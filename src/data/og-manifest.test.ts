import { describe, it, expect } from 'vitest';
import pages from './insight-pages.json';
import drawn from '../../public/assets/og/manifest.json';

// The preview images are drawn once and committed; the pages are rebuilt every build.
// After changing a headline, run `npm run generate:assets` and commit the images.
describe('link preview images', () => {
  it('were drawn from the current headlines', () => {
    const current = Object.fromEntries(Object.entries(pages).map(([key, page]) => [key, page.h1]));
    expect(drawn).toEqual(current);
  });
});
