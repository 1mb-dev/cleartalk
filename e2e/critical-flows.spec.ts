import { test, expect, type Page } from '@playwright/test';

/** Add a contact via QuickTag wizard: name entry, 8 questions, confirm, save */
async function addContact(page: Page, name: string) {
  await page.click('button:has-text("Start with someone")');
  await page.fill('.quicktag-name-input', name);
  await page.click('button:has-text("Next")');
  for (let i = 0; i < 8; i++) {
    await page.waitForSelector('.assessment-option');
    await page.locator('.assessment-option').first().click();
  }
  await page.waitForSelector('.quicktag-confirm');
  await page.click('.quicktag-confirm button:has-text("Save")');
}

test.describe('Critical User Flows', () => {
  test('full coach flow: add person -> pick situation -> see coaching card', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'Alex');

    await page.waitForSelector('.situation-btn', { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('Alex');

    await page.click('.situation-btn:first-child');

    await page.waitForSelector('.coaching-card');
    await expect(page.locator('.coaching-section-title').first()).toBeAttached();
    await expect(page.locator('.coaching-section-body').first()).toBeAttached();
  });

  test('coaching card has all sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'TestPerson');

    await page.waitForSelector('.situation-btn');
    await page.click('.situation-btn:first-child');
    await page.waitForSelector('.coaching-card');

    const sections = await page.locator('.coaching-section-title').allTextContents();
    expect(sections).toContain('Approach');
    expect(sections).toContain('Body language');
  });

  test('coach-to-log bridge works', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'BridgeTest');

    await page.waitForSelector('.situation-btn');
    await page.click('.situation-btn:first-child');
    await page.waitForSelector('.coaching-card');

    await page.click('button:has-text("Log how it went")');
    await page.waitForSelector('#log-contact');

    const contactSelect = page.locator('#log-contact');
    const selectedValue = await contactSelect.inputValue();
    expect(selectedValue).not.toBe('');
  });

  test('journal entry can be saved', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'LogTest');

    await page.waitForSelector('.situation-btn');
    await page.click('[role="tab"]:has-text("Log")');
    await page.waitForSelector('#log-contact');

    await page.selectOption('#log-contact', { index: 1 });
    await page.selectOption('#log-situation', 'feedback');
    await page.locator('.outcome-option').nth(3).click();

    await page.click('button:has-text("Log it")');
    await expect(page.locator('button[type="submit"] span')).toContainText('Saved!');
  });

  test('contact appears in People tab after creation', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'PeopleCheck');

    await page.waitForSelector('.situation-btn');
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('.people-card');

    await expect(page.locator('.people-card-name')).toContainText('PeopleCheck');
  });

  test('contact detail page shows DISC wheel and profile', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'DetailTest');

    await page.waitForSelector('.situation-btn');
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('.people-card');
    await page.click('.people-card');

    await page.waitForSelector('.disc-wheel-container');
    await expect(page.locator('h1')).toContainText('DetailTest');
    await expect(page.locator('.type-summary')).toBeAttached();
  });

  test('contact can be renamed', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'OldName');

    await page.waitForSelector('.situation-btn');
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('.people-card');
    await page.click('.people-card');

    await page.waitForSelector('h1');
    await page.click('button:has-text("Edit")');
    await page.waitForSelector('.quicktag-name-input');

    await page.fill('.quicktag-name-input', 'NewName');
    await page.click('button:has-text("Save")');

    await expect(page.locator('h1')).toContainText('NewName');
  });

  test('contact can be deleted', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'DeleteMe');

    await page.waitForSelector('.situation-btn');
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('.people-card');
    await page.click('.people-card');

    await page.waitForSelector('h1');
    await page.click('button:has-text("Remove DeleteMe")');
    await page.waitForSelector('.confirm-delete');
    await page.click('button:has-text("Remove")');

    await page.waitForSelector('h1:has-text("People")');
  });

  test('insight page renders for valid pair', async ({ page }) => {
    await page.goto('/insight/d-to-s/feedback');
    await page.waitForSelector('h1', { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('Steady');
    await expect(page.locator('.coaching-section').first()).toBeAttached();
  });

  test('insight page shows error for invalid pair', async ({ page }) => {
    await page.goto('/insight/x-to-y/invalid');
    await page.waitForSelector('h1');
    await expect(page.locator('h1')).toContainText('not found');
  });

  test('insight page has main landmark', async ({ page }) => {
    await page.goto('/insight/d-to-i/conflict');
    await page.waitForSelector('#main');
    await expect(page.locator('#main')).toBeAttached();
  });
});
