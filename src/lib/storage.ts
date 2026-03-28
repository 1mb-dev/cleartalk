import { db } from '../db/schema.ts';
import type { User, Assessment, Contact, JournalEntry } from '../engine/types.ts';

interface ExportPayload {
  users: User[];
  assessments: Assessment[];
  contacts: Contact[];
  journal: JournalEntry[];
  exportedAt: string;
}

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

export async function importData(json: string): Promise<{ contacts: number; entries: number }> {
  const data: ExportPayload = JSON.parse(json);

  if (!data.contacts || !Array.isArray(data.contacts)) {
    throw new Error('Invalid export file: missing contacts');
  }
  if (data.users && !Array.isArray(data.users)) {
    throw new Error('Invalid export file: users must be an array');
  }
  if (data.assessments && !Array.isArray(data.assessments)) {
    throw new Error('Invalid export file: assessments must be an array');
  }
  if (data.journal && !Array.isArray(data.journal)) {
    throw new Error('Invalid export file: journal must be an array');
  }

  let contactCount = 0;
  let entryCount = 0;

  await db.transaction('rw', [db.users, db.assessments, db.contacts, db.journal], async () => {
    for (const user of data.users ?? []) {
      await db.users.put(user);
    }
    for (const assessment of data.assessments ?? []) {
      await db.assessments.put(assessment);
    }
    for (const contact of data.contacts) {
      await db.contacts.put(contact);
      contactCount++;
    }
    for (const entry of data.journal ?? []) {
      await db.journal.put(entry);
      entryCount++;
    }
  });

  return { contacts: contactCount, entries: entryCount };
}

export async function clearAllData(): Promise<void> {
  await db.transaction('rw', [db.users, db.assessments, db.contacts, db.journal], async () => {
    await db.journal.clear();
    await db.contacts.clear();
    await db.assessments.clear();
    await db.users.clear();
  });
}
