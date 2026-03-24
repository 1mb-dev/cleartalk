import { test, expect } from '@playwright/test';

test.describe('Offline mode', () => {
  test('service worker registers and activates', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    const swState = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return { registered: false, state: 'unsupported' };
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) return { registered: false, state: 'none' };
      const sw = reg.active ?? reg.installing ?? reg.waiting;
      return {
        registered: true,
        state: sw?.state ?? 'none',
        scope: reg.scope,
        controller: !!navigator.serviceWorker.controller,
      };
    });

    expect(swState.registered).toBe(true);
    expect(['activated', 'activating', 'installed']).toContain(swState.state);
  });

  test('SPA navigation works offline (no network needed for client-side routing)', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // Wait for SW and initial render
    await page.waitForTimeout(2000);

    // Go offline
    await context.setOffline(true);

    // Client-side navigation uses pushState -- no network requests needed
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toBeAttached();

    await page.click('[role="tab"]:has-text("Profile")');
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toBeAttached();

    await page.click('[role="tab"]:has-text("Log")');
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toBeAttached();

    await page.click('[role="tab"]:has-text("Coach")');
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toBeAttached();

    await context.setOffline(false);
  });

  test('IndexedDB operations work offline', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // Go offline
    await context.setOffline(true);

    // IndexedDB is local -- reads should work
    await page.click('[role="tab"]:has-text("Profile")');
    await page.waitForSelector('h1');
    // Profile loads user from IndexedDB -- should not error
    const hasError = await page.locator('.welcome-block:has-text("went wrong")').count();
    expect(hasError).toBe(0);

    await context.setOffline(false);
  });
});
