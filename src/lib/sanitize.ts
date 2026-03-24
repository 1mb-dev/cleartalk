/**
 * Strip control characters and collapse whitespace in user-provided names.
 * Preserves letters, numbers, punctuation, and standard whitespace.
 */
export function sanitizeName(input: string): string {
  return input
    // Remove zero-width chars, control chars (except space/newline)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200F\u2028-\u202F\uFEFF]/g, '')
    // Collapse multiple spaces into one
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Sanitize user-provided note text.
 * Preserves newlines but strips control characters.
 */
export function sanitizeNote(input: string): string {
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200F\u2028-\u202F\uFEFF]/g, '')
    .trim();
}
