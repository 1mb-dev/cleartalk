import { describe, it, expect } from 'vitest';
import feedback from '../data/coaching-cards/feedback.ts';
import request from '../data/coaching-cards/request.ts';
import conflict from '../data/coaching-cards/conflict.ts';
import pitch from '../data/coaching-cards/pitch.ts';
import difficultNews from '../data/coaching-cards/difficult-news.ts';
import type { CoachingCard } from '../engine/types.ts';
import { typeset, typesetCard } from './typeset.ts';

const cards: CoachingCard[] = [...feedback, ...request, ...conflict, ...pitch, ...difficultNews];

function strings(c: CoachingCard): string[] {
  const out = [c.approach, c.theirReaction, c.ifGoesWrong, c.bodyLanguage, ...c.avoid];
  if (c.onCall) out.push(c.onCall);
  for (const o of c.openWith) out.push(...(typeof o === 'string' ? [o] : [o.line, o.onlyIf]));
  return out;
}

describe('typeset', () => {
  it('curls apostrophes and pairs double quotes', () => {
    expect(typeset(`If they rush to "sorry, I'll fix it," say "Let's stop."`))
      .toBe('If they rush to “sorry, I’ll fix it,” say “Let’s stop.”');
  });

  it('leaves text without quotes alone', () => {
    expect(typeset('Taking a nod as agreement.')).toBe('Taking a nod as agreement.');
  });

  it('typesets every text field of a card and keeps the rest', () => {
    const card = typesetCard({
      yourType: 'D', theirType: 'S', situation: 'feedback',
      approach: "don't", openWith: ["I'm", { line: "it's", onlyIf: "it's true" }], avoid: ['"x"'],
      theirReaction: "won't", ifGoesWrong: "can't", bodyLanguage: "isn't", onCall: "doesn't",
    });
    expect(JSON.stringify(card)).not.toMatch(/'|\\"/);
    expect(card.situation).toBe('feedback');
  });
});

// The rules typeset relies on. A card that breaks one would get a wrong-way quote on screen.
describe('card text quoting', () => {
  const all = cards.flatMap(strings);

  it('pairs every double quote', () => {
    expect(all.filter(t => (t.match(/"/g) ?? []).length % 2 !== 0)).toEqual([]);
  });

  it('never opens a quote with a single quote', () => {
    expect(all.filter(t => /(^|[\s(["])'/.test(t))).toEqual([]);
  });
});
