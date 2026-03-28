/**
 * Take realistic screenshots for announcement posts.
 * Injects data matching the exact Dexie schema, then captures screens.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:4173';
const OUT = 'todos/posts/assets/shared';
mkdirSync(OUT, { recursive: true });

async function injectData(page) {
  await page.evaluate(async () => {
    // Delete existing DB and recreate with correct schema
    await new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase('cleartalk');
      req.onsuccess = resolve;
      req.onerror = reject;
    });

    // Open with version 1 matching ClearTalkDB schema
    const db = await new Promise((resolve, reject) => {
      const req = indexedDB.open('cleartalk', 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        db.createObjectStore('users', { keyPath: 'id' });
        const assessments = db.createObjectStore('assessments', { keyPath: 'id' });
        assessments.createIndex('userId', 'userId');
        assessments.createIndex('takenAt', 'takenAt');
        const contacts = db.createObjectStore('contacts', { keyPath: 'id' });
        contacts.createIndex('userId', 'userId');
        contacts.createIndex('name', 'name');
        contacts.createIndex('updatedAt', 'updatedAt');
        const journal = db.createObjectStore('journal', { keyPath: 'id' });
        journal.createIndex('userId', 'userId');
        journal.createIndex('contactId', 'contactId');
        journal.createIndex('situationType', 'situationType');
        journal.createIndex('loggedAt', 'loggedAt');
        journal.createIndex('[userId+contactId]', ['userId', 'contactId']);
        journal.createIndex('[userId+loggedAt]', ['userId', 'loggedAt']);
        journal.createIndex('[userId+contactId+loggedAt]', ['userId', 'contactId', 'loggedAt']);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    const now = Date.now();
    const day = 86400000;

    // User with Drive profile
    const userTx = db.transaction('users', 'readwrite');
    userTx.objectStore('users').put({
      id: 'default',
      displayName: '',
      discProfile: { d: 8, i: 4, s: 3, c: 5, primary: 'D', secondary: 'C' },
      createdAt: now - 14 * day,
      updatedAt: now - 1 * day,
    });
    await new Promise(r => { userTx.oncomplete = r; });

    // Contacts with proper schema
    const contacts = [
      { id: 'sarah-1', userId: 'default', name: 'Sarah', discProfile: { d: 3, i: 8, s: 4, c: 2, primary: 'I', secondary: 'S' }, confidence: 'high', notes: '', createdAt: now - 14 * day, updatedAt: now - 2 * day },
      { id: 'marcus-1', userId: 'default', name: 'Marcus', discProfile: { d: 9, i: 3, s: 2, c: 4, primary: 'D', secondary: 'C' }, confidence: 'high', notes: '', createdAt: now - 10 * day, updatedAt: now - 1 * day },
      { id: 'priya-1', userId: 'default', name: 'Priya', discProfile: { d: 2, i: 4, s: 7, c: 5, primary: 'S', secondary: 'C' }, confidence: 'medium', notes: '', createdAt: now - 7 * day, updatedAt: now - 3 * day },
      { id: 'alex-1', userId: 'default', name: 'Alex', discProfile: { d: 4, i: 2, s: 3, c: 8, primary: 'C', secondary: 'D' }, confidence: 'high', notes: '', createdAt: now - 5 * day, updatedAt: now - 1 * day },
      { id: 'jordan-1', userId: 'default', name: 'Jordan', discProfile: { d: 5, i: 7, s: 3, c: 3, primary: 'I', secondary: 'D' }, confidence: 'low', notes: '', createdAt: now - 3 * day, updatedAt: now - 3 * day },
    ];
    const cTx = db.transaction('contacts', 'readwrite');
    for (const c of contacts) cTx.objectStore('contacts').put(c);
    await new Promise(r => { cTx.oncomplete = r; });

    // Journal entries with proper schema
    const journal = [
      { id: 'j1', userId: 'default', contactId: 'sarah-1', situationType: 'feedback', outcome: 5, note: 'Really receptive, used the opening phrase', loggedAt: now - 2 * day },
      { id: 'j2', userId: 'default', contactId: 'marcus-1', situationType: 'conflict', outcome: 3, note: 'Tense but productive', loggedAt: now - 1 * day },
      { id: 'j3', userId: 'default', contactId: 'sarah-1', situationType: 'pitch', outcome: 4, note: '', loggedAt: now - 5 * day },
      { id: 'j4', userId: 'default', contactId: 'priya-1', situationType: 'request', outcome: 4, note: 'Gave her time to think it over', loggedAt: now - 3 * day },
      { id: 'j5', userId: 'default', contactId: 'alex-1', situationType: 'feedback', outcome: 4, note: 'Had data ready, went well', loggedAt: now - 1 * day },
    ];
    const jTx = db.transaction('journal', 'readwrite');
    for (const j of journal) jTx.objectStore('journal').put(j);
    await new Promise(r => { jTx.oncomplete = r; });

    db.close();
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
  });
  const page = await context.newPage();

  // Load app, inject data, reload
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await injectData(page);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // 1. Coach hub (contact picker grid)
  await page.screenshot({ path: `${OUT}/screenshot-coach-hub.png` });
  console.log('  screenshot-coach-hub.png');

  // 2. Click Sarah -> situation picker
  await page.locator('button', { hasText: 'Sarah' }).first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/screenshot-situation-picker.png` });
  console.log('  screenshot-situation-picker.png');

  // 3. Click Give Feedback -> coaching card
  await page.locator('button', { hasText: 'Give Feedback' }).first().click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/screenshot-coaching-card-top.png` });
  await page.screenshot({ path: `${OUT}/screenshot-coaching-card-full.png`, fullPage: true });
  console.log('  screenshot-coaching-card-top.png + full.png');

  // 4. People list
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.locator('text=People').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/screenshot-people-list.png` });
  console.log('  screenshot-people-list.png');

  // 5. Person detail (Sarah with disc wheel)
  await page.locator('button', { hasText: 'Sarah' }).first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/screenshot-person-detail.png` });
  console.log('  screenshot-person-detail.png');

  // 6. Journal / log
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.locator('text=Log').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/screenshot-journal.png` });
  console.log('  screenshot-journal.png');

  // 7. Profile
  await page.locator('text=Profile').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/screenshot-profile.png` });
  console.log('  screenshot-profile.png');

  await browser.close();
  console.log('Done.');
}

main().catch(console.error);
