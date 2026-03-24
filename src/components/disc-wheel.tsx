import type { DiscProfile, DiscType } from '../engine/types.ts';
import { DISC_LABELS } from '../engine/types.ts';

interface DiscWheelProps {
  profile: DiscProfile;
  size?: number;
}

// Wheel quadrants in center; labels on left (D, C) and right (I, S)
// ViewBox: -45..165 wide to fit labels; 0..120 tall for circles
const QUADRANTS: { type: DiscType; cx: number; cy: number; labelX: number; labelY: number; anchor: string }[] = [
  { type: 'D', cx: 38, cy: 38, labelX: 6, labelY: 40, anchor: 'end' },
  { type: 'I', cx: 82, cy: 38, labelX: 114, labelY: 40, anchor: 'start' },
  { type: 'S', cx: 82, cy: 82, labelX: 114, labelY: 84, anchor: 'start' },
  { type: 'C', cx: 38, cy: 82, labelX: 6, labelY: 84, anchor: 'end' },
];

const COLOR_VARS: Record<DiscType, string> = {
  D: 'var(--color-disc-d)',
  I: 'var(--color-disc-i)',
  S: 'var(--color-disc-s)',
  C: 'var(--color-disc-c)',
};

const TEXT_VARS: Record<DiscType, string> = {
  D: 'var(--color-disc-d-text)',
  I: 'var(--color-disc-i-text)',
  S: 'var(--color-disc-s-text)',
  C: 'var(--color-disc-c-text)',
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
 * Four quadrants with scores inside circles; type labels on left/right sides.
 */
export function DiscWheel({ profile, size = 360 }: DiscWheelProps) {
  const summary = `${DISC_LABELS[profile.primary]} (${scoreForType(profile, profile.primary)}%), ` +
    `${DISC_LABELS[profile.secondary]} (${scoreForType(profile, profile.secondary)}%)`;

  return (
    <div class="disc-wheel-container">
      <svg
        viewBox="-45 0 210 120"
        width={size}
        height={Math.round(size * 120 / 210)}
        role="img"
        aria-label={`Your communication style: primarily ${DISC_LABELS[profile.primary]}, secondarily ${DISC_LABELS[profile.secondary]}`}
      >
        <title>DISC Communication Style Profile</title>
        <desc>{summary}</desc>

        {/* Grid lines */}
        <line x1="60" y1="10" x2="60" y2="110" stroke="var(--color-border)" stroke-width="0.4" />
        <line x1="10" y1="60" x2="110" y2="60" stroke="var(--color-border)" stroke-width="0.4" />

        {QUADRANTS.map(q => {
          const score = scoreForType(profile, q.type);
          const radius = 5 + (score / 100) * 20;

          return (
            <g key={q.type}>
              <circle cx={q.cx} cy={q.cy} r="25" fill={SUBTLE_VARS[q.type]} />
              <circle cx={q.cx} cy={q.cy} r={radius} fill={COLOR_VARS[q.type]} opacity="0.85" />
              {/* Score number */}
              <text
                x={q.cx}
                y={q.cy + 3.5}
                text-anchor="middle"
                font-size="10"
                font-weight="700"
                font-family="var(--font-ui)"
                fill="var(--color-bg)"
              >
                {score}
              </text>
              {/* Type label on side */}
              <text
                x={q.labelX}
                y={q.labelY}
                text-anchor={q.anchor}
                font-size="8.5"
                font-weight="600"
                font-family="var(--font-ui)"
                fill={TEXT_VARS[q.type]}
              >
                {DISC_LABELS[q.type]}
              </text>
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
