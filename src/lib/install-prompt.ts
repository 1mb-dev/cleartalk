import { requestPersistentStorage } from './offline-ready.ts';

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let listeners: Array<(available: boolean) => void> = [];

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'cleartalk-install-dismissed';

export function isInstalled(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches;
}

export function wasDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED_KEY) === '1';
  } catch {
    return false;
  }
}

export function dismissPrompt(): void {
  try {
    localStorage.setItem(DISMISSED_KEY, '1');
  } catch { /* private browsing */ }
  deferredPrompt = null;
  notify(false);
}

export function canInstall(): boolean {
  return deferredPrompt !== null;
}

export function onInstallAvailable(fn: (available: boolean) => void): () => void {
  listeners.push(fn);
  return () => { listeners = listeners.filter(l => l !== fn); };
}

function notify(available: boolean) {
  for (const fn of listeners) fn(available);
}

export async function triggerInstall(): Promise<boolean> {
  if (!deferredPrompt) return false;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  notify(false);
  if (outcome === 'dismissed') {
    dismissPrompt();
  }
  return outcome === 'accepted';
}

// Set up listeners once
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', ((e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    notify(true);
  }) as EventListener);

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    notify(false);
    // Lock down storage so the PWA works offline from first cold launch.
    requestPersistentStorage().catch(() => { /* best-effort */ });
  });
}
