import type { Assessment, Contact, DiscProfile, DiscType, JournalEntry, User } from '../engine/types.ts';
import { DEFAULT_USER_ID, isSituation } from '../engine/types.ts';
import { sanitizeName, sanitizeNote } from './sanitize.ts';

export interface Existing {
  /** The stored user, or a blank one when none is stored yet. */
  user: User;
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

/** The style fields of an exported user; nothing else on the record is imported. */
function toStyle(v: unknown): Pick<User, 'discProfile' | 'selfPick'> | null {
  if (!isRec(v)) return null;
  if (v.discProfile != null && !isProfile(v.discProfile)) return null;
  return { discProfile: v.discProfile ?? null, selfPick: isType(v.selfPick) ? v.selfPick : null };
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
 * by a newer one. The reader's own style is the exception: the file fills what this device lacks
 * and never replaces what it has. Records that fail validation, and notes about people who exist
 * in neither place, are skipped and counted.
 */
export function planImport(data: unknown, existing: Existing): ImportPlan {
  if (!isRec(data) || !Array.isArray(data.contacts)) {
    throw new Error('Not a Cleartalk export: no contacts list');
  }
  const list = (k: string): unknown[] => (Array.isArray(data[k]) ? (data[k] as unknown[]) : []);
  let skipped = 0;

  // Both are written with bulkAdd, which aborts the whole import on a repeated id.
  const assessmentIds = new Set(existing.assessmentIds);
  const assessments: Assessment[] = [];
  let newestFile: Assessment | null = null;
  for (const raw of list('assessments')) {
    const a = toAssessment(raw);
    if (!a) { skipped++; continue; }
    if (!assessmentIds.has(a.id)) { assessments.push(a); assessmentIds.add(a.id); }
    if (!newestFile || a.takenAt > newestFile.takenAt) newestFile = a;
  }

  let fileProfile: DiscProfile | null = null;
  let filePick: DiscType | null = null;
  for (const raw of list('users')) {
    const u = toStyle(raw);
    if (!u) { skipped++; continue; }
    fileProfile ??= u.discProfile;
    filePick ??= u.selfPick ?? null;
  }
  // Fill only what this device lacks: an assessment result if it has none, a pick only if it
  // still has no style at all. Timestamps play no part, so no clock can roll a style back.
  // A stored value that is missing (older versions wrote no key) or corrupt counts as absent.
  const s = existing.user;
  const hasProfile = isProfile(s.discProfile) ? s.discProfile : null;
  const hasPick = isType(s.selfPick) ? s.selfPick : null;
  const discProfile = hasProfile ?? fileProfile ?? newestFile?.result ?? null;
  const selfPick = hasPick ?? (discProfile ? null : filePick);
  const user = discProfile !== hasProfile || selfPick !== hasPick ? { ...s, discProfile, selfPick } : null;

  // Keyed by id: bulkPut keeps the last copy of a repeated id, which may be the older one.
  const planned = new Map<string, Contact>();
  const known = new Set(existing.contacts.keys());
  for (const raw of data.contacts) {
    const c = toContact(raw);
    if (!c) { skipped++; continue; }
    known.add(c.id);
    const current = planned.get(c.id) ?? existing.contacts.get(c.id);
    if (!current || c.updatedAt > current.updatedAt) planned.set(c.id, c);
  }
  const contacts = [...planned.values()];

  const journalIds = new Set(existing.journalIds);
  const journal: JournalEntry[] = [];
  for (const raw of list('journal')) {
    const e = toEntry(raw);
    if (!e || !known.has(e.contactId)) { skipped++; continue; }
    if (!journalIds.has(e.id)) { journal.push(e); journalIds.add(e.id); }
  }

  return { user, assessments, contacts, journal, skipped };
}
