import { test, expect } from '@playwright/test';

test.describe('SEO & Meta Tags', () => {
  test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('ClearTalk');
  });

  test('has meta description', async ({ page }) => {
    await page.goto('/');
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /talk to people better/i);
  });

  test('has theme-color meta', async ({ page }) => {
    await page.goto('/');
    const theme = page.locator('meta[name="theme-color"]');
    await expect(theme).toHaveAttribute('content', '#2c2926');
  });

  test('has OG tags', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'ClearTalk');
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /talk to people better/i);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', /cleartalk/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-image\.png/);
  });

  test('has Twitter card tags', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', 'ClearTalk');
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /og-image\.png/);
  });

  test('has favicon links (ico, svg, png)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="icon"][href="/favicon.ico"]')).toBeAttached();
    await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toBeAttached();
    await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toBeAttached();
    await expect(page.locator('link[rel="icon"][sizes="16x16"]')).toBeAttached();
  });

  test('has apple-touch-icon', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', /apple-touch-icon/);
  });

  test('has manifest link', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="manifest"]').first()).toBeAttached();
  });

  test('has lang attribute on html', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('robots.txt is accessible', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.ok()).toBe(true);
    const body = await res.text();
    expect(body).toContain('User-agent');
    expect(body).toContain('Sitemap');
  });

  test('sitemap.xml is accessible', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.ok()).toBe(true);
    const body = await res.text();
    expect(body).toContain('cleartalk.1mb.dev');
  });

  test('humans.txt is accessible', async ({ request }) => {
    const res = await request.get('/humans.txt');
    expect(res.ok()).toBe(true);
  });
});
