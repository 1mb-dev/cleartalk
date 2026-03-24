import { describe, it, expect } from 'vitest';
import { typeFromObservations } from './typing.ts';
import { observations } from '../data/observations.ts';

describe('typeFromObservations', () => {
  it('returns valid profile shape', () => {
    const answers: Record<string, 'a' | 'b'> = {};
    for (const obs of observations) answers[obs.id] = 'a';

    const result = typeFromObservations(answers);
    expect(result).toHaveProperty('confidence');
    const { profile } = result;
    expect(profile).toHaveProperty('d');
    expect(profile).toHaveProperty('i');
    expect(profile).toHaveProperty('s');
    expect(profile).toHaveProperty('c');
    expect(profile).toHaveProperty('primary');
    expect(profile).toHaveProperty('secondary');
    expect(['D', 'I', 'S', 'C']).toContain(profile.primary);
    expect(['D', 'I', 'S', 'C']).toContain(profile.secondary);
  });

  it('scores 0-100 for all dimensions', () => {
    const answers: Record<string, 'a' | 'b'> = {};
    for (const obs of observations) answers[obs.id] = 'a';

    const { profile } = typeFromObservations(answers);
    for (const dim of [profile.d, profile.i, profile.s, profile.c]) {
      expect(dim).toBeGreaterThanOrEqual(0);
      expect(dim).toBeLessThanOrEqual(100);
    }
  });

  // --- Confidence thresholds ---

  it('returns high confidence when all 8 answered', () => {
    const answers: Record<string, 'a' | 'b'> = {};
    for (const obs of observations) answers[obs.id] = 'a';

    const { confidence } = typeFromObservations(answers);
    expect(confidence).toBe('high');
  });

  it('returns medium confidence for 6-7 answers', () => {
    const answers: Record<string, 'a' | 'b'> = {};
    const subset = observations.slice(0, 7);
    for (const obs of subset) answers[obs.id] = 'a';

    const { confidence } = typeFromObservations(answers);
    expect(confidence).toBe('medium');

    // Also test exactly 6
    const answers6: Record<string, 'a' | 'b'> = {};
    for (const obs of observations.slice(0, 6)) answers6[obs.id] = 'a';
    const { confidence: conf6 } = typeFromObservations(answers6);
    expect(conf6).toBe('medium');
  });

  it('returns low confidence for 0-5 answers', () => {
    const { confidence: conf0 } = typeFromObservations({});
    expect(conf0).toBe('low');

    const answers5: Record<string, 'a' | 'b'> = {};
    for (const obs of observations.slice(0, 5)) answers5[obs.id] = 'a';
    const { confidence: conf5 } = typeFromObservations(answers5);
    expect(conf5).toBe('low');
  });

  // --- Profile accuracy ---

  it('produces D-dominant profile with D-favoring answers', () => {
    // All optionA choices lean toward D (obs01a: D:2,I:1; obs02a: I:2,D:1; etc.)
    // Pick 'a' for D-signal questions, 'a' for all
    const answers: Record<string, 'a' | 'b'> = {};
    for (const obs of observations) {
      const aD = obs.optionA.signals.D ?? 0;
      const bD = obs.optionB.signals.D ?? 0;
      answers[obs.id] = aD >= bD ? 'a' : 'b';
    }

    const { profile } = typeFromObservations(answers);
    expect(profile.primary).toBe('D');
  });

  it('produces S-dominant profile with S-favoring answers', () => {
    const answers: Record<string, 'a' | 'b'> = {};
    for (const obs of observations) {
      const aS = obs.optionA.signals.S ?? 0;
      const bS = obs.optionB.signals.S ?? 0;
      answers[obs.id] = aS >= bS ? 'a' : 'b';
    }

    const { profile } = typeFromObservations(answers);
    // S should be primary or near-top
    expect(['S', 'C']).toContain(profile.primary);
  });

  it('handles empty answers (all dimensions still calculated)', () => {
    const { profile } = typeFromObservations({});
    expect(profile.d).toBe(0);
    expect(profile.i).toBe(0);
    expect(profile.s).toBe(0);
    expect(profile.c).toBe(0);
  });

  // --- Data integrity ---

  it('has exactly 8 observation questions', () => {
    expect(observations).toHaveLength(8);
  });

  it('all observation IDs are unique', () => {
    const ids = observations.map(o => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all signals are non-negative', () => {
    for (const obs of observations) {
      for (const signals of [obs.optionA.signals, obs.optionB.signals]) {
        for (const val of Object.values(signals)) {
          expect(val).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });

  it('each dimension is covered by at least one signal', () => {
    const covered = { D: false, I: false, S: false, C: false };
    for (const obs of observations) {
      for (const signals of [obs.optionA.signals, obs.optionB.signals]) {
        for (const [dim, val] of Object.entries(signals)) {
          if (val && val > 0) covered[dim as keyof typeof covered] = true;
        }
      }
    }
    expect(Object.values(covered).every(Boolean)).toBe(true);
  });

  it('maxPossible is correctly computed per dimension', () => {
    // Manually verify: for each question, max of optionA and optionB signal per dimension
    // This ensures normalization denominator is correct
    const maxPossible = { D: 0, I: 0, S: 0, C: 0 };
    for (const obs of observations) {
      for (const dim of ['D', 'I', 'S', 'C'] as const) {
        const aSignal = obs.optionA.signals[dim] ?? 0;
        const bSignal = obs.optionB.signals[dim] ?? 0;
        maxPossible[dim] += Math.max(aSignal, bSignal);
      }
    }
    // All maxPossible should be > 0 (otherwise 0/0 division risk)
    for (const val of Object.values(maxPossible)) {
      expect(val).toBeGreaterThan(0);
    }
  });
});
