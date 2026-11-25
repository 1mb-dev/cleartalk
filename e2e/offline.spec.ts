import { test, expect } from '@playwright/test';

test.describe('Offline mode', () => {
  test('service worker registers and activates', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // `ready` resolves once a worker is active; install precaches the app shell first.
    const state = await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;
      return reg.active?.state;
    });
    expect(['activating', 'activated']).toContain(state);

    // A worker that throws at startup still activates, so also check that it cached the shell.
    const shellCached = await page.evaluate(async () => !!(await caches.match('/index.html', { ignoreSearch: true })));
    expect(shellCached).toBe(true);
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

  test('cold launch offline serves the app and every tab switches', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await page.waitForFunction(async () => {
      const reg = await navigator.serviceWorker.ready;
      return reg.active?.state === 'activated';
    });
    // The first load is not controlled; a reload puts the page under the service worker.
    await page.reload();
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);

    await context.setOffline(true);
    await page.reload();
    await expect(page.locator('[role="tab"]')).toHaveCount(4);

    for (const [tab, path] of [['People', '/people'], ['Log', '/log'], ['Profile', '/profile']] as const) {
      await page.click(`[role="tab"]:has-text("${tab}")`);
      await expect(page).toHaveURL(path);
      await expect(page.locator('h1')).toHaveText(tab);
    }
    await page.click('[role="tab"]:has-text("Coach")');
    await expect(page).toHaveURL('/');
    await expect(page.locator('[role="tab"][aria-selected="true"]')).toHaveText(/Coach/);

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
