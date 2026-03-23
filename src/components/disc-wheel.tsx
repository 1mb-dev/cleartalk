import type { DiscProfile, DiscType } from '../engine/types.ts';
import { DISC_LABELS } from '../engine/types.ts';

interface DiscWheelProps {
  profile: DiscProfile;
  size?: number;
}

const QUADRANTS: { type: DiscType; cx: number; cy: number; labelX: number; labelY: number }[] = [
  { type: 'D', cx: 30, cy: 30, labelX: 18, labelY: 22 },
  { type: 'I', cx: 70, cy: 30, labelX: 72, labelY: 22 },
  { type: 'S', cx: 70, cy: 70, labelX: 72, labelY: 82 },
  { type: 'C', cx: 30, cy: 70, labelX: 18, labelY: 82 },
];

const COLOR_VARS: Record<DiscType, string> = {
  D: 'var(--color-disc-d)',
  I: 'var(--color-disc-i)',
  S: 'var(--color-disc-s)',
  C: 'var(--color-disc-c)',
};

const SUBTLE_VARS: Record<DiscType, string> = {
  D: 'var(--color-disc-d-subtle)',
  I: 'var(--color-disc-i-subtle)',
  S: 'var(--color-disc-s-subtle)',
  C: 'var(--color-disc-c-subtle)',
};

function scoreForType(profile: DiscProfile, type: DiscType): number {
  const map: Record<DiscType, number> = { D: profile.d, I: profile.i, S: profile.s, C: profile.c };
  return map[type];
}

/**
 * DISC wheel visualization.
 * Four quadrants with the user's scores shown as filled circles.
 * Larger circle = higher score for that dimension.
 */
export function DiscWheel({ profile, size = 200 }: DiscWheelProps) {
  const summary = `${DISC_LABELS[profile.primary]} (${scoreForType(profile, profile.primary)}%), ` +
    `${DISC_LABELS[profile.secondary]} (${scoreForType(profile, profile.secondary)}%)`;

  return (
    <div class="disc-wheel-container">
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        role="img"
        aria-label={`Your communication style: primarily ${DISC_LABELS[profile.primary]}, secondarily ${DISC_LABELS[profile.secondary]}`}
      >
        <title>DISC Communication Style Profile</title>
        <desc>{summary}</desc>

        {/* Grid lines */}
        <line x1="50" y1="8" x2="50" y2="92" stroke="var(--color-border)" stroke-width="0.5" />
        <line x1="8" y1="50" x2="92" y2="50" stroke="var(--color-border)" stroke-width="0.5" />

        {/* Quadrant backgrounds */}
        {QUADRANTS.map(q => {
          const score = scoreForType(profile, q.type);
          const radius = 4 + (score / 100) * 18;
          return (
            <g key={q.type}>
              <circle cx={q.cx} cy={q.cy} r="22" fill={SUBTLE_VARS[q.type]} />
              <circle cx={q.cx} cy={q.cy} r={radius} fill={COLOR_VARS[q.type]} opacity="0.85" />
              <text
                x={q.labelX}
                y={q.labelY}
                text-anchor={q.cx < 50 ? 'start' : 'end'}
                font-size="5.5"
                font-weight="600"
                fill={COLOR_VARS[q.type]}
              >
                {DISC_LABELS[q.type]}
              </text>
              {score >= 15 && (
                <text
                  x={q.cx}
                  y={q.cy + 2}
                  text-anchor="middle"
                  font-size="7"
                  font-weight="700"
                  fill="var(--color-bg)"
                >
                  {score}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p class="disc-wheel-summary">
        Primarily <strong>{DISC_LABELS[profile.primary]}</strong>,
        with <strong>{DISC_LABELS[profile.secondary]}</strong> secondary
      </p>
    </div>
  );
}
