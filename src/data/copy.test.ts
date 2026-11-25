import { describe, it, expect } from 'vitest';
import feedback from './coaching-cards/feedback.ts';
import request from './coaching-cards/request.ts';
import conflict from './coaching-cards/conflict.ts';
import pitch from './coaching-cards/pitch.ts';
import difficultNews from './coaching-cards/difficult-news.ts';
import { openerLine, type CoachingCard } from '../engine/types.ts';

const cards: CoachingCard[] = [...feedback, ...request, ...conflict, ...pitch, ...difficultNews];

function texts(c: CoachingCard): string[] {
  const out = [c.approach, c.theirReaction, c.ifGoesWrong, c.bodyLanguage, ...c.avoid, ...c.openWith.map(openerLine)];
  for (const o of c.openWith) if (typeof o !== 'string') out.push(o.onlyIf);
  if (c.onCall) out.push(c.onCall);
  return out;
}

// Mechanical copy rules every card must keep. Each entry is a shape that crept into the
// original cards; "Is" is excluded from the letter labels because it is an ordinary word.
const BANNED: [string, RegExp][] = [
  ['letter label', /\b(?:[DSC]s|[DISC][ -]types?|[DISC] (?:styles?|people|person))\b/],
  ['"type" as a label for a person', /\b(?:Drive|Influence|Steady|Clarity) types?\b/i],
  ['"dominant"', /\bdominant\b/i],
  ['"Let us"', /\bLet us\b/],
  ['double hyphen or em dash', /--|—/],
  ['percentage', /\d\s?%/],
  ['X/Y/Z placeholder', /\b[XYZ]\b/],
];

describe('coaching card copy', () => {
  it('covers all 80 cards', () => {
    expect(cards).toHaveLength(80);
  });

  for (const [name, re] of BANNED) {
    it(`has no ${name}`, () => {
      const hits = cards.flatMap(c => texts(c)
        .filter(t => re.test(t))
        .map(t => `${c.situation} ${c.yourType}->${c.theirType}: ${t.slice(0, 80)}`));
      expect(hits).toEqual([]);
    });
  }

  it('gives every card a video-call line that does not repeat its own label', () => {
    const bad = cards.filter(c => !c.onCall || /^on (?:a call|video)/i.test(c.onCall));
    expect(bad.map(c => `${c.situation} ${c.yourType}->${c.theirType}`)).toEqual([]);
  });
});
