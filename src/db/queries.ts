import Dexie from 'dexie';
import { db } from './schema.ts';
import type { User, Assessment, Contact, JournalEntry } from '../engine/types.ts';
import { generateId } from '../lib/id.ts';

const DEFAULT_USER_ID = 'default';

export async function getOrCreateUser(): Promise<User> {
  const existing = await db.users.get(DEFAULT_USER_ID);
  if (existing) return existing;

  const user: User = {
    id: DEFAULT_USER_ID,
    displayName: '',
    discProfile: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await db.users.add(user);
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
  return db.contacts.where('userId').equals(DEFAULT_USER_ID).sortBy('updatedAt');
}

export async function getContact(id: string): Promise<Contact | undefined> {
  return db.contacts.get(id);
}

export async function addContact(contact: Omit<Contact, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const id = generateId();
  const now = Date.now();
  await db.contacts.add({
    ...contact,
    id,
    userId: DEFAULT_USER_ID,
    createdAt: now,
    updatedAt: now,
  });
  return id;
}

export async function updateContact(id: string, updates: Partial<Contact>): Promise<void> {
  await db.contacts.update(id, { ...updates, updatedAt: Date.now() });
}

export async function deleteContact(id: string): Promise<void> {
  await db.contacts.delete(id);
}

export async function addJournalEntry(entry: Omit<JournalEntry, 'id' | 'userId'>): Promise<string> {
  const id = generateId();
  await db.journal.add({ ...entry, id, userId: DEFAULT_USER_ID });
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

export async function getJournalForContact(contactId: string): Promise<JournalEntry[]> {
  return db.journal
    .where('[userId+contactId]')
    .equals([DEFAULT_USER_ID, contactId])
    .reverse()
    .sortBy('loggedAt');
}

export async function getJournalCount(): Promise<number> {
  return db.journal.where('userId').equals(DEFAULT_USER_ID).count();
}
