import { useEffect } from 'preact/hooks';

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title;

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = window.location.href;
    }
  }, [title]);
}
