import { useState } from 'preact/hooks';
import type { CoachingCard as CoachingCardType, DiscType } from '../engine/types.ts';
import { DISC_LABELS } from '../engine/types.ts';

interface CoachingCardProps {
  card: CoachingCardType;
  hasAssessment: boolean;
}

const TYPE_CLASS: Record<DiscType, string> = {
  D: 'disc-d',
  I: 'disc-i',
  S: 'disc-s',
  C: 'disc-c',
};

export function CoachingCardView({ card, hasAssessment }: CoachingCardProps) {
  return (
    <div class="coaching-card">
      <div class="coaching-card-header">
        <span class={`type-badge ${TYPE_CLASS[card.yourType]}`}>
          You ({DISC_LABELS[card.yourType]})
        </span>
        <span class="coaching-arrow" aria-hidden="true">{'\u2192'}</span>
        <span class={`type-badge ${TYPE_CLASS[card.theirType]}`}>
          Them ({DISC_LABELS[card.theirType]})
        </span>
      </div>

      <Section title="Approach" content={card.approach} />

      {hasAssessment ? (
        <PhraseList title="Open with" items={card.openWith} />
      ) : (
        <LockedSection
          title="Open with"
          hint="These openers are tailored to your style. A 3-minute assessment unlocks them."
        />
      )}

      {hasAssessment ? (
        <PhraseList title="Avoid" items={card.avoid} variant="warning" />
      ) : (
        <LockedSection
          title="Avoid"
          hint="Your specific pitfalls depend on how you communicate. The assessment reveals them."
        />
      )}

      <Section title="Expect this" content={card.theirReaction} />
      <Section title="If it goes sideways" content={card.ifGoesWrong} />
      <Section title="Body language" content={card.bodyLanguage} />

      <ShareButton card={card} />
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div class="coaching-section">
      <h4 class="coaching-section-title">{title}</h4>
      <p class="coaching-section-body">{content}</p>
    </div>
  );
}

function PhraseList({ title, items, variant }: { title: string; items: string[]; variant?: 'warning' }) {
  return (
    <div class={`coaching-section${variant === 'warning' ? ' coaching-warning' : ''}`}>
      <h4 class="coaching-section-title">{title}</h4>
      <ul class="coaching-phrases">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

function ShareButton({ card }: { card: CoachingCardType }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const url = `${window.location.origin}/insight/${card.yourType.toLowerCase()}-to-${card.theirType.toLowerCase()}/${card.situation}`;

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('failed');
      setTimeout(() => setStatus('idle'), 2000);
    }
  }

  const label =
    status === 'copied' ? 'Link copied!' :
    status === 'failed' ? 'Could not copy link' :
    'Share this insight';

  return (
    <button class="share-btn" type="button" onClick={handleShare}>
      <span aria-live="polite">{label}</span>
    </button>
  );
}

function LockedSection({ title, hint }: { title: string; hint: string }) {
  return (
    <div class="coaching-section coaching-locked">
      <h4 class="coaching-section-title">{title}</h4>
      <p class="coaching-locked-hint">{hint}</p>
    </div>
  );
}
