export type DiscType = 'D' | 'I' | 'S' | 'C';

export type SituationType =
  | 'feedback'
  | 'request'
  | 'conflict'
  | 'pitch'
  | 'difficult_news';

export interface DiscProfile {
  d: number;
  i: number;
  s: number;
  c: number;
  primary: DiscType;
  secondary: DiscType;
}

export interface User {
  id: string;
  displayName: string;
  discProfile: DiscProfile | null;
  /** The style the user picked for themselves before taking the assessment. */
  selfPick?: DiscType | null;
  createdAt: number;
  updatedAt: number;
}

export interface Assessment {
  id: string;
  userId: string;
  answers: Record<string, 'a' | 'b'>;
  result: DiscProfile;
  takenAt: number;
}

export interface Contact {
  id: string;
  userId: string;
  name: string;
  discProfile: DiscProfile;
  confidence: 'low' | 'medium' | 'high';
  notes: string;
  createdAt: number;
  updatedAt: number;
}

export interface JournalEntry {
  id: string;
  userId: string;
  contactId: string;
  situationType: SituationType;
  outcome: 1 | 2 | 3 | 4 | 5;
  note: string;
  loggedAt: number;
}

export interface CoachingCard {
  yourType: DiscType;
  theirType: DiscType;
  situation: SituationType;
  approach: string;
  openWith: string[];
  avoid: string[];
  theirReaction: string;
  ifGoesWrong: string;
  bodyLanguage: string;
}

export interface AssessmentQuestion {
  id: string;
  optionA: { text: string; dimension: DiscType; weight: number };
  optionB: { text: string; dimension: DiscType; weight: number };
}

export interface ObservationQuestion {
  id: string;
  question: string;
  optionA: { text: string; signals: Partial<Record<DiscType, number>> };
  optionB: { text: string; signals: Partial<Record<DiscType, number>> };
}

export const DISC_LABELS: Record<DiscType, string> = {
  D: 'Drive',
  I: 'Influence',
  S: 'Steady',
  C: 'Clarity',
};

export const SITUATION_LABELS: Record<SituationType, string> = {
  feedback: 'Give Feedback',
  request: 'Make a Request',
  conflict: 'Navigate Conflict',
  pitch: 'Pitch an Idea',
  difficult_news: 'Deliver Difficult News',
};

export function isSituation(s: string | undefined): s is SituationType {
  return s !== undefined && Object.hasOwn(SITUATION_LABELS, s);
}

/** The reader's own style for a card: the assessment wins, then their own pick, else unknown. */
export function resolveYourType(user: Pick<User, 'discProfile' | 'selfPick'>): { type: DiscType; source: 'assessment' | 'pick' } | null {
  if (user.discProfile) return { type: user.discProfile.primary, source: 'assessment' };
  if (user.selfPick) return { type: user.selfPick, source: 'pick' };
  return null;
}
