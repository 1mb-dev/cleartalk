import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  { name: 'Coach (empty)', path: '/' },
  { name: 'People (empty)', path: '/people' },
  { name: 'Log (empty)', path: '/log' },
  { name: 'Profile', path: '/profile' },
  { name: 'Insight', path: '/insight/d-to-s/feedback' },
  { name: 'Insight (invalid)', path: '/insight/x-to-y/bad' },
];

test.describe('Automated a11y scan (axe-core)', () => {
  for (const route of ROUTES) {
    test(`${route.name} (${route.path}) has no WCAG 2.1 AA violations`, async ({ page }) => {
      await page.goto(route.path);
      await page.waitForSelector('h1', { timeout: 10000 });
      // Let async content settle
      await page.waitForTimeout(500);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const violations = results.violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length,
        targets: v.nodes.slice(0, 3).map(n => n.target.join(' ')),
      }));

      expect(violations, `a11y violations on ${route.path}:\n${JSON.stringify(violations, null, 2)}`).toHaveLength(0);
    });
  }
});
