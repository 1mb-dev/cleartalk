import type { DiscType, JournalEntry, Contact } from './types.ts';
import { DISC_LABELS } from './types.ts';

export interface TypePairStats {
  theirType: DiscType;
  count: number;
  average: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface InsightsSummary {
  totalEntries: number;
  overallAverage: number;
  byType: TypePairStats[];
  frictionType: DiscType | null;
  strongestType: DiscType | null;
  tips: string[];
}

/**
 * Calculate adaptation insights from journal entries.
 * Requires at least 5 entries to produce meaningful patterns.
 */
export function calculateInsights(
  entries: JournalEntry[],
  contacts: Contact[],
): InsightsSummary | null {
  if (entries.length < 5) return null;

  const contactMap = new Map(contacts.map(c => [c.id, c]));

  // Group entries by their-type
  const byType = new Map<DiscType, number[]>();
  for (const entry of entries) {
    const contact = contactMap.get(entry.contactId);
    if (!contact) continue;
    const type = contact.discProfile.primary;
    const existing = byType.get(type) ?? [];
    existing.push(entry.outcome);
    byType.set(type, existing);
  }

  // Calculate stats per type
  const stats: TypePairStats[] = [];
  let totalSum = 0;
  let totalCount = 0;

  for (const type of ['D', 'I', 'S', 'C'] as DiscType[]) {
    const outcomes = byType.get(type);
    if (!outcomes || outcomes.length === 0) continue;

    const avg = outcomes.reduce((a, b) => a + b, 0) / outcomes.length;
    const trend = calculateTrend(outcomes);

    stats.push({
      theirType: type,
      count: outcomes.length,
      average: Math.round(avg * 10) / 10,
      trend,
    });

    totalSum += outcomes.reduce((a, b) => a + b, 0);
    totalCount += outcomes.length;
  }

  // Sort by count descending
  stats.sort((a, b) => b.count - a.count);

  const overallAverage = totalCount > 0
    ? Math.round((totalSum / totalCount) * 10) / 10
    : 0;

  // Find friction (lowest avg with 2+ entries) and strongest (highest avg with 2+ entries)
  const qualified = stats.filter(s => s.count >= 2);
  const friction = qualified.length > 0
    ? qualified.reduce((min, s) => s.average < min.average ? s : min)
    : null;
  const strongest = qualified.length > 0
    ? qualified.reduce((max, s) => s.average > max.average ? s : max)
    : null;

  const frictionType = friction && friction.average < 3.5 ? friction.theirType : null;
  const strongestType = strongest && strongest.average >= 3.5 ? strongest.theirType : null;

  // Generate tips
  const tips = generateTips(stats, frictionType, strongestType, entries.length);

  return {
    totalEntries: entries.length,
    overallAverage,
    byType: stats,
    frictionType,
    strongestType,
    tips,
  };
}

function calculateTrend(outcomes: number[]): 'improving' | 'stable' | 'declining' {
  if (outcomes.length < 4) return 'stable';

  // Compare last half to first half
  const mid = Math.floor(outcomes.length / 2);
  const firstHalf = outcomes.slice(0, mid);
  const secondHalf = outcomes.slice(mid);

  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const delta = secondAvg - firstAvg;

  if (delta > 0.4) return 'improving';
  if (delta < -0.4) return 'declining';
  return 'stable';
}

function generateTips(
  stats: TypePairStats[],
  frictionType: DiscType | null,
  strongestType: DiscType | null,
  totalEntries: number,
): string[] {
  const tips: string[] = [];

  if (frictionType) {
    tips.push(
      `Your ${DISC_LABELS[frictionType]} conversations are running rough. ` +
      `Before your next one, review the coaching card -- even a small adjustment lands.`
    );
  }

  if (strongestType && strongestType !== frictionType) {
    tips.push(
      `${DISC_LABELS[strongestType]} interactions are going well. ` +
      `Notice what you are doing differently there -- it might transfer.`
    );
  }

  const improving = stats.find(s => s.trend === 'improving');
  if (improving) {
    tips.push(
      `Your ${DISC_LABELS[improving.theirType]} conversations are trending up. Keep it going.`
    );
  }

  const declining = stats.find(s => s.trend === 'declining');
  if (declining) {
    tips.push(
      `${DISC_LABELS[declining.theirType]} interactions have dipped recently. ` +
      `Worth checking in with yourself -- has something changed?`
    );
  }

  // Gap detection
  const coveredTypes = new Set(stats.map(s => s.theirType));
  const missing = (['D', 'I', 'S', 'C'] as DiscType[]).filter(t => !coveredTypes.has(t));
  if (missing.length > 0 && missing.length < 4) {
    tips.push(
      `You have not logged any ${missing.map(t => DISC_LABELS[t]).join(' or ')} interactions yet. ` +
      `Who in your life fits that style?`
    );
  }

  if (totalEntries >= 10 && tips.length === 0) {
    tips.push('Your conversations are consistently solid across types. Well done.');
  }

  return tips.slice(0, 3);
}
