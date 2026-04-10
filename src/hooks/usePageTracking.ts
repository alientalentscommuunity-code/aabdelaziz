import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEngagement } from '@/lib/analytics';

/**
 * Hook to track page views in a React SPA
 * Should be used in App.tsx or a root layout component
 */
export const usePageTracking = () => {
  const location = useLocation();
  const startTimeRef = useRef<number>(Date.now());
  const previousPathRef = useRef<string>('');

  useEffect(() => {
    // Track engagement time on previous page before navigating
    if (previousPathRef.current && previousPathRef.current !== location.pathname) {
      const engagementTime = Date.now() - startTimeRef.current;
      trackEngagement(engagementTime);
    }

    // Track the new page view
    const pageTitle = document.title;
    const pagePath = location.pathname + location.search;
    
    // Small delay to ensure the page has rendered
    const timeoutId = setTimeout(() => {
      trackPageView(pagePath, pageTitle);
    }, 100);

    // Reset the start time for the new page
    startTimeRef.current = Date.now();
    previousPathRef.current = location.pathname;

    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.search]);

  // Track engagement when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      const engagementTime = Date.now() - startTimeRef.current;
      trackEngagement(engagementTime);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
};

export default usePageTracking;
