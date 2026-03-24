import { describe, it, expect } from 'vitest';
import { scoreAssessment } from './assessment.ts';
import { questions } from '../data/questions.ts';

describe('scoreAssessment', () => {
  it('returns a valid DiscProfile shape', () => {
    const answers: Record<string, 'a' | 'b'> = {};
    for (const q of questions) answers[q.id] = 'a';

    const profile = scoreAssessment(answers);
    expect(profile).toHaveProperty('d');
    expect(profile).toHaveProperty('i');
    expect(profile).toHaveProperty('s');
    expect(profile).toHaveProperty('c');
    expect(profile).toHaveProperty('primary');
    expect(profile).toHaveProperty('secondary');
    expect(['D', 'I', 'S', 'C']).toContain(profile.primary);
    expect(['D', 'I', 'S', 'C']).toContain(profile.secondary);
    expect(profile.primary).not.toBe(profile.secondary);
  });

  it('scores all dimensions 0-100', () => {
    const answers: Record<string, 'a' | 'b'> = {};
    for (const q of questions) answers[q.id] = 'a';

    const profile = scoreAssessment(answers);
    for (const dim of [profile.d, profile.i, profile.s, profile.c]) {
      expect(dim).toBeGreaterThanOrEqual(0);
      expect(dim).toBeLessThanOrEqual(100);
    }
  });

  it('produces strong D profile when all D options are chosen', () => {
    const answers: Record<string, 'a' | 'b'> = {};
    for (const q of questions) {
      // Pick the option that maps to D, or 'a' if neither does
      if (q.optionA.dimension === 'D') answers[q.id] = 'a';
      else if (q.optionB.dimension === 'D') answers[q.id] = 'b';
      else answers[q.id] = 'a';
    }

    const profile = scoreAssessment(answers);
    expect(profile.primary).toBe('D');
    expect(profile.d).toBe(100);
  });

  it('produces strong I profile when all I options are chosen', () => {
    const answers: Record<string, 'a' | 'b'> = {};
    for (const q of questions) {
      if (q.optionA.dimension === 'I') answers[q.id] = 'a';
      else if (q.optionB.dimension === 'I') answers[q.id] = 'b';
      else answers[q.id] = 'a';
    }

    const profile = scoreAssessment(answers);
    expect(profile.primary).toBe('I');
    expect(profile.i).toBe(100);
  });

  it('produces strong S profile when all S options are chosen', () => {
    const answers: Record<string, 'a' | 'b'> = {};
    for (const q of questions) {
      if (q.optionA.dimension === 'S') answers[q.id] = 'a';
      else if (q.optionB.dimension === 'S') answers[q.id] = 'b';
      else answers[q.id] = 'a';
    }

    const profile = scoreAssessment(answers);
    expect(profile.primary).toBe('S');
    expect(profile.s).toBe(100);
  });

  it('produces strong C profile when all C options are chosen', () => {
    const answers: Record<string, 'a' | 'b'> = {};
    for (const q of questions) {
      if (q.optionA.dimension === 'C') answers[q.id] = 'a';
      else if (q.optionB.dimension === 'C') answers[q.id] = 'b';
      else answers[q.id] = 'a';
    }

    const profile = scoreAssessment(answers);
    expect(profile.primary).toBe('C');
    expect(profile.c).toBe(100);
  });

  it('handles empty answers (all dimensions zero)', () => {
    const profile = scoreAssessment({});
    expect(profile.d).toBe(0);
    expect(profile.i).toBe(0);
    expect(profile.s).toBe(0);
    expect(profile.c).toBe(0);
  });

  it('handles partial answers', () => {
    // Answer only the first 4 questions (D vs I)
    const answers: Record<string, 'a' | 'b'> = {
      q01: 'a', // D
      q02: 'a', // D
      q03: 'b', // I
      q04: 'b', // I
    };

    const profile = scoreAssessment(answers);
    // D and I should each get 2/12 raw, normalized proportionally
    // Other dimensions stay at 0
    expect(profile.d).toBeGreaterThan(0);
    expect(profile.i).toBeGreaterThan(0);
    // D and I should be equal (2 each)
    expect(profile.d).toBe(profile.i);
  });

  it('tie-breaks by DIMENSIONS array order (D > I > S > C)', () => {
    // When all scores are equal, sort is stable: insertion order preserved
    // DIMENSIONS = ['D', 'I', 'S', 'C'], so D wins ties
    const profile = scoreAssessment({});
    // All zero -- tie across all four
    expect(profile.primary).toBe('D');
    expect(profile.secondary).toBe('I');
  });

  it('correctly identifies secondary type', () => {
    // Favor D strongly, then I somewhat
    const answers: Record<string, 'a' | 'b'> = {};
    for (const q of questions) {
      if (q.optionA.dimension === 'D') answers[q.id] = 'a';
      else if (q.optionB.dimension === 'D') answers[q.id] = 'b';
      else if (q.optionA.dimension === 'I') answers[q.id] = 'a';
      else if (q.optionB.dimension === 'I') answers[q.id] = 'b';
      else answers[q.id] = 'a';
    }

    const profile = scoreAssessment(answers);
    expect(profile.primary).toBe('D');
    expect(profile.secondary).toBe('I');
  });

  it('uses all 24 questions', () => {
    expect(questions).toHaveLength(24);
  });

  it('has 6 pairings x 4 questions each', () => {
    const pairings: Record<string, number> = {};
    for (const q of questions) {
      const key = [q.optionA.dimension, q.optionB.dimension].sort().join('-');
      pairings[key] = (pairings[key] ?? 0) + 1;
    }
    const expected = ['C-D', 'C-I', 'C-S', 'D-I', 'D-S', 'I-S'];
    expect(Object.keys(pairings).sort()).toEqual(expected);
    for (const count of Object.values(pairings)) {
      expect(count).toBe(4);
    }
  });

  it('each dimension appears in exactly 12 questions', () => {
    const appearances: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 };
    for (const q of questions) {
      appearances[q.optionA.dimension]++;
      appearances[q.optionB.dimension]++;
    }
    for (const count of Object.values(appearances)) {
      expect(count).toBe(12);
    }
  });

  it('all weights are positive', () => {
    for (const q of questions) {
      expect(q.optionA.weight).toBeGreaterThan(0);
      expect(q.optionB.weight).toBeGreaterThan(0);
    }
  });

  it('all question IDs are unique', () => {
    const ids = questions.map(q => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ignores unknown question IDs in answers', () => {
    const answers: Record<string, 'a' | 'b'> = { unknown_q: 'a' };
    const profile = scoreAssessment(answers);
    // Should not throw, all scores zero
    expect(profile.d).toBe(0);
  });
});
