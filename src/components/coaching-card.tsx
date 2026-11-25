import { useState } from 'preact/hooks';
import type { CoachingCard as CoachingCardType, DiscType, JournalEntry, Opener } from '../engine/types.ts';
import { DISC_LABELS, SITUATION_LABELS } from '../engine/types.ts';
import { formatRelativeDate, midSentence } from '../lib/format.ts';
import { typesetCard } from '../lib/typeset.ts';

interface CoachingCardProps {
  card: CoachingCardType;
  /** Where the reader's own style came from; a pick is labelled so they can check it. */
  yourSource: 'assessment' | 'pick';
  onCheckStyle: () => void;
  /** The reader's most recent journal note about this person, if any. */
  lastNote?: JournalEntry | null;
}

const TYPE_CLASS: Record<DiscType, string> = {
  D: 'disc-d',
  I: 'disc-i',
  S: 'disc-s',
  C: 'disc-c',
};

export function CoachingCardView({ card: data, yourSource, onCheckStyle, lastNote }: CoachingCardProps) {
  const card = typesetCard(data);
  return (
    <div class="coaching-card">
      <div class="coaching-card-top">
        <div class="coaching-card-header">
          <span class={`type-badge ${TYPE_CLASS[card.yourType]}`}>
            You: {DISC_LABELS[card.yourType]}
          </span>
          <span class="coaching-arrow" aria-hidden="true">{'\u2192'}</span>
          <span class={`type-badge ${TYPE_CLASS[card.theirType]}`}>
            Them: {DISC_LABELS[card.theirType]}
          </span>
        </div>
        {yourSource === 'pick' && (
          <p class="coaching-pick-note">
            Based on the style you picked.{' '}
            <button class="link-btn" type="button" onClick={onCheckStyle}>Check it in 3 minutes</button>
          </p>
        )}
      </div>

      {lastNote && (
        <div class="coaching-section coaching-last-note">
          <h2 class="coaching-section-title">What you noted last time</h2>
          <p class="coaching-section-body">{lastNote.note}</p>
          <p class="coaching-last-note-meta">
            {SITUATION_LABELS[lastNote.situationType]}, {midSentence(formatRelativeDate(lastNote.loggedAt))}
          </p>
        </div>
      )}

      <Section title="Approach" content={card.approach} />
      <OpenerList items={card.openWith} />
      <PhraseList title="Avoid" items={card.avoid} variant="warning" />

      <div class="coaching-section">
        <h2 class="coaching-section-title">Expect this</h2>
        <p class="coaching-caption">People don’t always match their style. Go by what you see.</p>
        <p class="coaching-section-body">{card.theirReaction}</p>
      </div>
      <Section title="If it goes sideways" content={card.ifGoesWrong} />
      <div class="coaching-section">
        <h2 class="coaching-section-title">Body language</h2>
        <p class="coaching-section-body">{card.bodyLanguage}</p>
        {card.onCall && (
          <p class="coaching-section-body coaching-on-call">
            <span class="coaching-on-call-label">On a call</span> {card.onCall}
          </p>
        )}
      </div>

      <ShareButton card={card} />
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div class="coaching-section">
      <h2 class="coaching-section-title">{title}</h2>
      <p class="coaching-section-body">{content}</p>
    </div>
  );
}

function OpenerList({ items }: { items: Opener[] }) {
  return (
    <div class="coaching-section">
      <h2 class="coaching-section-title">Open with</h2>
      <ul class="coaching-phrases">
        {items.map((o, i) => typeof o === 'string' ? (
          <li key={i}>{o}</li>
        ) : (
          <li key={i} class="coaching-phrase-conditional">
            <span class="coaching-only-if">Only if {o.onlyIf}</span>
            <span class="coaching-line">{o.line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhraseList({ title, items, variant }: { title: string; items: string[]; variant?: 'warning' }) {
  return (
    <div class={`coaching-section${variant === 'warning' ? ' coaching-warning' : ''}`}>
      <h2 class="coaching-section-title">{title}</h2>
      <ul class="coaching-phrases">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

function ShareButton({ card }: { card: CoachingCardType }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const url = `${window.location.origin}/insight/${card.yourType.toLowerCase()}-to-${card.theirType.toLowerCase()}/${card.situation}/`;

  async function handleShare() {
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({
          title: `${SITUATION_LABELS[card.situation]}: ${DISC_LABELS[card.yourType]} to ${DISC_LABELS[card.theirType]}`,
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus('copied');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (e) {
      // User cancelled native share -- not an error
      if (e instanceof Error && e.name === 'AbortError') return;
      setStatus('failed');
      setTimeout(() => setStatus('idle'), 2000);
    }
  }

  const label =
    status === 'copied' ? 'Link copied' :
    status === 'failed' ? 'Could not copy link' :
    'Share this card';

  return (
    <button class="share-btn" type="button" onClick={handleShare}>
      <span aria-live="polite">{label}</span>
    </button>
  );
}
