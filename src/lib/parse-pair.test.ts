import { describe, it, expect } from 'vitest';
import { parsePair } from './parse-pair.ts';

describe('parsePair', () => {
  it('parses valid lowercase pair', () => {
    const result = parsePair('d-to-i');
    expect(result).toEqual({ yourType: 'D', theirType: 'I' });
  });

  it('parses valid uppercase pair', () => {
    const result = parsePair('S-to-C');
    expect(result).toEqual({ yourType: 'S', theirType: 'C' });
  });

  it('parses mixed case', () => {
    const result = parsePair('d-TO-s');
    expect(result).toEqual({ yourType: 'D', theirType: 'S' });
  });

  it('parses same-type pairs', () => {
    expect(parsePair('d-to-d')).toEqual({ yourType: 'D', theirType: 'D' });
    expect(parsePair('i-to-i')).toEqual({ yourType: 'I', theirType: 'I' });
  });

  it('returns null for invalid type characters', () => {
    expect(parsePair('x-to-d')).toBeNull();
    expect(parsePair('d-to-z')).toBeNull();
    expect(parsePair('a-to-b')).toBeNull();
  });

  it('returns null for wrong format', () => {
    expect(parsePair('dtoi')).toBeNull();
    expect(parsePair('d-i')).toBeNull();
    expect(parsePair('d--to--i')).toBeNull();
    expect(parsePair('d-to-')).toBeNull();
    expect(parsePair('-to-i')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parsePair('')).toBeNull();
  });

  it('returns null for multi-character type', () => {
    expect(parsePair('di-to-sc')).toBeNull();
  });

  it('covers all 16 valid combinations', () => {
    const types = ['d', 'i', 's', 'c'];
    for (const y of types) {
      for (const t of types) {
        const result = parsePair(`${y}-to-${t}`);
        expect(result).not.toBeNull();
        expect(result!.yourType).toBe(y.toUpperCase());
        expect(result!.theirType).toBe(t.toUpperCase());
      }
    }
  });
});
