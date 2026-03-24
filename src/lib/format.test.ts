import { describe, it, expect, vi, afterEach } from 'vitest';
import { formatRelativeDate } from './format.ts';

describe('formatRelativeDate', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "Today" for timestamps within the same day', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-24T15:00:00'));
    expect(formatRelativeDate(new Date('2026-03-24T08:00:00').getTime())).toBe('Today');
  });

  it('returns "Yesterday" for timestamps from one day ago', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-24T15:00:00'));
    const yesterday = new Date('2026-03-23T10:00:00').getTime();
    expect(formatRelativeDate(yesterday)).toBe('Yesterday');
  });

  it('returns "Xd ago" for 2-6 days ago', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-24T12:00:00'));

    const threeDaysAgo = new Date('2026-03-21T12:00:00').getTime();
    expect(formatRelativeDate(threeDaysAgo)).toBe('3d ago');

    const sixDaysAgo = new Date('2026-03-18T12:00:00').getTime();
    expect(formatRelativeDate(sixDaysAgo)).toBe('6d ago');
  });

  it('returns formatted date for 7+ days ago', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-24T12:00:00'));

    const twoWeeksAgo = new Date('2026-03-10T12:00:00').getTime();
    const result = formatRelativeDate(twoWeeksAgo);
    expect(result).toMatch(/Mar\s+10/);
  });

  it('handles timestamps from a different month', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-24T12:00:00'));

    const lastMonth = new Date('2026-02-15T12:00:00').getTime();
    const result = formatRelativeDate(lastMonth);
    expect(result).toMatch(/Feb\s+15/);
  });

  it('handles current timestamp (0ms ago)', () => {
    vi.useFakeTimers();
    const now = new Date('2026-03-24T12:00:00');
    vi.setSystemTime(now);
    expect(formatRelativeDate(now.getTime())).toBe('Today');
  });
});
