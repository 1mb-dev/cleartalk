import type { DiscType } from '../engine/types.ts';

const VALID_TYPES = new Set(['d', 'i', 's', 'c']);

/**
 * Parse a type-pair string from insight URLs (e.g., "d-to-i").
 * Returns null for invalid input.
 */
export function parsePair(pair: string): { yourType: DiscType; theirType: DiscType } | null {
  const match = pair.match(/^([disc])-to-([disc])$/i);
  if (!match) return null;
  const y = match[1].toUpperCase();
  const t = match[2].toUpperCase();
  if (!VALID_TYPES.has(y.toLowerCase()) || !VALID_TYPES.has(t.toLowerCase())) return null;
  return { yourType: y as DiscType, theirType: t as DiscType };
}
