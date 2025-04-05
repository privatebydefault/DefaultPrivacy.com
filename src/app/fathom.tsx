'use client';

import { load, trackPageview } from 'fathom-client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
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
  }, [pathname, searchParams]); // Include pathname and searchParams in the dependency array

  useEffect(() => {
    // Track page views on subsequent route changes
    if (!pathname) return;

    trackPageview({
      url: `${pathname}${searchParams?.toString()}`,
      referrer: document.referrer
    });
  }, [pathname, searchParams]);

  return null;
}

export function FathomAnalytics() {
  return (
    <TrackPageView /> // Removed Suspense as it's not strictly necessary for this use case
  );
}