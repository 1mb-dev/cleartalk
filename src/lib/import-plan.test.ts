import { describe, it, expect } from 'vitest';
import { planImport, type Existing } from './import-plan.ts';
import type { Contact, DiscProfile, User } from '../engine/types.ts';

const profile: DiscProfile = { d: 70, i: 20, s: 30, c: 40, primary: 'D', secondary: 'C' };
const contact = (id: string, updatedAt: number, name = 'Sam'): Contact => ({
  id, userId: 'default', name, discProfile: profile, confidence: 'high', notes: '', createdAt: 1, updatedAt,
});
const user = (updatedAt: number, primary: DiscProfile['primary'] = 'S'): User => ({
  id: 'default', displayName: '', discProfile: { ...profile, primary }, selfPick: null, createdAt: 1, updatedAt,
});
const entry = (id: string, contactId: string) => ({
  id, userId: 'default', contactId, situationType: 'feedback', outcome: 4, note: 'ok', loggedAt: 10,
});
const assessment = (id: string, takenAt: number, primary: DiscProfile['primary']) => ({
  id, userId: 'default', answers: {}, result: { ...profile, primary }, takenAt,
});
const blank = (): User => ({ id: 'default', displayName: '', discProfile: null, createdAt: 1, updatedAt: 1 });
const empty = (): Existing => ({ user: blank(), assessmentIds: new Set(), contacts: new Map(), journalIds: new Set() });

describe('planImport', () => {
  it('adds everything into an empty store', () => {
    const plan = planImport({ users: [user(5)], contacts: [contact('a', 5)], journal: [entry('j', 'a')] }, empty());
    expect(plan.user?.discProfile?.primary).toBe('S');
    expect(plan.contacts.map(c => c.id)).toEqual(['a']);
    expect(plan.journal.map(e => e.id)).toEqual(['j']);
    expect(plan.skipped).toBe(0);
  });

  it('keeps the stored profile when it is newer than the imported one', () => {
    const existing = { ...empty(), user: user(9, 'C') };
    expect(planImport({ users: [user(5, 'S')], contacts: [] }, existing).user).toBeNull();
  });

  it('keeps the stored profile even when the imported one is newer', () => {
    const existing = { ...empty(), user: user(5, 'C') };
    expect(planImport({ users: [user(9, 'S')], contacts: [] }, existing).user).toBeNull();
  });

  it('restores the imported profile over the blank user a new device creates on first visit', () => {
    const blank: User = { id: 'default', displayName: '', discProfile: null, createdAt: 100, updatedAt: 100 };
    const plan = planImport({ users: [user(5, 'S')], contacts: [] }, { ...empty(), user: blank });
    expect(plan.user?.discProfile?.primary).toBe('S');
  });

  it('keeps a newer style pick and still restores an older assessment', () => {
    const picked: User = { id: 'default', displayName: '', discProfile: null, selfPick: 'C', createdAt: 100, updatedAt: 100 };
    const plan = planImport({ users: [user(5, 'S')], contacts: [] }, { ...empty(), user: picked });
    expect(plan.user?.discProfile?.primary).toBe('S');
    expect(plan.user?.selfPick).toBe('C');
  });

  it('changes nothing when the device has an assessment and the import only has a pick', () => {
    const imported = { ...user(9), discProfile: null, selfPick: 'D' };
    expect(planImport({ users: [imported], contacts: [] }, { ...empty(), user: user(5, 'C') }).user).toBeNull();
  });

  it('adds a record repeated inside the file once', () => {
    const plan = planImport({
      assessments: [assessment('a1', 5, 'D'), assessment('a1', 5, 'D')],
      contacts: [contact('a', 5)],
      journal: [entry('j', 'a'), entry('j', 'a')],
    }, empty());
    expect(plan.assessments.map(a => a.id)).toEqual(['a1']);
    expect(plan.journal.map(e => e.id)).toEqual(['j']);
    expect(plan.skipped).toBe(0);
  });

  it('adds imported assessments to the history without replacing the stored style', () => {
    const existing = { ...empty(), user: user(3, 'C'), assessmentIds: new Set(['a2']) };
    const plan = planImport({ users: [user(5, 'S')], assessments: [assessment('a1', 9, 'S')], contacts: [] }, existing);
    expect(plan.user).toBeNull();
    expect(plan.assessments.map(a => a.id)).toEqual(['a1']);
  });

  it('sets the style from the newest imported assessment when the file has no valid user', () => {
    const plan = planImport({ users: [{ discProfile: 'bad' }], assessments: [assessment('a1', 1, 'S'), assessment('a2', 5, 'I')], contacts: [] }, empty());
    expect(plan.user?.discProfile?.primary).toBe('I');
    expect(plan.skipped).toBe(1);
  });

  it('writes no user when the file has none and nothing changes', () => {
    // getOrCreateUser stores a user with no selfPick field at all.
    const stored: User = { id: 'default', displayName: '', discProfile: null, createdAt: 1, updatedAt: 1 };
    expect(planImport({ users: [], contacts: [] }, { ...empty(), user: stored }).user).toBeNull();
  });

  it('keeps the newest copy of a person repeated inside the file', () => {
    const plan = planImport({ contacts: [contact('a', 9, 'Newer'), contact('a', 5, 'Older')] }, empty());
    expect(plan.contacts.map(c => c.name)).toEqual(['Newer']);
  });

  it('replaces a contact only with a newer version and never drops stored ones', () => {
    const existing = { ...empty(), contacts: new Map([['a', contact('a', 9, 'Stored')], ['b', contact('b', 1)]]) };
    const plan = planImport({ contacts: [contact('a', 5, 'Older'), contact('c', 5)] }, existing);
    expect(plan.contacts.map(c => c.id)).toEqual(['c']);
  });

  it('adds journal entries once and skips notes about people who exist nowhere', () => {
    const existing = { ...empty(), contacts: new Map([['a', contact('a', 1)]]), journalIds: new Set(['old']) };
    const plan = planImport({ contacts: [], journal: [entry('old', 'a'), entry('new', 'a'), entry('orphan', 'zz')] }, existing);
    expect(plan.journal.map(e => e.id)).toEqual(['new']);
    expect(plan.skipped).toBe(1);
  });

  it('skips invalid records and counts them', () => {
    const plan = planImport({
      contacts: [{ id: 'x' }, contact('a', 5)],
      journal: [{ ...entry('j1', 'a'), outcome: 9 }, { ...entry('j2', 'a'), situationType: 'constructor' }],
      users: ['nope'],
    }, empty());
    expect(plan.contacts.map(c => c.id)).toEqual(['a']);
    expect(plan.journal).toEqual([]);
    expect(plan.skipped).toBe(4);
  });

  it('cleans names and notes the way normal saves do', () => {
    const plan = planImport({ contacts: [contact('a', 5, '  Dana​  ')] }, empty());
    expect(plan.contacts[0].name).toBe('Dana');
  });

  it('rejects a file that is not an export', () => {
    expect(() => planImport({ hello: 1 }, empty())).toThrow('Not a Cleartalk export');
    expect(() => planImport(null, empty())).toThrow('Not a Cleartalk export');
  });
});
