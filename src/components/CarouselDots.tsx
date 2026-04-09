import { RefObject, useEffect, useState } from 'react';
import { motion } from 'motion/react';

type Props = {
  /** Ref to the horizontally-scrolling container. */
  scrollRef: RefObject<HTMLElement | null>;
  /** Total number of slides in the carousel. */
  count: number;
  /** When this key changes, active slide resets to 0 (e.g. category change). */
  resetKey?: string | number;
  /** Max number of dots to render at once. Defaults to 7. */
  maxVisible?: number;
  /** Tailwind class(es) for wrapper. */
  className?: string;
};

/**
 * Dots indicator for a horizontally-scrolling carousel.
 *
 * - Reads scroll position from the given scrollRef and derives the active slide
 *   by measuring the first slide's width (+ gap). rAF-throttled.
 * - When `count > maxVisible`, renders a sliding window: always shows
 *   `maxVisible` dots, with the active one staying near the middle. Edge dots
 *   shrink to hint at more content.
 * - Active dot grows and becomes fully opaque. Inactive dots sit at low opacity.
 */
export function CarouselDots({
  scrollRef,
  count,
  resetKey,
  maxVisible = 7,
  className = '',
}: Props) {
  const [active, setActive] = useState(0);

  // Reset when caller signals (e.g. category filter changed).
  useEffect(() => {
    setActive(0);
  }, [resetKey]);

  // Track scroll → active index.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let frame = 0;
    const compute = () => {
      frame = 0;
      const track = el.firstElementChild as HTMLElement | null;
      const firstSlide = track?.firstElementChild as HTMLElement | null;
      if (!firstSlide) return;
      // Measure gap from the flex track's computed style so we're not relying
      // on a hard-coded value that can drift from the Tailwind class.
      const trackStyle = track ? window.getComputedStyle(track) : null;
      const gap = trackStyle ? parseFloat(trackStyle.columnGap || trackStyle.gap || '0') || 0 : 0;
      const slideWidth = firstSlide.offsetWidth + gap;
      if (slideWidth <= 0) return;
      const idx = Math.round(el.scrollLeft / slideWidth);
      setActive(Math.max(0, Math.min(count - 1, idx)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(compute);
    };

    // Compute once in case the carousel is pre-scrolled.
    compute();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [scrollRef, count]);

  if (count <= 1) return null;

  // Compute the visible window of dot indices.
  // When count ≤ maxVisible, show them all.
  // Otherwise, center the window on `active` and clamp to [0, count-1].
  const visibleCount = Math.min(count, maxVisible);
  const half = Math.floor(visibleCount / 2);
  let start = active - half;
  if (start < 0) start = 0;
  if (start + visibleCount > count) start = count - visibleCount;

  // Which position within the visible window is currently active?
  // Keyed by window slot (0..visibleCount-1) rather than absolute index, so
  // the dot strip has a stable layout even as the window slides past the
  // underlying list — no reshuffle, no animation glitch.
  const activeInWindow = active - start;

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: visibleCount }).map((_, slot) => {
        const isActive = slot === activeInWindow;
        return (
          <motion.span
            key={slot}
            animate={{
              scale: isActive ? 1.4 : 1,
              opacity: isActive ? 1 : 0.35,
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="block w-1.5 h-1.5 rounded-full bg-anchor"
          />
        );
      })}
    </div>
  );
}
