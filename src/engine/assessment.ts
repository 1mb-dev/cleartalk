import type { DiscProfile, DiscType } from './types.ts';
import { questions } from '../data/questions.ts';

const DIMENSIONS: DiscType[] = ['D', 'I', 'S', 'C'];

/**
 * Score an assessment from user answers.
 *
 * Each question touches two dimensions. Picking an option adds its weight
 * to that dimension. Raw scores range 0-12 per dimension (each dimension
 * appears in 12 questions as either optionA or optionB). Normalized to
 * 0-100 as percentage of maximum possible.
 */
export function scoreAssessment(answers: Record<string, 'a' | 'b'>): DiscProfile {
  const raw: Record<DiscType, number> = { D: 0, I: 0, S: 0, C: 0 };
  const max: Record<DiscType, number> = { D: 0, I: 0, S: 0, C: 0 };

  for (const q of questions) {
    max[q.optionA.dimension] += q.optionA.weight;
    max[q.optionB.dimension] += q.optionB.weight;

    const answer = answers[q.id];
    if (answer === 'a') {
      raw[q.optionA.dimension] += q.optionA.weight;
    } else if (answer === 'b') {
      raw[q.optionB.dimension] += q.optionB.weight;
    }
  }

  const scores = {} as Record<DiscType, number>;
  for (const dim of DIMENSIONS) {
    scores[dim] = max[dim] > 0 ? Math.round((raw[dim] / max[dim]) * 100) : 0;
  }

  const sorted = [...DIMENSIONS].sort((a, b) => scores[b] - scores[a]);

  return {
    d: scores.D,
    i: scores.I,
    s: scores.S,
    c: scores.C,
    primary: sorted[0],
    secondary: sorted[1],
  };
}
