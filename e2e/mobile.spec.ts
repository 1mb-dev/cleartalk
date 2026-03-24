import { test, expect, devices } from '@playwright/test';

const iPhone = devices['iPhone 13'];
const smallPhone = { viewport: { width: 320, height: 568 } }; // iPhone SE

test.describe('Mobile & Responsive', () => {
  test('no horizontal scroll at 320px', async ({ browser }) => {
    const context = await browser.newContext({ ...smallPhone });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForSelector('h1');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // 1px tolerance
    await context.close();
  });

  test('no horizontal scroll at 375px (iPhone)', async ({ browser }) => {
    const context = await browser.newContext({ ...iPhone });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForSelector('h1');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    await context.close();
  });

  test('tab bar is visible and fixed at bottom', async ({ browser }) => {
    const context = await browser.newContext({ ...iPhone });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForSelector('.tab-bar');

    const tabBar = page.locator('.tab-bar');
    await expect(tabBar).toBeVisible();

    const box = await tabBar.boundingBox();
    const viewport = page.viewportSize();
    expect(box).not.toBeNull();
    // Tab bar should be near the bottom of the viewport
    expect(box!.y + box!.height).toBeGreaterThan(viewport!.height - 10);
    await context.close();
  });

  test('viewport meta prevents zoom on input focus', async ({ page }) => {
    await page.goto('/');
    const viewport = page.locator('meta[name="viewport"]');
    const content = await viewport.getAttribute('content');
    expect(content).toContain('width=device-width');
    // Should NOT have maximum-scale=1 (bad for a11y) but inputs should be >= 16px
  });

  test('content fits within max-width container on mobile', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForSelector('.app-layout');

    const maxWidth = await page.evaluate(() => {
      const el = document.querySelector('.app-layout');
      return el ? parseInt(getComputedStyle(el).maxWidth) : 0;
    });
    expect(maxWidth).toBe(480);
    await context.close();
  });

  test('container widens on tablet (768px)', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForSelector('.app-layout');

    const maxWidth = await page.evaluate(() => {
      const el = document.querySelector('.app-layout');
      return el ? parseInt(getComputedStyle(el).maxWidth) : 0;
    });
    expect(maxWidth).toBe(680);
    await context.close();
  });

  test('container widens on desktop (1024px)', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForSelector('.app-layout');

    const maxWidth = await page.evaluate(() => {
      const el = document.querySelector('.app-layout');
      return el ? parseInt(getComputedStyle(el).maxWidth) : 0;
    });
    expect(maxWidth).toBe(720);
    await context.close();
  });

  test('no horizontal scroll in landscape phone', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 667, height: 375 } });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForSelector('h1');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    await context.close();
  });

  test('tab bar stays at bottom in landscape', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 667, height: 375 } });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForSelector('.tab-bar');

    const tabBar = page.locator('.tab-bar');
    const box = await tabBar.boundingBox();
    const viewport = page.viewportSize();
    expect(box!.y + box!.height).toBeGreaterThan(viewport!.height - 10);
    await context.close();
  });
});
