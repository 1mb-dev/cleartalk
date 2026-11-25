import { test, expect, type Page } from '@playwright/test';
import { waitForCard } from './helpers.ts';

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

    await waitForCard(page);
    await expect(page.locator('.coaching-section-title').first()).toBeAttached();
    await expect(page.locator('.coaching-section-body').first()).toBeAttached();
  });

  test('first card asks the reader\'s style, then shows the whole card for that pair', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'PickTest');
    await page.waitForSelector('.situation-btn');
    await page.click('.situation-btn:first-child');

    await expect(page.locator('.self-pick h2')).toHaveText('Which is closer to you?');
    await page.click('.self-pick-option:has-text("Clarity")');

    await expect(page.locator('.coaching-card .type-badge').first()).toHaveText('You: Clarity');
    await expect(page.locator('.coaching-pick-note')).toContainText('Based on the style you picked');
    const sections = await page.locator('.coaching-section-title').allTextContents();
    expect(sections).toEqual(expect.arrayContaining(['Open with', 'Avoid']));

    // The pick is remembered: the next card opens straight away.
    await page.click('.back-link');
    await page.click('.situation-btn:nth-child(2)');
    await expect(page.locator('.coaching-card .type-badge').first()).toHaveText('You: Clarity');
    await expect(page.locator('.self-pick')).toHaveCount(0);
  });

  test('card shows the last note logged about this person', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'NoteTest');
    await page.click('.situation-btn:first-child');
    await waitForCard(page);
    await expect(page.locator('.coaching-last-note')).toHaveCount(0);

    await page.click('button:has-text("Log how it went")');
    await page.locator('.outcome-option').nth(3).click();
    await page.fill('#log-note', 'Went better when I asked first.');
    await page.click('button:has-text("Log it")');
    await page.waitForSelector('text=Saved!');

    await page.click('[role="tab"]:has-text("Coach")');
    await page.click('.contact-pick-card:has-text("NoteTest")');
    await page.click('.situation-btn:nth-child(2)');
    await waitForCard(page);
    await expect(page.locator('.coaching-last-note .coaching-section-body')).toHaveText('Went better when I asked first.');
    await expect(page.locator('.coaching-last-note-meta')).toHaveText('Give Feedback, today');

    // Rated 4, so Profile lists it under what worked, in the reader's own words.
    await page.click('[role="tab"]:has-text("Profile")');
    await expect(page.locator('.patterns-notes h3')).toHaveText(['What worked']);
    await expect(page.locator('.patterns-note')).toHaveText(['Went better when I asked first.']);
  });

  test('import merges: adds new people, keeps what is already here, reports skips', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'Kept');

    const profile = { d: 70, i: 20, s: 30, c: 40, primary: 'D', secondary: 'C' };
    const file = {
      users: [],
      assessments: [],
      contacts: [
        { id: 'imp-1', userId: 'default', name: 'Imported', discProfile: profile, confidence: 'high', notes: '', createdAt: 1, updatedAt: 2 },
        { id: 'bad', name: 'No profile' },
      ],
      journal: [
        { id: 'j-1', userId: 'default', contactId: 'imp-1', situationType: 'feedback', outcome: 4, note: 'From the file', loggedAt: 3 },
        { id: 'j-2', userId: 'default', contactId: 'nobody', situationType: 'feedback', outcome: 4, note: '', loggedAt: 3 },
      ],
      exportedAt: '2026-11-25T00:00:00.000Z',
    };

    await page.click('[role="tab"]:has-text("Profile")');
    const chooser = page.waitForEvent('filechooser');
    await page.click('button:has-text("Choose file")');
    await (await chooser).setFiles({ name: 'export.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(file)) });
    await expect(page.locator('.setting-status')).toHaveText(
      "Added or updated 1 person and 1 note. Skipped 2 that weren't valid. Your data is safe.",
    );

    await page.click('[role="tab"]:has-text("People")');
    await expect(page.locator('.people-card')).toHaveCount(2);
    await expect(page.locator('.people-card:has-text("Kept")')).toBeVisible();
    await expect(page.locator('.people-card:has-text("Imported")')).toBeVisible();
  });

  test('import on a new device restores the reader\'s style', async ({ page }) => {
    // Opening Profile first stores a blank user that is newer than any export.
    await page.goto('/profile');
    await expect(page.locator('button:has-text("Choose file")')).toBeVisible();
    await expect(page.locator('.disc-wheel-container')).toHaveCount(0);

    const profile = { d: 30, i: 40, s: 80, c: 50, primary: 'S', secondary: 'C' };
    const file = {
      users: [{ id: 'default', displayName: '', discProfile: profile, createdAt: 1, updatedAt: 2 }],
      assessments: [],
      contacts: [],
      journal: [],
      exportedAt: '2026-11-25T00:00:00.000Z',
    };
    const chooser = page.waitForEvent('filechooser');
    await page.click('button:has-text("Choose file")');
    await (await chooser).setFiles({ name: 'export.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(file)) });
    await expect(page.locator('.disc-wheel-container')).toBeVisible();
  });

  test('coaching card has all sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    await addContact(page, 'TestPerson');

    await page.waitForSelector('.situation-btn');
    await page.click('.situation-btn:first-child');
    await waitForCard(page);

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
    await waitForCard(page);

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
    await page.goto('/insight/d-to-s/feedback/');
    await expect(page.locator('.type-badge').nth(1)).toHaveText('Them: Steady');
    await expect(page.locator('.coaching-section').first()).toBeAttached();
  });

  test('insight page is the whole card without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/insight/s-to-d/difficult_news/');
    await expect(page.locator('article h1')).not.toBeEmpty();
    await expect(page.locator('.coaching-section-title')).toHaveText([
      'Approach', 'Open with', 'Avoid', 'Expect this', 'If it goes sideways', 'Body language',
    ]);
    expect(await page.locator('.coaching-phrases').first().locator('li').count()).toBeGreaterThan(1);
    await expect(page.locator('.coaching-on-call-label')).toHaveText('On a call');
    await expect(page.locator('.insight-byline')).toContainText('Not therapy, and not a personality test.');
    await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveCount(1);
    await expect(page.locator('script[src]')).toHaveCount(0);
    await context.close();
  });

  test('insight page shows not found for an invalid pair', async ({ page }) => {
    await page.goto('/insight/x-to-y/invalid');
    await expect(page.locator('h1')).toContainText(/not found/i);
  });

  test('insight page has main landmark', async ({ page }) => {
    await page.goto('/insight/d-to-i/conflict/');
    await page.waitForSelector('#main');
    await expect(page.locator('#main')).toBeAttached();
  });
});
