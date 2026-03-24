import { useState, useEffect } from 'preact/hooks';
import { useParams, useLocation } from 'wouter';
import { getCoachingCard } from '../engine/coaching.ts';
import { DISC_LABELS, SITUATION_LABELS } from '../engine/types.ts';
import type { CoachingCard, DiscType, SituationType } from '../engine/types.ts';
import { navigate } from '../lib/transitions.ts';

type InsightParams = { pair: string; situation: string };

const VALID_TYPES = new Set(['d', 'i', 's', 'c']);

function parsePair(pair: string): { yourType: DiscType; theirType: DiscType } | null {
  const match = pair.match(/^([disc])-to-([disc])$/i);
  if (!match) return null;
  const y = match[1].toUpperCase();
  const t = match[2].toUpperCase();
  if (!VALID_TYPES.has(y.toLowerCase()) || !VALID_TYPES.has(t.toLowerCase())) return null;
  return { yourType: y as DiscType, theirType: t as DiscType };
}

export function Insight() {
  const { pair, situation } = useParams<InsightParams>();
  const [, setLocation] = useLocation();
  const [card, setCard] = useState<CoachingCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadCard();
  }, [pair, situation]);

  async function loadCard() {
    setLoading(true);
    setError(false);

    const parsed = parsePair(pair ?? '');
    if (!parsed || !situation || !(situation in SITUATION_LABELS)) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const loaded = await getCoachingCard(
        parsed.yourType,
        parsed.theirType,
        situation as SituationType,
      );
      setCard(loaded);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <main id="main" class="route-shell insight-page"><p class="loading-text" aria-live="polite">Loading...</p></main>;
  }

  if (error || !card) {
    return (
      <main id="main" class="route-shell insight-page">
        <h1>Insight not found</h1>
        <p class="welcome-text">This coaching card doesn't exist.</p>
        <button class="btn-primary" type="button" onClick={() => navigate(() => setLocation('/'))}>
          Try ClearTalk
        </button>
      </main>
    );
  }

  return (
    <main id="main" class="route-shell insight-page">
      <div class="insight-header">
        <h1>How to {SITUATION_LABELS[card.situation].toLowerCase()} with a {DISC_LABELS[card.theirType]} communicator</h1>
        <div class="coaching-card-header">
          <span class={`type-badge disc-${card.yourType.toLowerCase()}`}>
            {DISC_LABELS[card.yourType]}
          </span>
          <span class="coaching-arrow" aria-hidden="true">{'\u2192'}</span>
          <span class={`type-badge disc-${card.theirType.toLowerCase()}`}>
            {DISC_LABELS[card.theirType]}
          </span>
        </div>
      </div>

      <div class="coaching-section">
        <h4 class="coaching-section-title">Approach</h4>
        <p class="coaching-section-body">{card.approach}</p>
      </div>

      <div class="coaching-section">
        <h4 class="coaching-section-title">Open with</h4>
        <ul class="coaching-phrases">
          <li>{card.openWith[0]}</li>
        </ul>
      </div>

      <div class="coaching-section coaching-warning">
        <h4 class="coaching-section-title">Avoid</h4>
        <ul class="coaching-phrases">
          <li>{card.avoid[0]}</li>
        </ul>
      </div>

      <div class="insight-cta">
        <p class="insight-cta-text">
          Get personalized advice for your communication style.
        </p>
        <button class="btn-primary" type="button" onClick={() => navigate(() => setLocation('/'))}>
          Try ClearTalk -- free, no sign-up
        </button>
      </div>
    </main>
  );
}
