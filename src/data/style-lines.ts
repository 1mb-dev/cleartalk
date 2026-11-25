import type { DiscType } from '../engine/types.ts';

/** One plain line per style: first person where readers pick their own, third person where a page describes someone. */
export const STYLE_LINES: Record<DiscType, { self: string; other: string }> = {
  D: { self: 'I get to the point and decide fast.', other: 'gets to the point and decides fast' },
  I: { self: 'I think out loud and like to bring people along.', other: 'thinks out loud and likes to bring people along' },
  S: { self: 'I listen first and keep things calm.', other: 'listens first and keeps things calm' },
  C: { self: 'I want the facts straight before I commit.', other: 'wants the facts straight before committing' },
};
