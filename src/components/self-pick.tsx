import type { DiscType } from '../engine/types.ts';
import { DISC_LABELS } from '../engine/types.ts';

const OPTIONS: { type: DiscType; line: string }[] = [
  { type: 'D', line: 'I get to the point and decide fast.' },
  { type: 'I', line: 'I think out loud and like to bring people along.' },
  { type: 'S', line: 'I listen first and keep things calm.' },
  { type: 'C', line: 'I want the facts straight before I commit.' },
];

interface SelfPickProps {
  onPick: (type: DiscType) => void;
}

export function SelfPick({ onPick }: SelfPickProps) {
  return (
    <section class="self-pick" aria-labelledby="self-pick-title">
      <h2 id="self-pick-title">Which is closer to you?</h2>
      <p class="self-pick-hint">
        Pick the one that fits most days. The advice changes with how you talk, not just how they do.
      </p>
      <div class="self-pick-options">
        {OPTIONS.map(o => (
          <button
            key={o.type}
            class="assessment-option self-pick-option"
            type="button"
            onClick={() => onPick(o.type)}
          >
            <span class="self-pick-name">{DISC_LABELS[o.type]}</span>
            <span class="self-pick-line">{o.line}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
