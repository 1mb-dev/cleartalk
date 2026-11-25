import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

test.describe('Security Headers & CSP', () => {
  test('has Content-Security-Policy meta tag', async ({ page }) => {
    await page.goto('/');
    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]');
    const content = await csp.getAttribute('content');
    expect(content).toContain("default-src 'self'");
    expect(content).toContain("script-src 'self'");
    expect(content).toContain("base-uri 'self'");
    expect(content).toContain("form-action 'self'");
    // frame-ancestors is in _headers file (HTTP header only, not valid in meta)
  });

  test('ships security headers for Cloudflare Pages', () => {
    // vite preview does not apply _headers, so check the built file Cloudflare reads.
    const headers = readFileSync('dist/_headers', 'utf8');
    for (const h of [
      'X-Frame-Options: DENY',
      'X-Content-Type-Options: nosniff',
      'Strict-Transport-Security: max-age=31536000',
      'Referrer-Policy: strict-origin-when-cross-origin',
      'Permissions-Policy:',
    ]) expect(headers).toContain(h);
  });

  test('has mobile web app meta tags', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[name="mobile-web-app-capable"]')).toHaveAttribute('content', 'yes');
    await expect(page.locator('meta[name="apple-mobile-web-app-status-bar-style"]')).toHaveAttribute('content', 'black-translucent');
  });

  test('no inline scripts in HTML', async ({ page }) => {
    await page.goto('/');
    // Inline code is only the module entry; a JSON-LD block is data the browser never runs.
    const scripts = await page.locator('script').all();
    for (const script of scripts) {
      const type = await script.getAttribute('type');
      const src = await script.getAttribute('src');
      if (!src) {
        expect(['module', 'application/ld+json']).toContain(type);
      }
    }
  });
});
