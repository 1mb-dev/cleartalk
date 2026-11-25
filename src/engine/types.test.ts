import { describe, it, expect } from 'vitest';
import { isSituation, openerLine, resolveYourType, SITUATION_LABELS } from './types.ts';
import type { DiscProfile } from './types.ts';

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

describe('resolveYourType', () => {
  const profile: DiscProfile = { d: 20, i: 30, s: 80, c: 40, primary: 'S', secondary: 'C' };

  it('prefers the assessment over a pick', () => {
    expect(resolveYourType({ discProfile: profile, selfPick: 'D' })).toEqual({ type: 'S', source: 'assessment' });
  });

  it('uses the pick when there is no assessment', () => {
    expect(resolveYourType({ discProfile: null, selfPick: 'I' })).toEqual({ type: 'I', source: 'pick' });
  });

  it('returns null with neither, including records saved before picks existed', () => {
    expect(resolveYourType({ discProfile: null })).toBeNull();
    expect(resolveYourType({ discProfile: null, selfPick: null })).toBeNull();
  });
});

describe('openerLine', () => {
  it('returns a plain opener as is', () => {
    expect(openerLine("Can we talk about Tuesday?")).toBe("Can we talk about Tuesday?");
  });

  it('returns only the spoken line of a conditional opener', () => {
    expect(openerLine({ line: "Your role isn't changing.", onlyIf: "it's true" })).toBe("Your role isn't changing.");
  });
});
