'use client';

import { load, trackPageview } from 'fathom-client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const fathomId = process.env.NEXT_PUBLIC_FATHOM_ID;

      if (!fathomId) {
        console.error('Fathom ID is not defined in environment variables.');
        return;
      }

      load(fathomId, {
        auto: false
      });

      // Initial page view tracking when the component mounts
      if (pathname) {
        trackPageview({
          url: `${pathname}${searchParams?.toString()}`,
          referrer: document.referrer
        });
      }
    } catch (error) {
      console.error('Error initializing Fathom:', error);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    try {
      if (!pathname) return;

      trackPageview({
        url: `${pathname}${searchParams?.toString()}`,
        referrer: document.referrer
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, [pathname, searchParams]);

  return null;
}

export function FathomAnalytics() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}