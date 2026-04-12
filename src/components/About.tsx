import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown01Icon } from 'hugeicons-react';

export function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="about"
      className="relative py-14 md:py-32 lg:py-12 lg:min-h-[calc(100vh-6rem)] lg:flex lg:items-center bg-canvas border-t border-micro/20 overflow-hidden scroll-mt-24"
    >
      {/* ─── Background layering (bottom → top) ─────────────────
          1. Photo backdrop
          2. Grain texture — letterpress paper feel
          3. Subtle warmth vignettes — ambient color pooling */}

      {/* 1. Photo backdrop */}
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('/eh_public_assets/gallery/gallery19@full.webp')" }}
      />

      {/* 2. Grain */}
      <div className="absolute inset-0 pattern-grain opacity-70 mix-blend-multiply pointer-events-none" />

      {/* 4. Ambient warmth vignettes */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #5C2828 0%, transparent 40%), radial-gradient(circle at 80% 70%, #334D12 0%, transparent 45%)',
        }}
      />

      <div className="relative w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6 md:gap-10 lg:gap-12 items-center">
          {/* Portrait — left on desktop, top on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 20 }}
            className="md:col-span-5 lg:col-span-5 mx-auto md:mx-0 lg:mx-0 w-full max-w-[280px] sm:max-w-xs md:max-w-none lg:max-w-none"
          >
            <div className="relative aspect-[3/4] w-full bg-anchor border-2 border-anchor shadow-[10px_10px_0px_rgba(92,40,40,0.25)] md:shadow-[14px_14px_0px_rgba(92,40,40,0.25)] overflow-hidden">
              <img
                src="/eh_public_assets/Heart_behind_the_haus/A00A7255_1771383766.webp"
                alt="Natasha, founder of The Esthetic Haus"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Caption tab — like a polaroid */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-t border-anchor/20">
                <span className="font-serif italic text-anchor text-sm">
                  Natasha
                </span>
                <span className="uppercase tracking-[0.2em] text-[9px] font-semibold text-anchor/50">
                  Founder
                </span>
              </div>
            </div>
          </motion.div>

          {/* Letter card — right on desktop, below on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 22, delay: 0.1 }}
            className="md:col-span-7 lg:col-span-7"
          >
            <article className="relative bg-white border border-anchor/20 shadow-[10px_10px_0px_rgba(92,40,40,0.12)] md:shadow-[14px_14px_0px_rgba(92,40,40,0.12)] p-5 md:p-12 lg:p-10">
              {/* Headline */}
              <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-anchor leading-[1.05] mb-4 md:mb-8 lg:mb-5">
                The Heart Behind
                <br />
                <span className="italic font-light">the Haus.</span>
              </h2>

              {/* Hairline rule */}
              <div className="w-12 h-px bg-anchor/30 mb-4 md:mb-8 lg:mb-5"></div>

              {/* Body — drop cap on first letter */}
              <div className="font-serif text-anchor/85 text-base md:text-lg leading-[1.65] md:leading-[1.75] lg:leading-[1.55] space-y-4 md:space-y-5 lg:space-y-3">
                <p>
                  <span className="float-left font-serif text-[4.5rem] md:text-[6rem] leading-[0.78] mr-3 mt-1 text-anchor italic font-light">
                    I
                  </span>
                  decided to name my company The Esthetic Haus because I wanted it to feel like more than just a place for service; I wanted it to feel like home. <span className="italic">"Haus"</span> represents warmth, comfort, and a welcoming space where clients can relax, feel safe, and truly be cared for.
                </p>

                {/* Second paragraph — collapsible on mobile, always visible on md+ */}
                <div className="hidden md:block">
                  <p>
                    It reflects my vision of creating an environment rooted in intention, education, and elevated skincare, while still feeling personal and inviting. The name embodies my belief that esthetics isn't just about beauty, but about confidence, self-care, and belonging — where every client is treated like family and every visit feels familiar yet refined.
                  </p>
                </div>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      key="more"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="md:hidden overflow-hidden"
                    >
                      <p className="pt-4">
                        It reflects my vision of creating an environment rooted in intention, education, and elevated skincare, while still feeling personal and inviting. The name embodies my belief that esthetics isn't just about beauty, but about confidence, self-care, and belonging — where every client is treated like family and every visit feels familiar yet refined.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Read more / less — mobile only */}
              <button
                onClick={() => setExpanded((v) => !v)}
                className="md:hidden mt-4 inline-flex items-center gap-2 text-action uppercase tracking-[0.22em] text-[10px] font-semibold"
              >
                <span>{expanded ? 'Read less' : 'Read the full note'}</span>
                <motion.span
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="inline-flex"
                >
                  <ArrowDown01Icon size={14} strokeWidth={2} />
                </motion.span>
              </button>

              {/* Signature */}
              <div className="mt-6 md:mt-12 lg:mt-6 pt-5 md:pt-8 lg:pt-5 border-t border-anchor/15 flex flex-col items-end">
                <span className="font-serif italic text-anchor/60 text-sm tracking-wide mb-1">
                  XOXO,
                </span>
                <span className="font-serif italic font-light text-anchor text-5xl md:text-6xl leading-none">
                  Natasha
                </span>
              </div>
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
