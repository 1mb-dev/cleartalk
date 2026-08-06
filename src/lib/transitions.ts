function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function restoreFocus(): void {
  requestAnimationFrame(() => {
    const main = document.getElementById('main');
    if (main) {
      main.scrollTo(0, 0);
      const heading = main.querySelector('h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }
  });
}

export function navigate(callback: () => void): void {
  if (prefersReducedMotion() || !('startViewTransition' in document)) {
    document.documentElement.classList.add('route-transition');
    callback();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('route-transition');
        restoreFocus();
      });
    });
    return;
  }

  const transition = (
    document as unknown as {
      startViewTransition: (cb: () => void) => { finished: Promise<void>; ready: Promise<void> };
    }
  ).startViewTransition(callback);

  // `ready` rejects with InvalidStateError whenever the browser skips the transition -- a
  // backgrounded tab, or another transition already in flight. That is benign: the callback still
  // runs and `finished` still resolves, so the route change completes either way. But an
  // unobserved rejection surfaces as an uncaught error on every navigation, so observe it.
  transition.ready.catch(() => {});
  transition.finished.then(restoreFocus).catch(restoreFocus);
}
