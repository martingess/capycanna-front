import { useEffect } from 'react';
import { useRouter } from 'next/router';

const usePreviousUrl = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      const referrer = document.referrer;
      const previousUrl = sessionStorage.getItem('previousUrl');

      if (referrer && new URL(referrer).hostname !== window.location.hostname && !previousUrl) {
        body.dataset.previousUrl = referrer;
        sessionStorage.setItem('previousUrl', referrer);
      }

      if (sessionStorage.getItem('previousUrl') !== window?.location?.href) {
        body.dataset.previousUrl = sessionStorage.getItem('previousUrl') ?? '';
      }

      router.events.on('routeChangeStart', (url) => {
        sessionStorage.setItem('previousUrl', window?.location?.href ?? url);
        body.dataset.previousUrl = sessionStorage.getItem('previousUrl') ?? '';
      });

      return () => {
        router.events.off('routeChangeStart', (url) => {
          if (sessionStorage.getItem('previousUrl') !== window?.location?.href) {
            sessionStorage.setItem('previousUrl', window?.location?.href ?? url);
          }
        });
      };
    }
  }, [router.events]);
};

export { usePreviousUrl };
