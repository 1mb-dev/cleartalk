import type { DiscType } from '../engine/types.ts';

/**
 * Parse a type-pair string from insight URLs (e.g., "d-to-i").
 * Returns null for invalid input.
 */
export function parsePair(pair: string): { yourType: DiscType; theirType: DiscType } | null {
  const match = pair.match(/^([disc])-to-([disc])$/i);
  if (!match) return null;
  return {
    yourType: match[1].toUpperCase() as DiscType,
    theirType: match[2].toUpperCase() as DiscType,
  };
}
