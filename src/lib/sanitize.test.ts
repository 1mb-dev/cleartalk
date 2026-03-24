import { describe, it, expect } from 'vitest';
import { sanitizeName, sanitizeNote } from './sanitize.ts';

describe('sanitizeName', () => {
  it('trims whitespace', () => {
    expect(sanitizeName('  Alice  ')).toBe('Alice');
  });

  it('collapses multiple spaces', () => {
    expect(sanitizeName('Alice   Bob')).toBe('Alice Bob');
  });

  it('removes zero-width characters', () => {
    expect(sanitizeName('Ali\u200Bce')).toBe('Alice');
    expect(sanitizeName('\uFEFFBob')).toBe('Bob');
  });

  it('removes control characters', () => {
    expect(sanitizeName('Ali\u0000ce')).toBe('Alice');
    expect(sanitizeName('Bob\u001F')).toBe('Bob');
  });

  it('preserves normal unicode (accents, CJK, emoji)', () => {
    expect(sanitizeName('Rene')).toBe('Rene');
    expect(sanitizeName('Tanaka')).toBe('Tanaka');
  });

  it('returns empty string for all-control input', () => {
    expect(sanitizeName('\u200B\u200C\u200D')).toBe('');
  });

  it('handles empty string', () => {
    expect(sanitizeName('')).toBe('');
  });

  it('enforces max length of 60 characters', () => {
    const long = 'A'.repeat(100);
    expect(sanitizeName(long)).toHaveLength(60);
  });
});

describe('sanitizeNote', () => {
  it('trims whitespace', () => {
    expect(sanitizeNote('  hello  ')).toBe('hello');
  });

  it('removes control characters but preserves newlines', () => {
    expect(sanitizeNote('line1\nline2')).toBe('line1\nline2');
    expect(sanitizeNote('bad\u0000char')).toBe('badchar');
  });

  it('removes zero-width characters', () => {
    expect(sanitizeNote('test\u200Bnote')).toBe('testnote');
  });

  it('handles empty string', () => {
    expect(sanitizeNote('')).toBe('');
  });

  it('preserves tabs', () => {
    expect(sanitizeNote('col1\tcol2')).toBe('col1\tcol2');
  });

  it('enforces max length of 280 characters', () => {
    const long = 'A'.repeat(500);
    expect(sanitizeNote(long)).toHaveLength(280);
  });
});
