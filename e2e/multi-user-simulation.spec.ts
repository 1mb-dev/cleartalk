import { test, expect, type Page } from '@playwright/test';

/**
 * 5-minute multi-user simulation.
 * Four parallel personas exercise different app paths simultaneously.
 * Tests concurrent IndexedDB access, lazy loading, all routes.
 */

const SITUATIONS = ['feedback', 'request', 'conflict', 'pitch', 'difficult_news'];
const DISC_TYPES = ['d', 'i', 's', 'c'];

async function addContactViaQuickTag(page: Page, name: string) {
  await page.click('button:has-text("Start with someone")');
  await page.fill('.quicktag-name-input', name);
  await page.click('button:has-text("Next")');
  for (let i = 0; i < 8; i++) {
    await page.waitForSelector('.assessment-option');
    // Alternate choices for variety
    const choice = i % 2;
    await page.locator('.assessment-option').nth(choice).click();
  }
  await page.waitForSelector('.quicktag-confirm');
  await page.click('.quicktag-confirm button:has-text("Save")');
  await page.waitForSelector('.situation-btn', { timeout: 10000 });
}

async function addMoreContact(page: Page, name: string) {
  await page.click('.contact-pick-add');
  await page.fill('.quicktag-name-input', name);
  await page.click('button:has-text("Next")');
  for (let i = 0; i < 8; i++) {
    await page.waitForSelector('.assessment-option');
    await page.locator('.assessment-option').nth(i % 2).click();
  }
  await page.waitForSelector('.quicktag-confirm');
  await page.click('.quicktag-confirm button:has-text("Save")');
  await page.waitForSelector('.situation-btn', { timeout: 10000 });
}

async function takeAssessment(page: Page) {
  await page.click('[role="tab"]:has-text("Profile")');
  await page.waitForSelector('h1');
  await page.click('button:has-text("Take the assessment")');
  for (let i = 0; i < 24; i++) {
    await page.waitForSelector('.assessment-option');
    await page.locator('.assessment-option').nth(i % 3 === 0 ? 1 : 0).click();
  }
  await page.waitForSelector('button:has-text("Save and continue")');
  await page.click('button:has-text("Save and continue")');
  await page.waitForSelector('.disc-wheel-container');
}

async function logOutcome(page: Page) {
  await page.click('[role="tab"]:has-text("Log")');
  await page.waitForSelector('#log-contact');
  await page.selectOption('#log-contact', { index: 1 });
  await page.selectOption('#log-situation', SITUATIONS[Math.floor(Math.random() * 5)]);
  const outcome = Math.floor(Math.random() * 5);
  await page.locator('.outcome-option').nth(outcome).click();
  await page.click('button:has-text("Log it")');
  await page.waitForSelector('text=Saved!', { timeout: 5000 });
}

