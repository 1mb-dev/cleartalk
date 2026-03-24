import { useState, useEffect } from 'preact/hooks';
import { useParams, useLocation } from 'wouter';
import { QuickTag } from '../components/quick-tag.tsx';
import { CoachingCardView } from '../components/coaching-card.tsx';
import { getContacts, getContact, getOrCreateUser } from '../db/queries.ts';
import { getCoachingCard } from '../engine/coaching.ts';
import { DISC_LABELS, SITUATION_LABELS } from '../engine/types.ts';
import type { Contact, CoachingCard, SituationType, User } from '../engine/types.ts';
import { navigate } from '../lib/transitions.ts';
import { Logo } from '../components/logo.tsx';

function isValidSituation(s: string | undefined): s is SituationType {
  return !!s && s in SITUATION_LABELS;
}

type CoachParams = { contactId?: string; situation?: string };

export function Coach() {
  const params = useParams<CoachParams>();
  const [, setLocation] = useLocation();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [card, setCard] = useState<CoachingCard | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showQuickTag, setShowQuickTag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadState();
  }, [params.contactId, params.situation]);

  async function loadState() {
    setLoading(true);
    setError(false);
    try {
      const [u, allContacts] = await Promise.all([
        getOrCreateUser(),
        getContacts(),
      ]);
      setUser(u);
      setContacts(allContacts);

      if (params.contactId) {
        const contact = await getContact(params.contactId);
        setSelectedContact(contact ?? null);

        if (contact && isValidSituation(params.situation)) {
          const yourType = u.discProfile?.primary ?? contact.discProfile.primary;
          const loaded = await getCoachingCard(
            yourType,
            contact.discProfile.primary,
            params.situation,
          );
          setCard(loaded);
        } else {
          setCard(null);
        }
      } else {
        setSelectedContact(null);
        setCard(null);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleQuickTagComplete(result: { id: string }) {
    setShowQuickTag(false);
    navigate(() => setLocation(`/coach/${result.id}`));
  }

  function selectContact(id: string) {
    navigate(() => setLocation(`/coach/${id}`));
  }

  function selectSituation(situation: SituationType) {
    navigate(() => setLocation(`/coach/${params.contactId}/${situation}`));
  }

  function goBack() {
    if (params.situation) {
      navigate(() => setLocation(`/coach/${params.contactId}`));
    } else if (params.contactId) {
      navigate(() => setLocation('/'));
    }
  }

  if (showQuickTag) {
    return (
      <div class="route-shell">
        <QuickTag
          onComplete={handleQuickTagComplete}
          onCancel={() => setShowQuickTag(false)}
        />
      </div>
    );
  }

  if (loading) {
    return <div class="route-shell"><h1>Coach</h1><p class="loading-text" aria-live="polite">Loading...</p></div>;
  }

  if (error) {
    return (
      <div class="route-shell">
        <h1>Coach</h1>
        <div class="welcome-block">
          <p class="welcome-text">
            Could not load your data. If you are in private browsing mode,
            try a regular browser window instead.
          </p>
          <button class="btn-primary" type="button" onClick={() => loadState()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Show coaching card
  if (selectedContact && card && isValidSituation(params.situation)) {
    return (
      <div class="route-shell">
        <button class="back-link" type="button" onClick={goBack}>
          {'\u2190'} {selectedContact.name}
        </button>
        <h1>{SITUATION_LABELS[params.situation]}</h1>
        <CoachingCardView card={card} hasAssessment={!!user?.discProfile} />

        <div class="coach-log-bridge">
          <p class="coach-log-prompt">After the conversation:</p>
          <button
            class="btn-secondary"
            type="button"
            onClick={() => navigate(() => setLocation(`/log?contact=${params.contactId}&situation=${params.situation}`))}
          >
            Log how it went
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Pick situation
  if (selectedContact && params.contactId) {
    return (
      <div class="route-shell">
        <button class="back-link" type="button" onClick={goBack}>
          {'\u2190'} Back
        </button>
        <h1>
          Coaching for <span class={`inline-badge disc-${selectedContact.discProfile.primary.toLowerCase()}`}>
            {selectedContact.name}
          </span>
        </h1>
        <p class="coach-subtitle">
          {DISC_LABELS[selectedContact.discProfile.primary]} type
          {selectedContact.confidence !== 'high' && ` (${selectedContact.confidence} confidence)`}
        </p>
        <div class={`situation-grid disc-accent-${selectedContact.discProfile.primary.toLowerCase()}`}>
          {(Object.entries(SITUATION_LABELS) as [SituationType, string][]).map(([key, label]) => (
            <button
              key={key}
              class="situation-btn"
              type="button"
              onClick={() => selectSituation(key)}
            >
              <span class="situation-icon" aria-hidden="true">{situationIcon(key)}</span>
              <span class="situation-label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 1: Pick person (or first-time quick-tag)
  if (contacts.length === 0) {
    return (
      <div class="route-shell">
        <div class="welcome-block">
          <svg class="welcome-motif" viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
            <circle cx="46" cy="46" r="32" fill="var(--color-disc-d)" opacity="0.15" />
            <circle cx="74" cy="46" r="32" fill="var(--color-disc-i)" opacity="0.15" />
            <circle cx="74" cy="74" r="32" fill="var(--color-disc-s)" opacity="0.15" />
            <circle cx="46" cy="74" r="32" fill="var(--color-disc-c)" opacity="0.15" />
            <circle cx="46" cy="46" r="13" fill="var(--color-disc-d)" opacity="0.7" />
            <circle cx="74" cy="46" r="10" fill="var(--color-disc-i)" opacity="0.7" />
            <circle cx="74" cy="74" r="15" fill="var(--color-disc-s)" opacity="0.7" />
            <circle cx="46" cy="74" r="11" fill="var(--color-disc-c)" opacity="0.7" />
          </svg>
          <h1>Before your next conversation</h1>
          <p class="welcome-text">
            Pick a person. Pick the moment. Get clear on what to say
            and how to say it - for the way they actually hear it.
          </p>
          <button class="btn-primary" type="button" onClick={() => setShowQuickTag(true)}>
            Start with someone
          </button>
          <p class="welcome-hint">Takes about 60 seconds. No sign-up needed.</p>
        </div>
        <div class="onboard-features">
          <div class="onboard-feature">
            <span class="onboard-icon" aria-hidden="true">{'\u{1F4AC}'}</span>
            <p>Coaching cards tailored to how they communicate</p>
          </div>
          <div class="onboard-feature">
            <span class="onboard-icon" aria-hidden="true">{'\u{1F4A1}'}</span>
            <p>Phrases to open with and pitfalls to avoid</p>
          </div>
          <div class="onboard-feature">
            <span class="onboard-icon" aria-hidden="true">{'\u{1F4C8}'}</span>
            <p>Track your patterns and see what works</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="route-shell">
      <div class="brand-header">
        <Logo size={28} />
        <h1>Pick a conversation</h1>
      </div>
      <div class="contact-pick-grid">
        {contacts.map(c => (
          <button
            key={c.id}
            class="contact-pick-card"
            type="button"
            onClick={() => selectContact(c.id)}
          >
            <span class={`type-avatar disc-${c.discProfile.primary.toLowerCase()}`} aria-hidden="true">
              {c.discProfile.primary}
            </span>
            <span class="contact-pick-name">{c.name}</span>
            <span class="contact-pick-type">{DISC_LABELS[c.discProfile.primary]}</span>
          </button>
        ))}
        <button
          class="contact-pick-card contact-pick-add"
          type="button"
          onClick={() => setShowQuickTag(true)}
        >
          <span class="contact-pick-plus" aria-hidden="true">+</span>
          <span class="contact-pick-name">Someone new</span>
        </button>
      </div>

      {contacts.length <= 2 && (
        <div class="coach-nudge">
          <p>Tap a name, pick the situation, and get specific coaching for how they hear things.</p>
        </div>
      )}

      {!user?.discProfile && contacts.length > 0 && (
        <div class="coach-nudge">
          <p>
            Want advice tailored to your style too?{' '}
            <button class="link-btn" type="button" onClick={() => navigate(() => setLocation('/profile'))}>
              Take the 3-minute assessment
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

function situationIcon(situation: SituationType): string {
  const icons: Record<SituationType, string> = {
    feedback: '\u{1F4AC}',
    request: '\u{1F91D}',
    conflict: '\u{26A1}',
    pitch: '\u{1F4A1}',
    difficult_news: '\u{1F4E2}',
  };
  return icons[situation];
}
