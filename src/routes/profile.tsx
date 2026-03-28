import { useState, useEffect } from 'preact/hooks';
import { Assessment } from '../components/assessment.tsx';
import { DiscWheel } from '../components/disc-wheel.tsx';
import { getOrCreateUser, getJournalEntries, getContacts } from '../db/queries.ts';
import { typeProfiles } from '../data/type-profiles.ts';
import { calculateInsights } from '../engine/insights.ts';
import { exportData, downloadJson, importData, clearAllData } from '../lib/storage.ts';
import { canInstall, isInstalled, triggerInstall, onInstallAvailable } from '../lib/install-prompt.ts';
import { DISC_LABELS } from '../engine/types.ts';
import type { User, DiscProfile, JournalEntry } from '../engine/types.ts';
import type { InsightsSummary } from '../engine/insights.ts';
import { useDocumentTitle } from '../lib/use-document-title.ts';

export function Profile() {
  useDocumentTitle('Profile - ClearTalk');
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [insights, setInsights] = useState<InsightsSummary | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [showInstall, setShowInstall] = useState(canInstall() && !isInstalled());
  const [theme, setTheme] = useState<'auto' | 'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('cleartalk-theme') as 'light' | 'dark') ?? 'auto';
    } catch {
      return 'auto';
    }
  });

  useEffect(() => { loadProfile(); }, []);
  useEffect(() => onInstallAvailable((a) => setShowInstall(a && !isInstalled())), []);

  async function loadProfile() {
    setLoading(true);
    setError(false);
    try {
      const [u, e, c] = await Promise.all([
        getOrCreateUser(),
        getJournalEntries(200),
        getContacts(),
      ]);
      setUser(u);
      setEntries(e);
      setInsights(calculateInsights(e, c));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleAssessmentComplete(profile: DiscProfile) {
    setShowAssessment(false);
    setUser(prev => prev ? { ...prev, discProfile: profile } : prev);
  }

  function toggleTheme() {
    const next = theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto';
    setTheme(next);
    try {
      if (next === 'auto') {
        localStorage.removeItem('cleartalk-theme');
        document.documentElement.removeAttribute('data-theme');
      } else {
        localStorage.setItem('cleartalk-theme', next);
        document.documentElement.setAttribute('data-theme', next);
      }
    } catch { /* private browsing */ }
  }

  async function handleExport() {
    try {
      const data = await exportData();
      downloadJson(data, `cleartalk-export-${new Date().toISOString().slice(0, 10)}.json`);
    } catch {
      setError(true);
    }
  }

  function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const result = await importData(text);
        setImportStatus(`Imported ${result.contacts} contacts and ${result.entries} journal entries.`);
        setTimeout(() => setImportStatus(null), 4000);
        await loadProfile();
      } catch {
        setImportStatus('Could not import file. Make sure it is a ClearTalk export.');
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    input.click();
  }

  async function handleClearAll() {
    try {
      await clearAllData();
      setConfirmClear(false);
      setUser(null);
      setEntries([]);
      setInsights(null);
    } catch {
      setError(true);
    }
  }

  if (showAssessment) {
    return (
      <div class="route-shell">
        <Assessment
          onComplete={handleAssessmentComplete}
          onCancel={() => setShowAssessment(false)}
        />
      </div>
    );
  }

  if (loading) {
    return <div class="route-page"><div class="page-header"><h1>Profile</h1></div><p class="loading-text" aria-live="polite">Loading...</p></div>;
  }

  if (error) {
    return (
      <div class="route-page">
        <div class="page-header"><h1>Profile</h1></div>
        <div class="route-page-body">
          <div class="welcome-block">
            <p class="welcome-text">Something went wrong loading your profile. Your data is safe - try again.</p>
            <button class="btn-primary" type="button" onClick={() => loadProfile()}>Try again</button>
          </div>
        </div>
      </div>
    );
  }

  const profile = user?.discProfile;
  const primary = profile ? typeProfiles[profile.primary] : null;

  return (
    <div class="route-page">
      <div class="page-header"><h1>Profile</h1></div>

      {profile && primary ? (
        <>
          <DiscWheel profile={profile} />

          <div class="type-summary">
            <h3>{primary.label}: {primary.tagline}</h3>
            <p class="type-default">{primary.communicationDefault}</p>

            <h4>Under stress</h4>
            <p class="type-default">{primary.underStress}</p>

            <h4>Growth areas</h4>
            <ul>
              {primary.growthAreas.map((g, i) => <li key={i}>{g}</li>)}
            </ul>
          </div>

          <div class="retake-section">
            <button class="btn-secondary" type="button" onClick={() => setShowAssessment(true)}>
              Retake assessment
            </button>
          </div>
        </>
      ) : (
        <div class="welcome-block">
          <p class="welcome-text">
            Everyone has a default way of communicating - patterns
            you don't notice until someone points them out.
            A short assessment helps you see yours.
          </p>
          <button class="btn-primary" type="button" onClick={() => setShowAssessment(true)}>
            Take the assessment
          </button>
          <p class="welcome-hint">Takes about 3 minutes. No wrong answers.</p>
        </div>
      )}

      {/* Patterns */}
      {entries.length > 0 && (
        <div class="patterns-section">
          <h2>Your patterns</h2>

          {insights ? (
            <div class="insights-content">
              <div class="insights-overview">
                <div class="insight-stat">
                  <span class="insight-number">{insights.overallAverage}</span>
                  <span class="insight-label">average outcome</span>
                </div>
                <div class="insight-stat">
                  <span class="insight-number">{insights.totalEntries}</span>
                  <span class="insight-label">conversations logged</span>
                </div>
              </div>

              {insights.byType.length > 0 && (
                <div class="insights-by-type">
                  {insights.byType.map(stat => (
                    <div key={stat.theirType} class="insight-type-row">
                      <span class={`type-dot disc-${stat.theirType.toLowerCase()}`} aria-hidden="true" />
                      <span class="insight-type-name">{DISC_LABELS[stat.theirType]}</span>
                      <span class="insight-type-avg">{stat.average}</span>
                      <span class="insight-type-count">{stat.count} logged</span>
                      <span class={`insight-trend trend-${stat.trend}`} aria-hidden="true">
                        {stat.trend === 'improving' ? '\u2191' : stat.trend === 'declining' ? '\u2193' : '\u2192'}
                      </span>
                      <span class="sr-only">{stat.trend}</span>
                    </div>
                  ))}
                </div>
              )}

              {insights.tips.length > 0 && (
                <div class="insights-tips">
                  <h4>Growth</h4>
                  <ul>
                    {insights.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p class="patterns-empty">
              Patterns will appear here as you log more conversations.
              You have {entries.length} of 5 needed.
            </p>
          )}
        </div>
      )}

      {/* Settings */}
      <div class="profile-settings">
        <h2>Settings</h2>
        {showInstall && (
          <div class="setting-row">
            <div>
              <span class="setting-label">Install app</span>
              <p class="setting-hint">Quick access from your home screen, works offline</p>
            </div>
            <button class="btn-primary btn-sm" type="button" onClick={async () => {
              await triggerInstall();
              setShowInstall(false);
            }}>
              Install
            </button>
          </div>
        )}
        <div class="setting-row">
          <span class="setting-label">Appearance</span>
          <button class="setting-toggle" type="button" onClick={toggleTheme}>
            {theme === 'auto' ? 'Auto' : theme === 'light' ? 'Light' : 'Dark'}
          </button>
        </div>
        <div class="setting-row">
          <div>
            <span class="setting-label">Export your data</span>
            <p class="setting-hint">Includes contact names and conversation notes</p>
          </div>
          <button class="btn-secondary btn-sm" type="button" onClick={handleExport}>
            Download JSON
          </button>
        </div>
        <div class="setting-row">
          <div>
            <span class="setting-label">Import data</span>
            <p class="setting-hint">Restore from a ClearTalk export file</p>
          </div>
          <button class="btn-secondary btn-sm" type="button" onClick={handleImport}>
            Choose file
          </button>
        </div>
        {importStatus && (
          <p class="setting-status" aria-live="polite">{importStatus}</p>
        )}
        <div class="setting-row setting-row-danger">
          <div>
            <span class="setting-label">Clear all data</span>
            <p class="setting-hint">Permanently remove all contacts, entries, and assessments</p>
          </div>
          {confirmClear ? (
            <div class="confirm-delete-actions">
              <button class="btn-danger btn-sm" type="button" onClick={handleClearAll}>Confirm</button>
              <button class="btn-secondary btn-sm" type="button" onClick={() => setConfirmClear(false)}>Cancel</button>
            </div>
          ) : (
            <button class="btn-ghost-danger btn-sm" type="button" onClick={() => setConfirmClear(true)}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* How it works */}
      <div class="how-it-works">
        <h2>How ClearTalk works</h2>
        <div class="how-steps">
          <div class="how-step">
            <span class="how-step-num">1</span>
            <div>
              <h4>Add a person</h4>
              <p>Answer 8 quick questions about how they communicate. Takes about 60 seconds.</p>
            </div>
          </div>
          <div class="how-step">
            <span class="how-step-num">2</span>
            <div>
              <h4>Get coaching</h4>
              <p>Pick a situation - feedback, request, conflict, pitch, or difficult news. Get specific advice for that person.</p>
            </div>
          </div>
          <div class="how-step">
            <span class="how-step-num">3</span>
            <div>
              <h4>Track your growth</h4>
              <p>Log how conversations go. Over time, you will see which styles you handle well and where to improve.</p>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div class="about-section">
        <h2>About ClearTalk</h2>
        <p class="about-text">
          Know what to say before you say it. ClearTalk coaches you
          for the person and the moment - so you say the right thing, the right way.
        </p>
        <div class="usp-grid">
          <div class="usp-item">
            <svg class="usp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>Coaching for feedback, requests, conflict, pitches, and difficult news</p>
          </div>
          <div class="usp-item">
            <svg class="usp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p>Your data never leaves your device</p>
          </div>
          <div class="usp-item">
            <svg class="usp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <p>Grounded in how people actually communicate</p>
          </div>
          <div class="usp-item">
            <svg class="usp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <p>No accounts, no sign-up, works offline</p>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h2>Privacy</h2>
        <div class="privacy-details">
          <p>All your contacts, assessments, and conversation notes are stored locally on your device in your browser's storage. Nothing is sent to a server.</p>
          <p>ClearTalk uses Cloudflare Web Analytics for anonymous page-view counts. This does not use cookies, does not collect personal data, and cannot identify you.</p>
          <p>You can export or delete all your data at any time from the settings above.</p>
        </div>
      </div>
    </div>
  );
}
