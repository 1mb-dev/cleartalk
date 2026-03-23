import { useState, useEffect } from 'preact/hooks';
import { useParams, useLocation } from 'wouter';
import { getContact, deleteContact, getJournalForContact } from '../db/queries.ts';
import { SITUATION_LABELS } from '../engine/types.ts';
import { DiscWheel } from '../components/disc-wheel.tsx';
import { typeProfiles } from '../data/blind-spots.ts';
import type { Contact, JournalEntry, SituationType } from '../engine/types.ts';
import { navigate } from '../lib/transitions.ts';

export function PersonDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [contact, setContact] = useState<Contact | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (id) loadPerson(id);
  }, [id]);

  async function loadPerson(personId: string) {
    setLoading(true);
    const [c, j] = await Promise.all([
      getContact(personId),
      getJournalForContact(personId),
    ]);
    setContact(c ?? null);
    setEntries(j);
    setLoading(false);
  }

  async function handleDelete() {
    if (!id) return;
    await deleteContact(id);
    navigate(() => setLocation('/people'));
  }

  if (loading) {
    return <div class="route-shell"><p class="loading-text">Loading...</p></div>;
  }

  if (!contact) {
    return (
      <div class="route-shell">
        <button class="back-link" type="button" onClick={() => navigate(() => setLocation('/people'))}>
          {'\u2190'} People
        </button>
        <p class="empty-state">Person not found.</p>
      </div>
    );
  }

  const profile = typeProfiles[contact.discProfile.primary];

  return (
    <div class="route-shell">
      <button class="back-link" type="button" onClick={() => navigate(() => setLocation('/people'))}>
        {'\u2190'} People
      </button>

      <h1>{contact.name}</h1>
      <p class="coach-subtitle">
        {profile.label} type
        {contact.confidence !== 'high' && ` -- ${contact.confidence} confidence`}
      </p>

      <DiscWheel profile={contact.discProfile} size={160} />

      <div class="type-summary compact">
        <p class="type-default">{profile.communicationDefault}</p>

        <h4>When talking to a {profile.label}</h4>
        <ul>
          <li>{profile.strengths[0]} -- lean into this</li>
          <li>{profile.blindSpots[0]} -- watch for this</li>
        </ul>
      </div>

      <div class="person-actions">
        <h3>Quick coach</h3>
        <div class="situation-grid compact">
          {(Object.entries(SITUATION_LABELS) as [SituationType, string][]).map(([key, label]) => (
            <button
              key={key}
              class="situation-btn-sm"
              type="button"
              onClick={() => navigate(() => setLocation(`/coach/${contact.id}/${key}`))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {entries.length > 0 && (
        <div class="person-history">
          <h3>Recent interactions</h3>
          <div class="journal-list">
            {entries.slice(0, 5).map(e => (
              <div key={e.id} class="journal-entry">
                <span class={`outcome-dot outcome-${e.outcome}`} aria-hidden="true" />
                <div class="journal-entry-content">
                  <span class="journal-situation">{SITUATION_LABELS[e.situationType]}</span>
                  {e.note && <span class="journal-note">{e.note}</span>}
                </div>
                <span class="journal-date">{formatDate(e.loggedAt)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div class="danger-zone">
        {confirmDelete ? (
          <div class="confirm-delete">
            <p>Remove {contact.name}? This also removes their interaction history.</p>
            <div class="confirm-delete-actions">
              <button class="btn-danger" type="button" onClick={handleDelete}>Remove</button>
              <button class="btn-secondary btn-sm" type="button" onClick={() => setConfirmDelete(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button class="btn-ghost-danger" type="button" onClick={() => setConfirmDelete(true)}>
            Remove {contact.name}
          </button>
        )}
      </div>
    </div>
  );
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
}
