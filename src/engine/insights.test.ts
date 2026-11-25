import { describe, it, expect } from 'vitest';
import { findPatterns } from './insights.ts';
import type { Contact, DiscType, JournalEntry } from './types.ts';

const contact = (id: string, name: string, primary: DiscType): Contact => ({
  id, userId: 'default', name, confidence: 'high', notes: '', createdAt: 1, updatedAt: 1,
  discProfile: { d: 0, i: 0, s: 0, c: 0, primary, secondary: 'D' },
});
let n = 0;
const entry = (contactId: string, outcome: JournalEntry['outcome'], note = ''): JournalEntry => ({
  id: `e${++n}`, userId: 'default', contactId, situationType: 'feedback', outcome, note, loggedAt: 1000 - n,
});

const sam = contact('sam', 'Sam', 'S');
const dee = contact('dee', 'Dee', 'D');

describe('findPatterns', () => {
  it('returns empty patterns for no entries', () => {
    expect(findPatterns([], [sam])).toEqual({ worked: [], change: [], rough: null });
  });

  it('sorts notes into what worked (4-5) and what to change (1-2), ignoring the middle', () => {
    const p = findPatterns([entry('sam', 5, 'Asked first'), entry('sam', 3, 'Fine'), entry('dee', 1, 'Talked over her')], [sam, dee]);
    expect(p.worked.map(m => m.note)).toEqual(['Asked first']);
    expect(p.change.map(m => [m.contactName, m.note])).toEqual([['Dee', 'Talked over her']]);
  });

  it('keeps the newest three per list, in the order given', () => {
    const entries = [1, 2, 3, 4].map(i => entry('sam', 5, `note ${i}`));
    expect(findPatterns(entries, [sam]).worked.map(m => m.note)).toEqual(['note 1', 'note 2', 'note 3']);
  });

  it('skips blank notes and entries for people who were removed', () => {
    const p = findPatterns([entry('sam', 5, '   '), entry('gone', 1, 'orphan')], [sam]);
    expect(p).toEqual({ worked: [], change: [], rough: null });
  });

  it('names a rough style only from three bad conversations on, noted or not', () => {
    expect(findPatterns([entry('dee', 1), entry('dee', 2)], [dee]).rough).toBeNull();
    expect(findPatterns([entry('dee', 1), entry('dee', 2), entry('dee', 1)], [dee]).rough).toEqual({ type: 'D', count: 3 });
  });

  it('picks the style with the most rough conversations', () => {
    const entries = [entry('sam', 1), entry('sam', 1), entry('sam', 2), entry('dee', 1), entry('dee', 1), entry('dee', 2), entry('dee', 1)];
    expect(findPatterns(entries, [sam, dee]).rough).toEqual({ type: 'D', count: 4 });
  });
});
