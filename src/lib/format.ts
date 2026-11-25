function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export function formatRelativeDate(ts: number): string {
  const d = new Date(ts);
  // Round, not floor: local midnights are 23h or 25h apart across a DST change.
  const days = Math.round((startOfDay(new Date()) - startOfDay(d)) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
}

/** "Today" and "Yesterday" after a comma; dates like "Mar 10" keep their capital. */
export function midSentence(when: string): string {
  return when === 'Today' || when === 'Yesterday' ? when.toLowerCase() : when;
}
