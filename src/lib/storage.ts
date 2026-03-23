import { db } from '../db/schema.ts';

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
  a.click();
  URL.revokeObjectURL(url);
}
