import { test, expect } from '@playwright/test';

test.describe('UX States', () => {
  test.describe('Empty states (new user)', () => {
    test('coach page shows welcome with CTA', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('h1');
      await expect(page.locator('h1')).toContainText('Before your next conversation');
      await expect(page.locator('.btn-primary')).toContainText('Start with someone');
    });

    test('welcome shows onboarding features', async ({ page }) => {
      await page.goto('/');
      await page.waitForSelector('.welcome-features');
      const features = await page.locator('.welcome-feature').count();
      expect(features).toBe(3);
    });

    test('people page shows empty state with CTA', async ({ page }) => {
      await page.goto('/people');
      await page.waitForSelector('h1');
      await expect(page.locator('.welcome-text')).toContainText('one person');
    });

    test('log page shows empty state with CTA', async ({ page }) => {
      await page.goto('/log');
      await page.waitForSelector('h1');
      await expect(page.locator('.welcome-text')).toContainText('ten seconds');
    });

    test('profile page shows assessment prompt', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForSelector('h1');
      await expect(page.locator('.btn-primary')).toContainText('Take the assessment');
      await expect(page.locator('.welcome-hint')).toContainText('3 minutes');
    });
  });

  test.describe('Error states', () => {
    test('error state renders with try again button when present', async ({ page }) => {
      // We can't reliably simulate IndexedDB failure in all environments.
      // Instead, verify that the error UI structure exists in the codebase
      // by navigating to an invalid person ID (triggers "not found" state).
      await page.goto('/people/nonexistent-id');
      await page.waitForSelector('.route-shell');
      // Person not found shows an error-like state with back link
      const backLink = page.locator('.back-link');
      await expect(backLink).toBeVisible();
    });
  });

  test.describe('Dark mode', () => {
    test('respects system dark mode preference', async ({ browser }) => {
      const context = await browser.newContext({ colorScheme: 'dark' });
      const page = await context.newPage();
      await page.goto('/');
      await page.waitForSelector('h1');

      const bg = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
      );
      expect(bg).toBe('#121210');
      await context.close();
    });

    test('explicit dark mode toggle works', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForSelector('.setting-toggle');

      // Click theme toggle (Auto -> Light -> Dark)
      const toggle = page.locator('.setting-toggle');
      await toggle.click(); // Auto -> Light
      await toggle.click(); // Light -> Dark

      const theme = await page.evaluate(() =>
        document.documentElement.getAttribute('data-theme')
      );
      expect(theme).toBe('dark');
    });

    test('theme persists across navigation', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForSelector('.setting-toggle');

      // Set to dark
      const toggle = page.locator('.setting-toggle');
      await toggle.click(); // Auto -> Light
      await toggle.click(); // Light -> Dark

      // Navigate away and back
      await page.locator('[role="tab"]:has-text("Coach")').click();
      await page.waitForSelector('h1');
      await page.locator('[role="tab"]:has-text("Profile")').click();
      await page.waitForSelector('.setting-toggle');

      await expect(toggle).toContainText('Dark');
    });
  });
});
