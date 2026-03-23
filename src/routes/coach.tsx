import { useState, useEffect } from 'preact/hooks';
import { useParams, useLocation } from 'wouter';
import { QuickTag } from '../components/quick-tag.tsx';
import { CoachingCardView } from '../components/coaching-card.tsx';
import { getContacts, getContact, getOrCreateUser } from '../db/queries.ts';
import { getCoachingCard } from '../engine/coaching.ts';
import { DISC_LABELS, SITUATION_LABELS } from '../engine/types.ts';
import type { Contact, CoachingCard, SituationType, User } from '../engine/types.ts';
import { navigate } from '../lib/transitions.ts';

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

  useEffect(() => {
    loadState();
  }, [params.contactId, params.situation]);

  async function loadState() {
    setLoading(true);
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
    setLoading(false);
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
    return <div class="route-shell"><p class="loading-text">Loading...</p></div>;
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
        <div class="situation-grid">
          {(Object.entries(SITUATION_LABELS) as [SituationType, string][]).map(([key, label]) => (
            <button
              key={key}
              class="situation-btn"
              type="button"
              onClick={() => selectSituation(key)}
            >
              <span class="situation-icon">{situationIcon(key)}</span>
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
          <h1>Before your next conversation</h1>
          <p class="welcome-text">
            Pick a person. Pick the moment. Get clear on what to say
            and how to say it -- for the way they actually hear it.
          </p>
          <button class="btn-primary" type="button" onClick={() => setShowQuickTag(true)}>
            Start with someone
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="route-shell">
      <h1>Who are you talking to?</h1>
      <div class="contact-pick-grid">
        {contacts.map(c => (
          <button
            key={c.id}
            class="contact-pick-card"
            type="button"
            onClick={() => selectContact(c.id)}
          >
            <span class={`type-dot disc-${c.discProfile.primary.toLowerCase()}`} aria-hidden="true" />
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