// ─────────────────────────────────────────────────────────
// Persona 1: Power User
// Adds 4 contacts, views coaching cards across all situations, logs outcomes
// ─────────────────────────────────────────────────────────
test.describe.parallel('Multi-user simulation', () => {
  test('Persona 1: Power User -- contacts, all coaching cards, logging', async ({ page }) => {
    test.setTimeout(300_000);
    await page.goto('/');
    await page.waitForSelector('h1');

    // Add first contact
    await addContactViaQuickTag(page, 'Alice');

    // View all 5 situations for first contact
    for (const sit of SITUATIONS) {
      await page.click(`.situation-btn:has-text("${sitLabel(sit)}")`);
      await page.waitForSelector('.coaching-card', { timeout: 10000 });
      await expect(page.locator('.coaching-section').first()).toBeAttached();
      await page.click('.back-link');
      await page.waitForSelector('.situation-btn');
    }

    // Go back and add more contacts
    await page.click('.back-link');
    await page.waitForSelector('.contact-pick-grid');
    await addMoreContact(page, 'Bob');

    await page.click('.back-link');
    await page.waitForSelector('.contact-pick-grid');
    await addMoreContact(page, 'Carol');

    // Log outcomes for different contacts
    for (let i = 0; i < 5; i++) {
      await logOutcome(page);
      await page.waitForTimeout(500);
    }

    // Check patterns section in Profile
    await page.click('[role="tab"]:has-text("Profile")');
    await page.waitForSelector('h1');
    await expect(page.locator('.patterns-section')).toBeAttached();

    // Check People tab shows all contacts
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('.people-card');
    const cards = await page.locator('.people-card').count();
    expect(cards).toBeGreaterThanOrEqual(3);
  });

  // ─────────────────────────────────────────────────────────
  // Persona 2: New User
  // Onboarding, assessment, profile exploration
  // ─────────────────────────────────────────────────────────
  test('Persona 2: New User -- onboarding, assessment, profile', async ({ page }) => {
    test.setTimeout(300_000);
    await page.goto('/');
    await page.waitForSelector('h1');

    // See welcome screen
    await expect(page.locator('h1')).toContainText('Before your next conversation');

    // Explore empty states
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('h1');
    await expect(page.locator('.welcome-block')).toBeAttached();

    await page.click('[role="tab"]:has-text("Log")');
    await page.waitForSelector('h1');
    await expect(page.locator('.welcome-block')).toBeAttached();

    // Take assessment
    await takeAssessment(page);
    await expect(page.locator('.disc-wheel-container')).toBeAttached();

    // Add first contact
    await page.click('[role="tab"]:has-text("Coach")');
    await page.waitForSelector('h1');
    await addContactViaQuickTag(page, 'NewUserContact');

    // View a coaching card (now with assessment -- should see openWith/avoid)
    await page.click('.situation-btn:first-child');
    await page.waitForSelector('.coaching-card');

    // Gated sections should be visible (has assessment)
    const sections = await page.locator('.coaching-section-title').allTextContents();
    expect(sections).toContain('Open with');
    expect(sections).toContain('Avoid');

    // Export data
    await page.click('[role="tab"]:has-text("Profile")');
    await page.waitForSelector('h1');
    await expect(page.locator('button:has-text("Download JSON")')).toBeAttached();

    // Toggle theme
    await page.click('button:has-text("Auto")');
    await page.waitForTimeout(300);
    await page.click('button:has-text("Light")');
    await page.waitForTimeout(300);
    await page.click('button:has-text("Dark")');
  });

  // ─────────────────────────────────────────────────────────
  // Persona 3: Returning User
  // Existing contacts, logging, patterns, person detail
  // ─────────────────────────────────────────────────────────
  test('Persona 3: Returning User -- log, patterns, person detail', async ({ page }) => {
    test.setTimeout(300_000);
    await page.goto('/');
    await page.waitForSelector('h1');

    // Add 2 contacts first (simulating existing data)
    await addContactViaQuickTag(page, 'Returning-A');
    await page.click('.back-link');
    await page.waitForSelector('.contact-pick-grid');
    await addMoreContact(page, 'Returning-B');

    // Log multiple entries
    for (let i = 0; i < 8; i++) {
      await logOutcome(page);
      await page.waitForTimeout(300);
    }

    // Check profile for patterns
    await page.click('[role="tab"]:has-text("Profile")');
    await page.waitForSelector('h1');
    await page.waitForSelector('.patterns-section');
    await expect(page.locator('.insight-stat').first()).toBeAttached();

    // View person detail
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('.people-card');
    await page.locator('.people-card').first().click();
    await page.waitForSelector('.disc-wheel-container');
    await expect(page.locator('.type-summary')).toBeAttached();

    // Quick coach from person detail
    await page.click('.situation-btn-sm:first-child');
    await page.waitForSelector('.coaching-card', { timeout: 10000 });

    // Navigate back to People tab and rename contact
    await page.click('[role="tab"]:has-text("People")');
    await page.waitForSelector('.people-card');
    await page.locator('.people-card').first().click();
    await page.waitForSelector('h1');
    await page.click('button:has-text("Edit")');
    await page.fill('.quicktag-name-input', 'Renamed-A');
    await page.click('button:has-text("Save")');
    await expect(page.locator('h1')).toContainText('Renamed-A');
  });

  // ─────────────────────────────────────────────────────────
  // Persona 4: Sharer
  // Browses insight pages, uses share, navigates from insight CTA
  // ─────────────────────────────────────────────────────────
  test('Persona 4: Sharer -- insight pages, share, CTA navigation', async ({ page }) => {
    test.setTimeout(300_000);
    await page.goto('/');
    await page.waitForSelector('h1');

    // Visit multiple insight pages
    for (const yourType of DISC_TYPES) {
      for (const theirType of DISC_TYPES.slice(0, 2)) {
        const situation = SITUATIONS[Math.floor(Math.random() * 5)];
        await page.goto(`/insight/${yourType}-to-${theirType}/${situation}`);
        await page.waitForSelector('h1', { timeout: 10000 });

        // Verify branding
        await expect(page.locator('.insight-brand-name')).toContainText('ClearTalk');

        // Verify coaching content
        await expect(page.locator('.coaching-section').first()).toBeAttached();

        // Verify CTA
        await expect(page.locator('button:has-text("Try ClearTalk")')).toBeAttached();
      }
    }

    // Navigate from insight CTA to main app
    await page.click('button:has-text("Try ClearTalk")');
    await page.waitForSelector('h1');
    // Should be on coach welcome page
    await expect(page.locator('h1')).toContainText('Before your next conversation');

    // Now use the app -- add a contact and view coaching card with share button
    await addContactViaQuickTag(page, 'ShareTest');
    await page.click('.situation-btn:first-child');
    await page.waitForSelector('.coaching-card');

    // Share button should be present
    await expect(page.locator('.share-btn')).toBeAttached();
  });
});

function sitLabel(situation: string): string {
  const labels: Record<string, string> = {
    feedback: 'Give Feedback',
    request: 'Make a Request',
    conflict: 'Navigate Conflict',
    pitch: 'Pitch an Idea',
    difficult_news: 'Deliver Difficult News',
  };
  return labels[situation] ?? situation;
}
