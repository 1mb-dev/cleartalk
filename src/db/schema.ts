import Dexie, { type EntityTable } from 'dexie';
import type { User, Assessment, Contact, JournalEntry } from '../engine/types.ts';

export class ClearTalkDB extends Dexie {
  users!: EntityTable<User, 'id'>;
  assessments!: EntityTable<Assessment, 'id'>;
  contacts!: EntityTable<Contact, 'id'>;
  journal!: EntityTable<JournalEntry, 'id'>;

  constructor() {
    super('cleartalk');

    this.version(1).stores({
      users: 'id, createdAt',
      assessments: 'id, userId, takenAt',
      contacts: 'id, userId, name, updatedAt',
      journal: 'id, userId, contactId, situationType, loggedAt, [userId+contactId], [userId+loggedAt], [userId+contactId+loggedAt]',
    });
  }
}

export const db = new ClearTalkDB();
