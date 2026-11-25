import type { CoachingCard, Opener } from '../engine/types.ts';

/**
 * Typographic quotes. Every ' becomes an apostrophe and " alternates open and close within the
 * string, which holds only while no card text opens a quote with ' and every " has its pair
 * (typeset.test.ts checks both over all cards).
 */
export function typeset(s: string): string {
  let open = false;
  return s.replace(/'/g, '’').replace(/"/g, () => ((open = !open) ? '“' : '”'));
}

function typesetOpener(o: Opener): Opener {
  return typeof o === 'string' ? typeset(o) : { line: typeset(o.line), onlyIf: typeset(o.onlyIf) };
}

/** The card's reader-facing text with typographic quotes; the data keeps plain ones. */
export function typesetCard(card: CoachingCard): CoachingCard {
  return {
    ...card,
    approach: typeset(card.approach),
    openWith: card.openWith.map(typesetOpener),
    avoid: card.avoid.map(typeset),
    theirReaction: typeset(card.theirReaction),
    ifGoesWrong: typeset(card.ifGoesWrong),
    bodyLanguage: typeset(card.bodyLanguage),
    onCall: card.onCall === undefined ? undefined : typeset(card.onCall),
  };
}
