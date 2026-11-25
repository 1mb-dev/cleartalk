import type { DiscType } from '../engine/types.ts';
import { DISC_LABELS } from '../engine/types.ts';
import { STYLE_LINES } from '../data/style-lines.ts';

const ORDER: DiscType[] = ['D', 'I', 'S', 'C'];

interface SelfPickProps {
  onPick: (type: DiscType) => void;
}

export function SelfPick({ onPick }: SelfPickProps) {
  return (
    <section class="self-pick" aria-labelledby="self-pick-title">
      <h2 id="self-pick-title">Which is closer to you?</h2>
      <p class="self-pick-hint">
        Pick the one that fits most days. The advice changes with how you talk as well as how they do.
      </p>
      <div class="self-pick-options">
        {ORDER.map(t => (
          <button
            key={t}
            class="assessment-option self-pick-option"
            type="button"
            onClick={() => onPick(t)}
          >
            <span class="self-pick-name">{DISC_LABELS[t]}</span>
            <span class="self-pick-line">{STYLE_LINES[t].self}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
