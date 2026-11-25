import { describe, it, expect } from 'vitest';
import { planImport, type Existing } from './import-plan.ts';
import { resolveYourType, type DiscProfile, type DiscType, type User } from '../engine/types.ts';

// Guard for the reader's own style on import: the file fills what this device lacks and never
// replaces what it has. The oracle below is a priority table written apart from the code.
const P = (primary: DiscType): DiscProfile => ({ d: 50, i: 50, s: 50, c: 50, primary, secondary: primary === 'D' ? 'I' : 'D' });
const FUTURE = Date.now() + 10_000_000_000;

type Stored = { name: string; discProfile: DiscProfile | null; selfPick?: DiscType; raw?: Record<string, unknown> };
type FileUser = { name: string; raw?: unknown; discProfile?: DiscProfile | null; selfPick?: DiscType | null };
type FileAssessments = { name: string; list: { id: string; takenAt: number; primary: DiscType }[]; storedIds?: string[] };

const STORED: Stored[] = [
  { name: 'blank', discProfile: null },
  { name: 'pick', discProfile: null, selfPick: 'C' },
  { name: 'profile', discProfile: P('D') },
  { name: 'both', discProfile: P('D'), selfPick: 'C' },
  // Older versions stored a user with no discProfile key; corrupt values count as absent.
  { name: 'no profile key', discProfile: null, raw: { discProfile: undefined } },
  { name: 'corrupt', discProfile: null, raw: { discProfile: 'junk', selfPick: 'Q' } },
];
const FILE_USERS: FileUser[] = [
  { name: 'none' },
  { name: 'invalid', raw: { discProfile: 'nope' } },
  { name: 'blank', discProfile: null, selfPick: null },
  { name: 'pick', discProfile: null, selfPick: 'I' },
  { name: 'profile', discProfile: P('S'), selfPick: null },
  { name: 'both', discProfile: P('S'), selfPick: 'I' },
  { name: 'two records', raw: [{ discProfile: null, selfPick: 'I' }, { discProfile: P('S'), selfPick: null }] },
];
const FILE_ASSESSMENTS: FileAssessments[] = [
  { name: 'none', list: [] },
  { name: 'older', list: [{ id: 'x1', takenAt: 1, primary: 'I' }] },
  { name: 'newer', list: [{ id: 'x1', takenAt: 2_000_000_000_000, primary: 'I' }] },
  { name: 'future', list: [{ id: 'x1', takenAt: FUTURE, primary: 'I' }] },
  { name: 'two', list: [{ id: 'x1', takenAt: 5, primary: 'I' }, { id: 'x2', takenAt: 9, primary: 'C' }] },
  { name: 'already stored', list: [{ id: 'x1', takenAt: 5, primary: 'I' }], storedIds: ['x1'] },
];

function expected(s: Stored, f: FileUser, a: FileAssessments) {
  const newest = [...a.list].sort((x, y) => y.takenAt - x.takenAt)[0];
  if (s.discProfile) return { type: s.discProfile.primary, source: 'assessment' };
  const fileProfile = f.discProfile ?? (f.name === 'two records' ? P('S') : null);
  const filePick = f.selfPick ?? (f.name === 'two records' ? 'I' : null);
  if (fileProfile) return { type: fileProfile.primary, source: 'assessment' };
  if (newest) return { type: newest.primary, source: 'assessment' };
  if (s.selfPick) return { type: s.selfPick, source: 'pick' };
  if (filePick) return { type: filePick, source: 'pick' };
  return null;
}

function run(s: Stored, f: FileUser, a: FileAssessments, storedNewer: boolean) {
  const stamp = storedNewer ? [9_000, 1_000] : [1_000, 9_000];
  const user = { id: 'default', displayName: '', discProfile: s.discProfile, createdAt: 1, updatedAt: stamp[0], ...s.raw } as User;
  if (s.selfPick) user.selfPick = s.selfPick;
  if (s.raw && !('discProfile' in s.raw && s.raw.discProfile !== undefined)) delete (user as Partial<User>).discProfile;
  const existing: Existing = { user, assessmentIds: new Set(a.storedIds ?? []), contacts: new Map(), journalIds: new Set() };
  const users = f.name === 'none' ? [] : Array.isArray(f.raw) ? f.raw : [f.raw ?? {
    id: 'default', displayName: '', discProfile: f.discProfile, selfPick: f.selfPick, createdAt: 1, updatedAt: stamp[1],
  }];
  const assessments = a.list.map(x => ({ id: x.id, userId: 'default', answers: {}, result: P(x.primary), takenAt: x.takenAt }));
  const plan = planImport({ users, assessments, contacts: [] }, existing);
  return { before: resolveYourType(user), after: resolveYourType(plan.user ?? user), plan, user };
}

const cells = STORED.flatMap(s => FILE_USERS.flatMap(f => FILE_ASSESSMENTS.flatMap(a =>
  [true, false].map(storedNewer => ({ s, f, a, storedNewer })))));

describe('import and the reader\'s own style', () => {
  it('covers the grid', () => {
    expect(cells).toHaveLength(6 * 7 * 6 * 2);
  });

  for (const { s, f, a, storedNewer } of cells) {
    const label = `stored ${s.name}, file user ${f.name}, assessments ${a.name}, ${storedNewer ? 'stored newer' : 'file newer'}`;
    it(label, () => {
      const { before, after, plan } = run(s, f, a, storedNewer);
      // Nothing to fill: a corrupt stored value is left as it is; repairing it isn't the import's job.
      if (s.name === 'corrupt' && expected(s, f, a) === null) {
        expect(plan.user).toBeNull();
        return;
      }
      // 1. Nothing valid the device already has is replaced.
      if (plan.user) {
        if (s.discProfile) expect(plan.user.discProfile).toEqual(s.discProfile);
        if (s.selfPick) expect(plan.user.selfPick).toBe(s.selfPick);
      }
      // 2. The style matches the priority table.
      expect(after).toEqual(expected(s, f, a));
      // 3. A user is written exactly when the style changes, so "Restored your style." is never false.
      expect(plan.user !== null).toBe(JSON.stringify(after) !== JSON.stringify(before));
      // 4. Which record is newer never changes the result.
      expect(run(s, f, a, !storedNewer).after).toEqual(after);
    });
  }
});
