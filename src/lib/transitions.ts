function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function navigate(callback: () => void): void {
  if (prefersReducedMotion() || !('startViewTransition' in document)) {
    document.documentElement.classList.add('route-transition');
    callback();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('route-transition');
      });
    });
    return;
  }

  (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(callback);
}
