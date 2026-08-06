import { describe, it, expect, afterEach } from 'vitest';
import { navigate } from './transitions.ts';

const globals = globalThis as unknown as Record<string, unknown>;
const originals = new Map<string, unknown>();

function setGlobal(key: string, value: unknown): void {
  if (!originals.has(key)) originals.set(key, globals[key]);
  globals[key] = value;
}

afterEach(() => {
  for (const [key, value] of originals) globals[key] = value;
  originals.clear();
});

function stubReducedMotion(matches: boolean): void {
  setGlobal('window', { matchMedia: () => ({ matches }) });
}

function stubDocument(startViewTransition?: (callback: () => void) => unknown): void {
  const element: Record<string, unknown> = {
    documentElement: { classList: { add: () => {}, remove: () => {} } },
    getElementById: () => null,
  };
  if (startViewTransition) element.startViewTransition = startViewTransition;
  setGlobal('document', element);
  setGlobal('requestAnimationFrame', (callback: (time: number) => void) => {
    callback(0);
    return 0;
  });
}

// Reached through globalThis because the app tsconfig has no node types, and one test is not
// reason enough to widen it.
type RejectionEvents = {
  on: (event: 'unhandledRejection', listener: (reason: unknown) => void) => void;
  off: (event: 'unhandledRejection', listener: (reason: unknown) => void) => void;
};
const proc = (globalThis as unknown as { process: RejectionEvents }).process;

// Rejections are only reported as unhandled after the microtask queue drains, so this waits a
// macrotask before deciding.
async function unhandledDuring(run: () => void): Promise<unknown[]> {
  const leaked: unknown[] = [];
  const listener = (reason: unknown): void => void leaked.push(reason);
  proc.on('unhandledRejection', listener);
  try {
    run();
    await new Promise((resolve) => setTimeout(resolve, 50));
  } finally {
    proc.off('unhandledRejection', listener);
  }
  return leaked;
}

describe('navigate', () => {
  it('runs the callback when motion is reduced', () => {
    stubReducedMotion(true);
    stubDocument();

    let ran = false;
    navigate(() => {
      ran = true;
    });

    expect(ran).toBe(true);
  });

  it('runs the callback when view transitions are unsupported', () => {
    stubReducedMotion(false);
    stubDocument();

    let ran = false;
    navigate(() => {
      ran = true;
    });

    expect(ran).toBe(true);
  });

  // The regression this exists for: `ready` rejects on every skipped transition, and for four
  // months nothing observed it, so production logged an uncaught InvalidStateError on every route
  // change. `finished` resolving is what made it invisible -- the app worked, the console did not.
  it('observes the ready rejection when the transition is skipped', async () => {
    stubReducedMotion(false);
    let ran = false;
    stubDocument((callback) => {
      callback();
      return {
        finished: Promise.resolve(),
        ready: Promise.reject(new Error('Transition was aborted because of invalid state')),
        updateCallbackDone: Promise.resolve(),
      };
    });

    const leaked = await unhandledDuring(() => {
      navigate(() => {
        ran = true;
      });
    });

    expect(ran).toBe(true);
    expect(leaked).toEqual([]);
  });
});
