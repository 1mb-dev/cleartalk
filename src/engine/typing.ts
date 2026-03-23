import type { DiscProfile, DiscType, Contact } from './types.ts';
import { observations } from '../data/observations.ts';

const DIMENSIONS: DiscType[] = ['D', 'I', 'S', 'C'];

/**
 * Estimate a person's DISC profile from behavioral observations.
 * Returns profile + confidence based on signal clarity.
 */
export function typeFromObservations(
  answers: Record<string, 'a' | 'b'>
): { profile: DiscProfile; confidence: Contact['confidence'] } {
  const raw: Record<DiscType, number> = { D: 0, I: 0, S: 0, C: 0 };
  const maxPossible: Record<DiscType, number> = { D: 0, I: 0, S: 0, C: 0 };
  let answeredCount = 0;

  for (const obs of observations) {
    // Track max possible for normalization
    for (const dim of DIMENSIONS) {
      const aSignal = obs.optionA.signals[dim] ?? 0;
      const bSignal = obs.optionB.signals[dim] ?? 0;
      maxPossible[dim] += Math.max(aSignal, bSignal);
    }

    const answer = answers[obs.id];
    if (!answer) continue;
    answeredCount++;

    const selected = answer === 'a' ? obs.optionA : obs.optionB;
    for (const dim of DIMENSIONS) {
      raw[dim] += selected.signals[dim] ?? 0;
    }
  }

  const scores = {} as Record<DiscType, number>;
  for (const dim of DIMENSIONS) {
    scores[dim] = maxPossible[dim] > 0
      ? Math.round((raw[dim] / maxPossible[dim]) * 100)
      : 0;
  }

  const sorted = [...DIMENSIONS].sort((a, b) => scores[b] - scores[a]);

  const confidence: Contact['confidence'] =
    answeredCount >= 8 ? 'high' :
    answeredCount >= 6 ? 'medium' : 'low';

  return {
    profile: {
      d: scores.D,
      i: scores.I,
      s: scores.S,
      c: scores.C,
      primary: sorted[0],
      secondary: sorted[1],
    },
    confidence,
  };
}
