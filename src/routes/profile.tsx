import { useState, useEffect } from 'preact/hooks';
import { Assessment } from '../components/assessment.tsx';
import { DiscWheel } from '../components/disc-wheel.tsx';
import { getOrCreateUser, getJournalEntries, getContacts } from '../db/queries.ts';
import { typeProfiles } from '../data/blind-spots.ts';
import { calculateInsights } from '../engine/insights.ts';
import { exportData, downloadJson } from '../lib/storage.ts';
import { DISC_LABELS } from '../engine/types.ts';
import type { User, DiscProfile, JournalEntry } from '../engine/types.ts';
import type { InsightsSummary } from '../engine/insights.ts';

export function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [insights, setInsights] = useState<InsightsSummary | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState<'auto' | 'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('cleartalk-theme') as 'light' | 'dark') ?? 'auto';
    } catch {
      return 'auto';
    }
  });

  useEffect(() => { loadProfile(); }, []);

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
    return <div class="route-shell"><h1>Your profile</h1><p class="loading-text" aria-live="polite">Loading...</p></div>;
  }

  if (error) {
    return (
      <div class="route-shell">
        <h1>Your profile</h1>
        <div class="welcome-block">
          <p class="welcome-text">Something went wrong loading your profile. Your data is safe - try again.</p>
          <button class="btn-primary" type="button" onClick={() => loadProfile()}>Try again</button>
        </div>
      </div>
    );
  }

  const profile = user?.discProfile;
  const primary = profile ? typeProfiles[profile.primary] : null;

  return (
    <div class="route-shell">
      <h1>Your profile</h1>

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

          <button class="btn-secondary" type="button" onClick={() => setShowAssessment(true)}>
            Retake assessment
          </button>
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
                      <span class={`insight-trend trend-${stat.trend}`}>
                        {stat.trend === 'improving' ? '\u2191' : stat.trend === 'declining' ? '\u2193' : '\u2192'}
                      </span>
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
          A tool that helps you talk to people better. Prepare for conversations
          with specific coaching for how the other person communicates.
        </p>
        <div class="usp-grid">
          <div class="usp-item">
            <span class="usp-icon" aria-hidden="true">{'\u{1F3AF}'}</span>
            <p>80 coaching cards across 5 situations</p>
          </div>
          <div class="usp-item">
            <span class="usp-icon" aria-hidden="true">{'\u{1F512}'}</span>
            <p>Your data never leaves your device</p>
          </div>
          <div class="usp-item">
            <span class="usp-icon" aria-hidden="true">{'\u{1F9E0}'}</span>
            <p>Built on communication science, not AI</p>
          </div>
          <div class="usp-item">
            <span class="usp-icon" aria-hidden="true">{'\u{26A1}'}</span>
            <p>No accounts, no sign-up, works offline</p>
          </div>
        </div>
      </div>
    </div>
  );
}
