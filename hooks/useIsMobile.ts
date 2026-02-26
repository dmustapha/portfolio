import { useState, useEffect } from 'react';

/**
 * One-time mobile check at 1024px breakpoint.
 * Does NOT listen for resize (matches original HTML behavior).
 * Returns `null` during SSR, boolean after mount.
 */
export function useIsMobile(): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  return isMobile;
}
