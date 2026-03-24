import { test, expect } from '@playwright/test';

test.describe('Critical User Flows', () => {
  test('full coach flow: add person -> pick situation -> see coaching card', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // Step 1: Click "Start with someone"
    await page.click('button:has-text("Start with someone")');
    await page.waitForSelector('.quicktag-name-input');

    // Step 2: Enter name
    await page.fill('.quicktag-name-input', 'Alex');
    await page.click('button:has-text("Next")');

    // Step 3: Answer all 8 observation questions (pick option A for all)
    for (let i = 0; i < 8; i++) {
      await page.waitForSelector('.assessment-option');
      const options = page.locator('.assessment-option');
      await options.first().click();
    }

    // Step 4: Should navigate to situation picker (wait for save + navigation)
    await page.waitForSelector('.situation-btn', { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('Alex');

    // Step 5: Pick a situation
    await page.click('.situation-btn:first-child');

    // Step 6: Should show coaching card with sections
    await page.waitForSelector('.coaching-card');
    await expect(page.locator('.coaching-section-title').first()).toBeAttached();
    await expect(page.locator('.coaching-section-body').first()).toBeAttached();
  });

  test('coaching card has all sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // Add a person first (quick path)
    await page.click('button:has-text("Start with someone")');
    await page.fill('.quicktag-name-input', 'TestPerson');
    await page.click('button:has-text("Next")');
    for (let i = 0; i < 8; i++) {
      await page.waitForSelector('.assessment-option');
      await page.locator('.assessment-option').first().click();
    }

    // Pick situation
    await page.waitForSelector('.situation-btn');
    await page.click('.situation-btn:first-child');
    await page.waitForSelector('.coaching-card');

    // Verify all coaching card sections exist
    const sections = await page.locator('.coaching-section-title').allTextContents();
    expect(sections).toContain('Approach');
    expect(sections).toContain('Body language');
  });

  test('coach-to-log bridge works', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // Add person
    await page.click('button:has-text("Start with someone")');
    await page.fill('.quicktag-name-input', 'BridgeTest');
    await page.click('button:has-text("Next")');
    for (let i = 0; i < 8; i++) {
      await page.waitForSelector('.assessment-option');
      await page.locator('.assessment-option').first().click();
    }

    // Pick situation
    await page.waitForSelector('.situation-btn');
    await page.click('.situation-btn:first-child');
    await page.waitForSelector('.coaching-card');

    // Click "Log how it went"
    await page.click('button:has-text("Log how it went")');
    await page.waitForSelector('#log-contact');

    // Log form should be pre-filled with contact
    const contactSelect = page.locator('#log-contact');
    const selectedValue = await contactSelect.inputValue();
    expect(selectedValue).not.toBe('');
  });

  test('journal entry can be saved', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // Add person first
    await page.click('button:has-text("Start with someone")');
    await page.fill('.quicktag-name-input', 'LogTest');
    await page.click('button:has-text("Next")');
    for (let i = 0; i < 8; i++) {
      await page.waitForSelector('.assessment-option');
      await page.locator('.assessment-option').first().click();
    }

    // Go to log
    await page.waitForSelector('.situation-btn');
    await page.click('[role="tab"]:has-text("Log")');
    await page.waitForSelector('#log-contact');

    // Fill log form
    await page.selectOption('#log-contact', { index: 1 }); // first contact
    await page.selectOption('#log-situation', 'feedback');

    // Select outcome (click the 4th circle = "Good")
    await page.locator('.outcome-option').nth(3).click();

    // Submit
    await page.click('button:has-text("Log it")');

    // Should show "Saved!"
    await expect(page.locator('button[type="submit"] span')).toContainText('Saved!');
  });

  test('contact appears in People tab after creation', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // Add person
    await page.click('button:has-text("Start with someone")');
    await page.fill('.quicktag-name-input', 'PeopleCheck');
    await page.click('button:has-text("Next")');
    for (let i = 0; i < 8; i++) {
      await page.waitForSelector('.assessment-option');
      await page.locator('.assessment-option').first().click();
    }

    // Navigate to People tab
    await page.waitForSelector('.situation-btn');
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('.people-card');

    // Contact should appear
    await expect(page.locator('.people-card-name')).toContainText('PeopleCheck');
  });

  test('contact detail page shows DISC wheel and profile', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // Add person
    await page.click('button:has-text("Start with someone")');
    await page.fill('.quicktag-name-input', 'DetailTest');
    await page.click('button:has-text("Next")');
    for (let i = 0; i < 8; i++) {
      await page.waitForSelector('.assessment-option');
      await page.locator('.assessment-option').first().click();
    }

    // Go to People -> click contact
    await page.waitForSelector('.situation-btn');
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('.people-card');
    await page.click('.people-card');

    // Should show person detail with DISC wheel
    await page.waitForSelector('.disc-wheel-container');
    await expect(page.locator('h1')).toContainText('DetailTest');
    await expect(page.locator('.type-summary')).toBeAttached();
  });

  test('contact can be renamed', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // Add person
    await page.click('button:has-text("Start with someone")');
    await page.fill('.quicktag-name-input', 'OldName');
    await page.click('button:has-text("Next")');
    for (let i = 0; i < 8; i++) {
      await page.waitForSelector('.assessment-option');
      await page.locator('.assessment-option').first().click();
    }

    // Go to People -> click contact
    await page.waitForSelector('.situation-btn');
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('.people-card');
    await page.click('.people-card');

    // Click Edit
    await page.waitForSelector('h1');
    await page.click('button:has-text("Edit")');
    await page.waitForSelector('.quicktag-name-input');

    // Change name
    await page.fill('.quicktag-name-input', 'NewName');
    await page.click('button:has-text("Save")');

    // Name should be updated
    await expect(page.locator('h1')).toContainText('NewName');
  });

  test('contact can be deleted', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');

    // Add person
    await page.click('button:has-text("Start with someone")');
    await page.fill('.quicktag-name-input', 'DeleteMe');
    await page.click('button:has-text("Next")');
    for (let i = 0; i < 8; i++) {
      await page.waitForSelector('.assessment-option');
      await page.locator('.assessment-option').first().click();
    }

    // Go to People -> click contact
    await page.waitForSelector('.situation-btn');
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('.people-card');
    await page.click('.people-card');

    // Click Remove -> Confirm
    await page.waitForSelector('h1');
    await page.click('button:has-text("Remove DeleteMe")');
    await page.waitForSelector('.confirm-delete');
    await page.click('button:has-text("Remove")');

    // Should navigate back to People (empty state)
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
