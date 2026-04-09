import { RefObject, useEffect, useState } from 'react';
import { motion } from 'motion/react';

type Props = {
  /** Ref to the horizontally-scrolling container. */
  scrollRef: RefObject<HTMLElement | null>;
  /** Total number of slides in the carousel. */
  count: number;
  /** When this key changes, active slide resets to 0 (e.g. category change). */
  resetKey?: string | number;
  /** Max number of dots visible at full size. Defaults to 5. */
  maxVisible?: number;
  /** Tailwind class(es) for wrapper. */
  className?: string;
};

/**
 * iOS-style carousel dots.
 *
 * Renders all dots but uses a distance-based scale/opacity curve so only a
 * handful near the active index are visible at any time. The strip is
 * translated so the active dot stays centred — no window math, no key
 * swapping, no layout jumps.
 */
export function CarouselDots({
  scrollRef,
  count,
  resetKey,
  maxVisible = 5,
  className = '',
}: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [resetKey]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let frame = 0;
    const compute = () => {
      frame = 0;
      const track = el.firstElementChild as HTMLElement | null;
      const firstSlide = track?.firstElementChild as HTMLElement | null;
      if (!firstSlide) return;
      const trackStyle = track ? window.getComputedStyle(track) : null;
      const gap = trackStyle
        ? parseFloat(trackStyle.columnGap || trackStyle.gap || '0') || 0
        : 0;
      const slideWidth = firstSlide.offsetWidth + gap;
      if (slideWidth <= 0) return;
      const idx = Math.round(el.scrollLeft / slideWidth);
      setActive(Math.max(0, Math.min(count - 1, idx)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(compute);
    };

    compute();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [scrollRef, count]);

  if (count <= 1) return null;

  // Dot sizing: 6px base, 8px gap between centres
  const DOT = 6;
  const GAP = 8;
  const step = DOT + GAP; // 14px per dot
  const half = Math.floor(maxVisible / 2);

  // Translate the strip so the active dot is always centred
  const offset = -active * step;

  return (
    <div className={`flex justify-center overflow-hidden ${className}`}>
      {/* Fixed-width viewport that clips the tails */}
      <div
        className="relative overflow-hidden"
        style={{ width: maxVisible * step - GAP }}
      >
        <motion.div
          className="flex items-center"
          style={{ gap: GAP }}
          animate={{ x: offset + half * step }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {Array.from({ length: count }).map((_, i) => {
            const dist = Math.abs(i - active);
            // Active = full size, neighbours shrink, far dots vanish
            const scale = dist === 0 ? 1.35 : dist <= half ? 1 - dist * 0.15 : 0.4;
            const opacity = dist === 0 ? 1 : dist <= half ? 0.5 - dist * 0.08 : 0;
            return (
              <motion.span
                key={i}
                animate={{ scale, opacity }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="block shrink-0 rounded-full bg-anchor"
                style={{ width: DOT, height: DOT }}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
