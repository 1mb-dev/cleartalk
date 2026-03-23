import { useState, useEffect } from 'preact/hooks';
import { Assessment } from '../components/assessment.tsx';
import { DiscWheel } from '../components/disc-wheel.tsx';
import { getOrCreateUser, getJournalCount } from '../db/queries.ts';
import { typeProfiles } from '../data/blind-spots.ts';
import { exportData, downloadJson } from '../lib/storage.ts';
import type { User, DiscProfile } from '../engine/types.ts';

export function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [journalCount, setJournalCount] = useState(0);
  const [showAssessment, setShowAssessment] = useState(false);
  const [loading, setLoading] = useState(true);
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
    const [u, count] = await Promise.all([getOrCreateUser(), getJournalCount()]);
    setUser(u);
    setJournalCount(count);
    setLoading(false);
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
    const data = await exportData();
    downloadJson(data, `cleartalk-export-${new Date().toISOString().slice(0, 10)}.json`);
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
    return <div class="route-shell"><h1>Your profile</h1><p class="loading-text">Loading...</p></div>;
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
            Everyone has a default way of communicating -- patterns
            you don't notice until someone points them out.
            A short assessment helps you see yours.
          </p>
          <button class="btn-primary" type="button" onClick={() => setShowAssessment(true)}>
            Take the assessment
          </button>
          <p class="welcome-hint">Takes about 3 minutes. No wrong answers.</p>
        </div>
      )}

      {journalCount > 0 && (
        <div class="patterns-section">
          <h2>Your patterns</h2>
          {journalCount < 5 ? (
            <p class="patterns-empty">
              Patterns will appear here as you log more conversations.
              You have {journalCount} of 5 needed.
            </p>
          ) : (
            <p class="patterns-empty">
              You have {journalCount} logged conversations. Adaptation insights are coming soon.
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
          <span class="setting-label">Export your data</span>
          <button class="btn-secondary btn-sm" type="button" onClick={handleExport}>
            Download JSON
          </button>
        </div>
      </div>
    </div>
  );
}
