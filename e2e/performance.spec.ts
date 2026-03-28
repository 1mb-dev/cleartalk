import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('page loads within 3 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForSelector('h1');
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(3000);
  });

  test('no console errors on initial load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('/');
    await page.waitForSelector('h1');
    // Filter out expected errors (e.g., missing favicons in preview mode)
    const realErrors = errors.filter(e =>
      !e.includes('favicon') && !e.includes('404') &&
      !e.includes('service-worker') && !e.includes('sw.js') &&
      !e.includes('workbox') && !e.includes('Failed to register') &&
      !e.includes('SecurityError') && !e.includes('navigator.serviceWorker') &&
      !e.includes('frame-ancestors') &&  // browser warns: only valid as HTTP header, not meta
      !e.includes('cloudflareinsights') && !e.includes('Access-Control-Allow-Origin')  // CF analytics CORS on localhost
    );
    expect(realErrors, `Unexpected console errors: ${realErrors.join(', ')}`).toHaveLength(0);
  });

  test('no unhandled promise rejections', async ({ page }) => {
    const rejections: string[] = [];
    page.on('pageerror', error => {
      // CF analytics CORS rejection on localhost is expected
      if (!error.message.includes('cloudflareinsights') && !error.message.includes('Access-Control-Allow-Origin') && !error.message.includes('Load failed')) {
        rejections.push(error.message);
      }
    });
    await page.goto('/');
    await page.waitForSelector('h1');
    // Navigate through all tabs
    for (const tab of ['People', 'Log', 'Profile', 'Coach']) {
      await page.click(`[role="tab"]:has-text("${tab}")`);
      await page.waitForSelector('h1');
    }
    expect(rejections).toHaveLength(0);
  });

  test('lazy-loaded coaching cards load successfully', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // Add a person to access coaching cards
    await page.click('button:has-text("Start with someone")');
    await page.fill('.quicktag-name-input', 'LazyTest');
    await page.click('button:has-text("Next")');
    for (let i = 0; i < 8; i++) {
      await page.waitForSelector('.assessment-option');
      await page.locator('.assessment-option').first().click();
    }

    // Confirm QuickTag result
    await page.waitForSelector('.quicktag-confirm');
    await page.click('.quicktag-confirm button:has-text("Save")');

    // Pick situation -- triggers lazy chunk load
    await page.waitForSelector('.situation-btn');
    await page.click('.situation-btn:first-child');

    // Coaching card should render (chunk loaded successfully)
    await page.waitForSelector('.coaching-card', { timeout: 5000 });
    await expect(page.locator('.coaching-section').first()).toBeAttached();
  });

  test('service worker registers', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    const swRegistered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const reg = await navigator.serviceWorker.getRegistration();
      return !!reg;
    });
    expect(swRegistered).toBe(true);
  });

  test('manifest is valid JSON', async ({ request }) => {
    const res = await request.get('/manifest.webmanifest');
    expect(res.ok()).toBe(true);
    const manifest = await res.json();
    expect(manifest.name).toBe('ClearTalk');
    expect(manifest.short_name).toBe('ClearTalk');
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
  });

  test('static assets load (favicon, icons)', async ({ request }) => {
    const assets = [
      '/favicon.svg',
      '/favicon.ico',
      '/favicon-32x32.png',
      '/assets/icon-192.png',
      '/assets/icon-512.png',
      '/assets/apple-touch-icon.png',
      '/assets/og-image.png',
    ];
    for (const path of assets) {
      const res = await request.get(path);
      expect(res.ok(), `Asset missing: ${path}`).toBe(true);
    }
  });
});
