import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { Legal } from '../components/Legal';

const NAV_HEIGHT = 96; // 6rem

/**
 * On every route change:
 * - If the URL has a hash, wait for the target element to be in the DOM
 *   and layout to settle, then scroll to it.
 * - Otherwise, scroll to top.
 */
function ScrollManager() {
  const { pathname, hash, search } = useLocation();
  const prevPath = useRef(pathname);
  const prevSearch = useRef(search);

  useEffect(() => {
    const pathChanged = prevPath.current !== pathname;
    const searchChanged = prevSearch.current !== search;
    prevPath.current = pathname;
    prevSearch.current = search;

    if (hash) {
      // Strip any colon suffix (e.g. #services:Facials → services)
      const id = hash.slice(1).split(':')[0];
      // Poll until the element exists and its position stabilises
      let lastTop = -1;
      let stableCount = 0;
      let frame = 0;

      const poll = () => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (Math.abs(top - lastTop) < 2) {
            stableCount++;
          } else {
            stableCount = 0;
          }
          lastTop = top;
          // Wait until position is stable for 3 consecutive frames
          if (stableCount >= 3) {
            window.scrollTo({ top: top - NAV_HEIGHT, behavior: pathChanged ? 'instant' : 'smooth' });
            return;
          }
        }
        frame++;
        if (frame < 60) requestAnimationFrame(poll);
      };
      requestAnimationFrame(poll);
    } else if (pathChanged) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash, search]);

  return null;
}

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-canvas text-anchor selection:bg-identity selection:text-anchor">
      <ScrollManager />
      <Navigation />
      <Outlet />
      <Footer />
      <FloatingActionButton />
      <Legal />
    </div>
  );
}
