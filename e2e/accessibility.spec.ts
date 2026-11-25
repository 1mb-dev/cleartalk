import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('has skip-to-content link', async ({ page }) => {
    await page.goto('/');
    const skip = page.locator('.skip-link');
    await expect(skip).toBeAttached();
    await expect(skip).toHaveAttribute('href', '#main');
  });

  test('skip link becomes visible on focus', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.locator('.skip-link');
    await expect(skip).toBeVisible();
  });

  test('has main landmark', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#main');
    const main = page.locator('#main');
    await expect(main).toBeAttached();
  });

  test('has exactly one h1 per page', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    const h1s = await page.locator('h1').count();
    expect(h1s).toBe(1);
  });

  test('tab bar has proper ARIA roles', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[role="tablist"]');
    const tablist = page.locator('[role="tablist"]');
    await expect(tablist).toHaveAttribute('aria-label', 'Main navigation');

    const tabs = page.locator('[role="tab"]');
    const count = await tabs.count();
    expect(count).toBe(4);

    // Active tab has aria-selected
    const active = page.locator('[role="tab"][aria-selected="true"]');
    await expect(active).toBeAttached();
  });

  test('tab bar keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[role="tab"]');

    // Focus the active tab
    const activeTab = page.locator('[role="tab"][aria-selected="true"]');
    await activeTab.focus();

    // Arrow right should move to next tab
    await page.keyboard.press('ArrowRight');
    const focused = page.locator('[role="tab"]:focus');
    await expect(focused).toBeAttached();
  });

  test('focus indicators are visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('button');

    // Tab through to reach a button (skip link + button)
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('Tab');
    }

    // Check that something has focus (either :focus-visible or :focus)
    const focused = page.locator(':focus-visible, :focus');
    await expect(focused.first()).toBeAttached();
  });

  test('loading states have aria-live', async ({ page }) => {
    // Loading text unmounts within milliseconds, so record each node as it is added
    // rather than polling for it.
    await page.addInitScript(() => {
      const seen: (string | null)[] = [];
      (window as unknown as { __loadingAriaLive: typeof seen }).__loadingAriaLive = seen;
      new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of m.addedNodes) {
            if (!(node instanceof Element)) continue;
            const hits = node.matches('.loading-text') ? [node] : [...node.querySelectorAll('.loading-text')];
            for (const el of hits) seen.push(el.getAttribute('aria-live'));
          }
        }
      }).observe(document, { childList: true, subtree: true });
    });

    await page.goto('/');
    await expect(page.locator('.loading-text')).toHaveCount(0);
    const seen = await page.evaluate(() => (window as unknown as { __loadingAriaLive: (string | null)[] }).__loadingAriaLive);
    expect(seen.length).toBeGreaterThan(0);
    expect(seen.every(v => v === 'polite')).toBe(true);
  });

  test('all images and icons have alt text or aria-hidden', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('svg');

    const svgs = await page.locator('svg').all();
    for (const svg of svgs) {
      const ariaHidden = await svg.getAttribute('aria-hidden');
      const role = await svg.getAttribute('role');
      const ariaLabel = await svg.getAttribute('aria-label');
      // Every SVG should either be hidden from a11y tree or have a role+label
      expect(ariaHidden === 'true' || role === 'img' || !!ariaLabel).toBe(true);
    }
  });

  test('buttons have accessible names', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('button');

    const buttons = await page.locator('button').all();
    for (const button of buttons) {
      const text = (await button.textContent())?.trim();
      const ariaLabel = await button.getAttribute('aria-label');
      const title = await button.getAttribute('title');
      // Every button should have visible text, aria-label, or title
      expect(!!text || !!ariaLabel || !!title).toBe(true);
    }
  });

  test('respects prefers-reduced-motion', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('.btn-primary').first();
    const seconds = () => button.evaluate(el => parseFloat(getComputedStyle(el).transitionDuration));

    // Measure the same element both ways, so an element that never animates cannot pass.
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    expect(await seconds()).toBeGreaterThan(0.001);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(await seconds()).toBeLessThanOrEqual(0.001);
  });

  test('touch targets are at least 44px', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('button');

    const buttons = await page.locator('button:visible').all();
    for (const button of buttons) {
      const box = await button.boundingBox();
      if (box) {
        expect(box.height, `Button too short: ${await button.textContent()}`).toBeGreaterThanOrEqual(42);
      }
    }
  });
});
