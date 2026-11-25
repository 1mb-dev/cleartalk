import { describe, it, expect } from 'vitest';
import { isSituation, SITUATION_LABELS } from './types.ts';

describe('isSituation', () => {
  it('accepts every situation', () => {
    for (const s of Object.keys(SITUATION_LABELS)) expect(isSituation(s)).toBe(true);
  });

  it('rejects inherited object keys', () => {
    expect(isSituation('constructor')).toBe(false);
    expect(isSituation('toString')).toBe(false);
    expect(isSituation('__proto__')).toBe(false);
  });

  it('rejects empty, unknown and undefined', () => {
    expect(isSituation('')).toBe(false);
    expect(isSituation('small-talk')).toBe(false);
    expect(isSituation(undefined)).toBe(false);
  });
});
