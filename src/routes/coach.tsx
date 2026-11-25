import { useState, useEffect, useRef } from 'preact/hooks';
import { useParams, useLocation } from 'wouter';
import { QuickTag } from '../components/quick-tag.tsx';
import { CoachingCardView } from '../components/coaching-card.tsx';
import { getContacts, getContact, getJournalForContact, getOrCreateUser, setSelfPick } from '../db/queries.ts';
import { getCoachingCard } from '../engine/coaching.ts';
import { DISC_LABELS, SITUATION_LABELS, isSituation, resolveYourType } from '../engine/types.ts';
import type { Contact, CoachingCard, DiscType, JournalEntry, SituationType, User } from '../engine/types.ts';
import { SelfPick } from '../components/self-pick.tsx';
import { StyleLine } from '../components/style-line.tsx';
import { navigate } from '../lib/transitions.ts';
import { useDocumentTitle } from '../lib/use-document-title.ts';
import { Logo } from '../components/logo.tsx';
import { canInstall, isInstalled, wasDismissed, triggerInstall, dismissPrompt, onInstallAvailable } from '../lib/install-prompt.ts';

type CoachParams = { contactId?: string; situation?: string };

export function Coach() {
  const params = useParams<CoachParams>();
  const [, setLocation] = useLocation();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [card, setCard] = useState<CoachingCard | null>(null);
  const [lastNote, setLastNote] = useState<JournalEntry | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showQuickTag, setShowQuickTag] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadSeq = useRef(0);
  // The component is reused across coach routes, so the first render after a route change still
  // holds the previous route's data; it must not be shown until this route's load lands.
  const routeKey = `${params.contactId ?? ''}/${params.situation ?? ''}`;
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  // Keyed like loadedKey, so a failure on one route is not shown on the next.
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const error = errorKey === routeKey;
  const [installAvailable, setInstallAvailable] = useState(canInstall() && !isInstalled() && !wasDismissed());

  const pageTitle = selectedContact && isSituation(params.situation)
    ? `${SITUATION_LABELS[params.situation]} for ${selectedContact.name} - Cleartalk`
    : selectedContact
      ? `Coaching for ${selectedContact.name} - Cleartalk`
      : 'Coach - Cleartalk';
  useDocumentTitle(pageTitle);

  useEffect(() => {
    return onInstallAvailable((available) => {
      setInstallAvailable(available && !isInstalled() && !wasDismissed());
    });
  }, []);

  useEffect(() => {
    loadState();
  }, [params.contactId, params.situation]);

  async function loadState() {
    // Route changes and a style pick can start overlapping loads; only the latest may write state.
    const seq = ++loadSeq.current;
    setLoading(true);
    setErrorKey(null);
    try {
      const [u, allContacts] = await Promise.all([
        getOrCreateUser(),
        getContacts(),
      ]);
      const contact = params.contactId ? await getContact(params.contactId) : undefined;
      const you = resolveYourType(u);
      const loaded = contact && isSituation(params.situation) && you
        ? await getCoachingCard(you.type, contact.discProfile.primary, params.situation)
        : null;
      const recent = loaded && contact ? await getJournalForContact(contact.id, 20) : [];
      if (seq !== loadSeq.current) return;
      setUser(u);
      setContacts(allContacts);
      setSelectedContact(contact ?? null);
      setCard(loaded);
      setLastNote(recent.find(e => e.note.trim()) ?? null);
      setLoadedKey(routeKey);
    } catch {
      if (seq === loadSeq.current) setErrorKey(routeKey);
    } finally {
      if (seq === loadSeq.current) setLoading(false);
    }
  }

  async function handleSelfPick(type: DiscType) {
    // A route change during the write starts its own load, which already reads the pick; this
    // closure's loadState would load the old route over it.
    const seq = loadSeq.current;
    try {
      await setSelfPick(type);
      if (seq === loadSeq.current) await loadState();
    } catch {
      if (seq === loadSeq.current) setErrorKey(routeKey);
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

  if (loading || (loadedKey !== routeKey && !error)) {
    // A load that never settles (a hung chunk import or IndexedDB read) only a reload clears;
    // the hint appears after a CSS delay, keyed so the delay restarts on each route.
    return (
      <div key={routeKey} class="route-shell centered" aria-live="polite">
        <p class="loading-text">Loading...</p>
        <div class="loading-stuck">
          <p>This is taking longer than it should. Your data is safe - reload the page to try again.</p>
          <button class="btn-secondary" type="button" onClick={() => location.reload()}>Reload</button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div class="route-shell centered">
        <div class="welcome-block">
          <p class="welcome-text">
            Couldn't load your people. Your data is safe. If you're in a private
            window, try a regular one.
          </p>
          <button class="btn-primary" type="button" onClick={() => loadState()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  const you = user ? resolveYourType(user) : null;

  // Step 3a: Before the first card, ask which style is closer to the reader
  if (selectedContact && isSituation(params.situation) && user && !you) {
    return (
      <div class="route-shell">
        <button class="back-link" type="button" onClick={goBack}>
          <span aria-hidden="true">{'\u2190'}</span> {selectedContact.name}
        </button>
        <h1>{SITUATION_LABELS[params.situation]}</h1>
        <SelfPick onPick={handleSelfPick} />
      </div>
    );
  }

  // Step 3: Show coaching card
  if (selectedContact && card && you && isSituation(params.situation)) {
    return (
      <div class="route-shell">
        <button class="back-link" type="button" onClick={goBack}>
          <span aria-hidden="true">{'\u2190'}</span> {selectedContact.name}
        </button>
        <h1>{SITUATION_LABELS[params.situation]}</h1>
        <CoachingCardView
          card={card}
          yourSource={you.source}
          lastNote={lastNote}
          onCheckStyle={() => navigate(() => setLocation('/profile'))}
        />

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
          <span aria-hidden="true">{'\u2190'}</span> Back
        </button>
        <h1>
          Coaching for <span class={`inline-badge disc-${selectedContact.discProfile.primary.toLowerCase()}`}>
            {selectedContact.name}
          </span>
        </h1>
        <StyleLine contact={selectedContact} />
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
      <div class="route-shell centered">
        <div class="welcome-block">
          <svg class="welcome-motif" viewBox="0 0 120 120" width="80" height="80" aria-hidden="true">
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
            Pick someone and the conversation you're about to have.
            You get a short card for how they tend to hear things.
          </p>
          <div class="welcome-features">
            <div class="welcome-feature">
              <svg class="welcome-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p>Coaching tailored to how they communicate</p>
            </div>
            <div class="welcome-feature">
              <svg class="welcome-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <p>Phrases to open with and pitfalls to avoid</p>
            </div>
            <div class="welcome-feature">
              <svg class="welcome-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <p>Track what works over time</p>
            </div>
          </div>
          <button class="btn-primary" type="button" onClick={() => setShowQuickTag(true)}>
            Start with someone
          </button>
          <p class="welcome-hint">Takes about 60 seconds. No sign-up needed.</p>
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
              {Array.from(c.name.trim())[0]?.toUpperCase()}
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
          <p>Pick a name, pick the situation, and get specific coaching for how they hear things.</p>
        </div>
      )}

      {!user?.discProfile && contacts.length > 0 && (
        <div class="coach-nudge">
          <p>
            {user?.selfPick
              ? `You picked ${DISC_LABELS[user.selfPick]} for yourself. `
              : 'Want advice that fits how you talk, too? '}
            <button class="link-btn" type="button" onClick={() => navigate(() => setLocation('/profile'))}>
              {user?.selfPick ? 'Check it in 3 minutes' : 'Take the 3-minute assessment'}
            </button>
          </p>
        </div>
      )}

      {installAvailable && (
        <div class="install-banner">
          <p>Install Cleartalk for quick access and offline use</p>
          <div class="install-banner-actions">
            <button class="btn-primary btn-sm" type="button" onClick={async () => {
              const accepted = await triggerInstall();
              if (!accepted) setInstallAvailable(false);
            }}>
              Install
            </button>
            <button class="btn-ghost btn-sm" type="button" onClick={() => { dismissPrompt(); setInstallAvailable(false); }}>
              Not now
            </button>
          </div>
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
