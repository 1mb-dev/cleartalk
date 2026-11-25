import type { Contact, DiscType, JournalEntry, SituationType } from './types.ts';

export interface NotedMoment {
  note: string;
  contactName: string;
  situation: SituationType;
  loggedAt: number;
}

export interface Patterns {
  /** Notes from conversations rated 4-5, newest first. */
  worked: NotedMoment[];
  /** Notes from conversations rated 1-2, newest first. */
  change: NotedMoment[];
  /** A style the reader keeps finding hard, when there is enough to say so. */
  rough: { type: DiscType; count: number } | null;
}

const PER_LIST = 3;
const ROUGH_MIN = 3;

/**
 * The reader's own words back to them: what went well and what they'd change, plus at most one
 * line about a style, only once three or more conversations with it went badly.
 * Expects entries newest first, as the journal queries return them.
 */
export function findPatterns(entries: JournalEntry[], contacts: Contact[]): Patterns {
  const byId = new Map(contacts.map(c => [c.id, c]));
  const worked: NotedMoment[] = [];
  const change: NotedMoment[] = [];
  const roughByType = new Map<DiscType, number>();

  for (const e of entries) {
    const contact = byId.get(e.contactId);
    if (!contact) continue;
    if (e.outcome <= 2) {
      const t = contact.discProfile.primary;
      roughByType.set(t, (roughByType.get(t) ?? 0) + 1);
    }
    const note = e.note.trim();
    if (!note) continue;
    const moment = { note, contactName: contact.name, situation: e.situationType, loggedAt: e.loggedAt };
    if (e.outcome >= 4 && worked.length < PER_LIST) worked.push(moment);
    if (e.outcome <= 2 && change.length < PER_LIST) change.push(moment);
  }

  let rough: Patterns['rough'] = null;
  for (const [type, count] of roughByType) {
    if (count >= ROUGH_MIN && (!rough || count > rough.count)) rough = { type, count };
  }
  return { worked, change, rough };
}
