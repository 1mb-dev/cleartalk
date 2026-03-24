import { test, expect, devices } from '@playwright/test';

const viewports = {
  'phone-375': { width: 375, height: 812 },
  'phone-390': { width: 390, height: 844 },
  'tablet-768': { width: 768, height: 1024 },
  'desktop-1024': { width: 1024, height: 768 },
  'desktop-1440': { width: 1440, height: 900 },
  'landscape-667': { width: 667, height: 375 },
};

// Screenshot every tab at every viewport
for (const [name, viewport] of Object.entries(viewports)) {
  test.describe(`Visual audit @ ${name}`, () => {
    test('coach tab (new user)', async ({ browser }) => {
      const ctx = await browser.newContext({ viewport });
      const page = await ctx.newPage();
      await page.goto('/');
      await page.waitForSelector('h1');
      await page.screenshot({ path: `test-results/visual-${name}-coach-new.png`, fullPage: false });
      await ctx.close();
    });

    test('people tab (empty)', async ({ browser }) => {
      const ctx = await browser.newContext({ viewport });
      const page = await ctx.newPage();
      await page.goto('/people');
      await page.waitForSelector('h1');
      await page.screenshot({ path: `test-results/visual-${name}-people-empty.png`, fullPage: false });
      await ctx.close();
    });

    test('log tab (empty)', async ({ browser }) => {
      const ctx = await browser.newContext({ viewport });
      const page = await ctx.newPage();
      await page.goto('/log');
      await page.waitForSelector('h1');
      await page.screenshot({ path: `test-results/visual-${name}-log-empty.png`, fullPage: false });
      await ctx.close();
    });

    test('profile tab (no assessment)', async ({ browser }) => {
      const ctx = await browser.newContext({ viewport });
      const page = await ctx.newPage();
      await page.goto('/profile');
      await page.waitForSelector('h1');
      await page.screenshot({ path: `test-results/visual-${name}-profile.png`, fullPage: false });
      await ctx.close();
    });

    test('insight page', async ({ browser }) => {
      const ctx = await browser.newContext({ viewport });
      const page = await ctx.newPage();
      await page.goto('/insight/d-to-s/feedback');
      await page.waitForSelector('h1');
      await page.screenshot({ path: `test-results/visual-${name}-insight.png`, fullPage: false });
      await ctx.close();
    });
  });
}

// Structural checks across all viewports
test.describe('Layout structure audit', () => {
  for (const [name, viewport] of Object.entries(viewports)) {
    test(`content not clipped at top @ ${name}`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport });
      const page = await ctx.newPage();
      await page.goto('/');
      await page.waitForSelector('h1');

      // First visible element should not be clipped (y >= 0)
      const firstElement = page.locator('.route-shell > *').first();
      const box = await firstElement.boundingBox();
      expect(box, 'First element should be visible').not.toBeNull();
      expect(box!.y, `Content clipped at top @ ${name}`).toBeGreaterThanOrEqual(0);
      await ctx.close();
    });

    test(`tab bar fully visible @ ${name}`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport });
      const page = await ctx.newPage();
      await page.goto('/');
      await page.waitForSelector('.tab-bar');

      const tabBar = page.locator('.tab-bar');
      const box = await tabBar.boundingBox();
      expect(box).not.toBeNull();
      // Tab bar bottom edge should be at or near viewport bottom
      expect(box!.y + box!.height).toBeGreaterThanOrEqual(viewport.height - 5);
      // Tab bar top should be visible
      expect(box!.y).toBeLessThan(viewport.height);
      await ctx.close();
    });

    test(`no dead space below content @ ${name}`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport });
      const page = await ctx.newPage();
      await page.goto('/');
      await page.waitForSelector('.tab-bar');

      // Check gap between last content element and tab bar
      const content = page.locator('.app-content');
      const tabBar = page.locator('.tab-bar');
      const contentBox = await content.boundingBox();
      const tabBox = await tabBar.boundingBox();

      if (contentBox && tabBox) {
        // Content area + tab bar should fill the viewport
        const totalHeight = contentBox.height + tabBox.height;
        expect(totalHeight).toBeGreaterThanOrEqual(viewport.height - 5);
      }
      await ctx.close();
    });
  }
});
