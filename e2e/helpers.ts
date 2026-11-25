import { expect, type Page } from '@playwright/test';

/**
 * Wait for a coaching card. Before any assessment or pick, the app first asks the reader's style.
 * 30s matches the waitForSelector default these call sites had before the helper.
 */
export async function waitForCard(page: Page, pickIndex = 0) {
  const pick = page.locator('.self-pick');
  const card = page.locator('.coaching-card');
  await expect(pick.or(card)).toBeVisible({ timeout: 30_000 });
  if (await pick.isVisible()) await page.locator('.self-pick-option').nth(pickIndex).click();
  await expect(card).toBeVisible({ timeout: 30_000 });
}

/**
 * Answer the open quiz, one option per question. The app ignores an answer within 300ms of the
 * last one (a double tap), so each answer waits past that.
 */
export async function answerQuestions(page: Page, count: number, choice: (i: number) => number = () => 0) {
  for (let i = 0; i < count; i++) {
    await page.locator('.assessment-option').nth(choice(i)).click();
    await page.waitForTimeout(350);
  }
}
