import { db } from '../db/schema.ts';
import { DEFAULT_USER_ID } from '../engine/types.ts';
import { planImport } from './import-plan.ts';

export async function exportData(): Promise<string> {
  const [users, assessments, contacts, journal] = await Promise.all([
    db.users.toArray(),
    db.assessments.toArray(),
    db.contacts.toArray(),
    db.journal.toArray(),
  ]);

  return JSON.stringify({ users, assessments, contacts, journal, exportedAt: new Date().toISOString() }, null, 2);
}

export function downloadJson(data: string, filename: string): void {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

export interface ImportResult {
  contacts: number;
  entries: number;
  skipped: number;
  /** The reader's own style or pick was written. */
  style: boolean;
}

/** Merge an export into local data. Never deletes, never replaces a newer record. */
export async function importData(json: string): Promise<ImportResult> {
  const data: unknown = JSON.parse(json);
  return db.transaction('rw', [db.users, db.assessments, db.contacts, db.journal], async () => {
    const [user, assessmentIds, contacts, journalIds] = await Promise.all([
      db.users.get(DEFAULT_USER_ID),
      db.assessments.toCollection().primaryKeys(),
      db.contacts.toArray(),
      db.journal.toCollection().primaryKeys(),
    ]);
    const now = Date.now();
    const plan = planImport(data, {
      user: user ?? { id: DEFAULT_USER_ID, displayName: '', discProfile: null, createdAt: now, updatedAt: now },
      assessmentIds: new Set(assessmentIds),
      contacts: new Map(contacts.map(c => [c.id, c])),
      journalIds: new Set(journalIds),
    });
    if (plan.user) await db.users.put({ ...plan.user, updatedAt: now });
    await db.assessments.bulkAdd(plan.assessments);
    await db.contacts.bulkPut(plan.contacts);
    await db.journal.bulkAdd(plan.journal);
    return { contacts: plan.contacts.length, entries: plan.journal.length, skipped: plan.skipped, style: plan.user !== null };
  });
}

export async function clearAllData(): Promise<void> {
  await db.transaction('rw', [db.users, db.assessments, db.contacts, db.journal], async () => {
    await db.journal.clear();
    await db.contacts.clear();
    await db.assessments.clear();
    await db.users.clear();
  });
}
