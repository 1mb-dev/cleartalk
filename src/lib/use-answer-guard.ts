import { useRef } from 'preact/hooks';

// The next question renders under the finger within a frame, so the second tap of a double tap
// lands on it as an answer. No one reads a question and answers it this fast.
const REPEAT_MS = 300;

/** Returns a check that is false for an answer that follows the last accepted one too closely. */
export function useAnswerGuard(): () => boolean {
  const last = useRef(-Infinity);
  return () => {
    const now = performance.now();
    if (now - last.current < REPEAT_MS) return false;
    last.current = now;
    return true;
  };
}
