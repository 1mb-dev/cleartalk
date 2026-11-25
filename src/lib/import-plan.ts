import type { Assessment, Contact, DiscProfile, DiscType, JournalEntry, User } from '../engine/types.ts';
import { DEFAULT_USER_ID, isSituation } from '../engine/types.ts';
import { sanitizeName, sanitizeNote } from './sanitize.ts';

export interface Existing {
  user: User | undefined;
  assessmentIds: Set<string>;
  contacts: Map<string, Contact>;
  journalIds: Set<string>;
}

export interface ImportPlan {
  user: User | null;
  assessments: Assessment[];
  contacts: Contact[];
  journal: JournalEntry[];
  skipped: number;
}

const TYPES = new Set<string>(['D', 'I', 'S', 'C']);
type Rec = Record<string, unknown>;

const isRec = (v: unknown): v is Rec => typeof v === 'object' && v !== null && !Array.isArray(v);
const isStr = (v: unknown): v is string => typeof v === 'string';
const isTime = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v > 0;
const isType = (v: unknown): v is DiscType => isStr(v) && TYPES.has(v);

function isProfile(v: unknown): v is DiscProfile {
  return isRec(v) && isType(v.primary) && isType(v.secondary)
    && ['d', 'i', 's', 'c'].every(k => typeof v[k] === 'number');
}

function toUser(v: unknown): User | null {
  if (!isRec(v) || !isTime(v.createdAt) || !isTime(v.updatedAt)) return null;
  if (v.discProfile !== null && !isProfile(v.discProfile)) return null;
  return {
    id: DEFAULT_USER_ID,
    displayName: isStr(v.displayName) ? v.displayName : '',
    discProfile: v.discProfile,
    selfPick: isType(v.selfPick) ? v.selfPick : null,
    createdAt: v.createdAt,
    updatedAt: v.updatedAt,
  };
}

function toAssessment(v: unknown): Assessment | null {
  if (!isRec(v) || !isStr(v.id) || !isTime(v.takenAt) || !isProfile(v.result) || !isRec(v.answers)) return null;
  return { id: v.id, userId: DEFAULT_USER_ID, answers: v.answers as Assessment['answers'], result: v.result, takenAt: v.takenAt };
}

function toContact(v: unknown): Contact | null {
  if (!isRec(v) || !isStr(v.id) || !isStr(v.name) || !isProfile(v.discProfile)) return null;
  if (!isTime(v.createdAt) || !isTime(v.updatedAt)) return null;
  if (v.confidence !== 'low' && v.confidence !== 'medium' && v.confidence !== 'high') return null;
  const name = sanitizeName(v.name);
  if (!name) return null;
  return {
    id: v.id, userId: DEFAULT_USER_ID, name, discProfile: v.discProfile, confidence: v.confidence,
    notes: sanitizeNote(isStr(v.notes) ? v.notes : ''), createdAt: v.createdAt, updatedAt: v.updatedAt,
  };
}

function toEntry(v: unknown): JournalEntry | null {
  if (!isRec(v) || !isStr(v.id) || !isStr(v.contactId) || !isStr(v.situationType) || !isSituation(v.situationType)) return null;
  if (!isTime(v.loggedAt) || ![1, 2, 3, 4, 5].includes(v.outcome as number)) return null;
  return {
    id: v.id, userId: DEFAULT_USER_ID, contactId: v.contactId, situationType: v.situationType,
    outcome: v.outcome as JournalEntry['outcome'], note: sanitizeNote(isStr(v.note) ? v.note : ''), loggedAt: v.loggedAt,
  };
}

/**
 * Merge an export into what is stored: nothing is deleted, and a stored record is only replaced
 * by a newer one. Records that fail validation, and notes about people who exist in neither
 * place, are skipped and counted.
 */
export function planImport(data: unknown, existing: Existing): ImportPlan {
  if (!isRec(data) || !Array.isArray(data.contacts)) {
    throw new Error('Not a ClearTalk export: no contacts list');
  }
  const list = (k: string): unknown[] => (Array.isArray(data[k]) ? (data[k] as unknown[]) : []);
  let skipped = 0;

  let user: User | null = null;
  for (const raw of list('users')) {
    const u = toUser(raw);
    if (!u) { skipped++; continue; }
    const current = user ?? existing.user;
    if (!current || u.updatedAt > current.updatedAt) user = u;
  }

  const assessments: Assessment[] = [];
  for (const raw of list('assessments')) {
    const a = toAssessment(raw);
    if (!a) { skipped++; continue; }
    if (!existing.assessmentIds.has(a.id)) assessments.push(a);
  }

  const contacts: Contact[] = [];
  const known = new Set(existing.contacts.keys());
  for (const raw of data.contacts) {
    const c = toContact(raw);
    if (!c) { skipped++; continue; }
    known.add(c.id);
    const current = existing.contacts.get(c.id);
    if (!current || c.updatedAt > current.updatedAt) contacts.push(c);
  }

  const journal: JournalEntry[] = [];
  for (const raw of list('journal')) {
    const e = toEntry(raw);
    if (!e || !known.has(e.contactId)) { skipped++; continue; }
    if (!existing.journalIds.has(e.id)) journal.push(e);
  }

  return { user, assessments, contacts, journal, skipped };
}
