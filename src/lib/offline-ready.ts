// Offline readiness: request persistent storage so Chrome does not evict
// precached assets between uses. Without this, Cache Storage can be cleared
// under storage pressure or unused-PWA heuristics, breaking offline launch.

export type OfflineStatus = 'ready' | 'unreliable' | 'not-installed' | 'unsupported';

export async function requestPersistentStorage(): Promise<boolean> {
  if (!navigator.storage?.persist) return false;
  if (await navigator.storage.persisted()) return true;
  try {
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}

export async function isPersisted(): Promise<boolean> {
  if (!navigator.storage?.persisted) return false;
  try {
    return await navigator.storage.persisted();
  } catch {
    return false;
  }
}

export async function getOfflineStatus(): Promise<OfflineStatus> {
  const installed = window.matchMedia('(display-mode: standalone)').matches;
  if (!installed) return 'not-installed';
  if (!('serviceWorker' in navigator) || !navigator.storage?.persisted) return 'unsupported';

  const hasController = !!navigator.serviceWorker.controller;
  const persistent = await isPersisted();

  return hasController && persistent ? 'ready' : 'unreliable';
}
