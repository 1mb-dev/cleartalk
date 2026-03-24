import { describe, it, expect } from 'vitest';
import { getCoachingCard } from './coaching.ts';
import type { DiscType, SituationType } from './types.ts';

const TYPES: DiscType[] = ['D', 'I', 'S', 'C'];
const SITUATIONS: SituationType[] = ['feedback', 'request', 'conflict', 'pitch', 'difficult_news'];

describe('getCoachingCard', () => {
  it('returns a card for every type-pair and situation (80 total)', async () => {
    let count = 0;
    for (const situation of SITUATIONS) {
      for (const yourType of TYPES) {
        for (const theirType of TYPES) {
          const card = await getCoachingCard(yourType, theirType, situation);
          expect(card, `Missing: ${yourType}-${theirType} ${situation}`).not.toBeNull();
          expect(card!.yourType).toBe(yourType);
          expect(card!.theirType).toBe(theirType);
          expect(card!.situation).toBe(situation);
          count++;
        }
      }
    }
    expect(count).toBe(80);
  });

  it('every card has all required fields populated', async () => {
    for (const situation of SITUATIONS) {
      for (const yourType of TYPES) {
        for (const theirType of TYPES) {
          const card = await getCoachingCard(yourType, theirType, situation);
          expect(card!.approach.length, `Empty approach: ${yourType}-${theirType} ${situation}`).toBeGreaterThan(0);
          expect(card!.openWith.length, `Empty openWith: ${yourType}-${theirType} ${situation}`).toBeGreaterThan(0);
          expect(card!.avoid.length, `Empty avoid: ${yourType}-${theirType} ${situation}`).toBeGreaterThan(0);
          expect(card!.theirReaction.length, `Empty theirReaction: ${yourType}-${theirType} ${situation}`).toBeGreaterThan(0);
          expect(card!.ifGoesWrong.length, `Empty ifGoesWrong: ${yourType}-${theirType} ${situation}`).toBeGreaterThan(0);
          expect(card!.bodyLanguage.length, `Empty bodyLanguage: ${yourType}-${theirType} ${situation}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it('caches cards on second request (same reference)', async () => {
    const first = await getCoachingCard('D', 'I', 'feedback');
    const second = await getCoachingCard('D', 'I', 'feedback');
    expect(first).toBe(second); // same object reference = cache hit
  });

  it('returns a card for a valid type pair', async () => {
    const card = await getCoachingCard('D', 'I', 'feedback');
    expect(card).not.toBeNull();
  });
});
