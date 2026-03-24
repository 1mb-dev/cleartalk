import Dexie from 'dexie';
import { db } from './schema.ts';
import type { User, Assessment, Contact, JournalEntry } from '../engine/types.ts';
import { generateId } from '../lib/id.ts';
import { sanitizeName, sanitizeNote } from '../lib/sanitize.ts';

const DEFAULT_USER_ID = 'default';

export async function getOrCreateUser(): Promise<User> {
  const existing = await db.users.get(DEFAULT_USER_ID);
  if (existing) return existing;

  const now = Date.now();
  const user: User = {
    id: DEFAULT_USER_ID,
    displayName: '',
    discProfile: null,
    createdAt: now,
    updatedAt: now,
  };
  // put is idempotent -- safe if two tabs race on first visit
  await db.users.put(user);
  return user;
}

export async function updateUserProfile(profile: User['discProfile']): Promise<void> {
  await db.users.update(DEFAULT_USER_ID, {
    discProfile: profile,
    updatedAt: Date.now(),
  });
}

export async function saveAssessment(assessment: Omit<Assessment, 'id'>): Promise<string> {
  const id = generateId();
  await db.assessments.add({ ...assessment, id });
  return id;
}

export async function getContacts(): Promise<Contact[]> {
  const contacts = await db.contacts.where('userId').equals(DEFAULT_USER_ID).sortBy('updatedAt');
  return contacts.reverse();
}

export async function getContact(id: string): Promise<Contact | undefined> {
  return db.contacts.get(id);
}

export async function addContact(contact: Omit<Contact, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const id = generateId();
  const now = Date.now();
  await db.contacts.add({
    ...contact,
    name: sanitizeName(contact.name),
    notes: sanitizeNote(contact.notes),
    id,
    userId: DEFAULT_USER_ID,
    createdAt: now,
    updatedAt: now,
  });
  return id;
}

export async function updateContact(id: string, updates: Partial<Contact>): Promise<void> {
  const sanitized = { ...updates };
  if (sanitized.name !== undefined) sanitized.name = sanitizeName(sanitized.name);
  if (sanitized.notes !== undefined) sanitized.notes = sanitizeNote(sanitized.notes);
  await db.contacts.update(id, { ...sanitized, updatedAt: Date.now() });
}

export async function deleteContact(id: string): Promise<void> {
  await db.transaction('rw', [db.contacts, db.journal], async () => {
    await db.journal.where('[userId+contactId]').equals([DEFAULT_USER_ID, id]).delete();
    await db.contacts.delete(id);
  });
}

export async function addJournalEntry(entry: Omit<JournalEntry, 'id' | 'userId'>): Promise<string> {
  const id = generateId();
  await db.journal.add({
    ...entry,
    note: sanitizeNote(entry.note),
    id,
    userId: DEFAULT_USER_ID,
  });
  return id;
}

export async function getJournalEntries(limit = 50): Promise<JournalEntry[]> {
  return db.journal
    .where('[userId+loggedAt]')
    .between([DEFAULT_USER_ID, Dexie.minKey], [DEFAULT_USER_ID, Dexie.maxKey])
    .reverse()
    .limit(limit)
    .toArray();
}

export async function getJournalForContact(contactId: string, limit = 50): Promise<JournalEntry[]> {
  return db.journal
    .where('[userId+contactId+loggedAt]')
    .between(
      [DEFAULT_USER_ID, contactId, Dexie.minKey],
      [DEFAULT_USER_ID, contactId, Dexie.maxKey],
    )
    .reverse()
    .limit(limit)
    .toArray();
}

export async function getJournalCount(): Promise<number> {
  return db.journal.where('userId').equals(DEFAULT_USER_ID).count();
}
