import type { ComponentChildren } from 'preact';
import { useLocation } from 'wouter';
import { navigate } from '../lib/transitions.ts';

interface LayoutProps {
  children: ComponentChildren;
}

const tabs = [
  { path: '/', label: 'Coach', icon: CoachIcon },
  { path: '/people', label: 'People', icon: PeopleIcon },
  { path: '/log', label: 'Log', icon: LogIcon },
  { path: '/profile', label: 'Profile', icon: ProfileIcon },
] as const;

export function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();

  function isActive(path: string): boolean {
    if (path === '/') return location === '/' || location.startsWith('/coach');
    return location.startsWith(path);
  }

  function handleTabClick(path: string) {
    if (isActive(path) && location === path) return;
    navigate(() => setLocation(path));
  }

  function handleKeyDown(e: KeyboardEvent, index: number) {
    let next = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      next = 0;
    } else if (e.key === 'End') {
      next = tabs.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    const btn = document.querySelector(`[data-tab-index="${next}"]`) as HTMLButtonElement | null;
    btn?.focus();
    btn?.click();
  }

  return (
    <div class="app-layout">
      <main id="main" class="app-content">
        {children}
      </main>
      <nav class="tab-bar" role="tablist" aria-label="Main navigation">
        {tabs.map((tab, i) => {
          const active = isActive(tab.path);
          return (
            <button
              key={tab.path}
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              data-tab-index={i}
              class={`tab-item${active ? ' tab-active' : ''}`}
              onClick={() => handleTabClick(tab.path)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              <tab.icon active={active} />
              <span class="tab-label">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function CoachIcon({ active }: { active: boolean }) {
  return (
    <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={active ? 2.5 : 2} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PeopleIcon({ active }: { active: boolean }) {
  return (
    <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={active ? 2.5 : 2} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LogIcon({ active }: { active: boolean }) {
  return (
    <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={active ? 2.5 : 2} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={active ? 2.5 : 2} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
