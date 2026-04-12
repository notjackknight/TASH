import { motion } from 'motion/react';
import { ArrowDown01Icon, ArrowRight02Icon, Call02Icon } from 'hugeicons-react';
import { Link } from 'react-router';

const HERO_IMAGE = '/eh_public_assets/hero/hero_asset.webp';

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100svh-5rem)] lg:min-h-0 lg:h-[calc(100vh-6rem)] flex items-center overflow-hidden bg-anchor">
      {/* Full-bleed background image (all breakpoints) */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Calming spa environment"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        {/* Mobile overlay — top-to-bottom neutral dark wash for legibility */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-neutral-900/70 via-neutral-900/50 to-neutral-900/80"></div>
        {/* Desktop overlay — darker on the left where the text sits, lighter on the right so the photo breathes */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/55 to-neutral-900/20"></div>
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent"></div>
      </div>

      <div className="relative w-full mx-auto px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 pt-8 pb-24 lg:py-10 lg:h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="z-10 text-white text-center lg:text-left flex flex-col items-center lg:items-start w-full lg:max-w-2xl xl:max-w-3xl"
        >
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.9] mb-8 drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
            Where beauty <br />
            <span className="italic font-light">comes home.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-white/90 max-w-md mb-12 leading-relaxed drop-shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
            Facials, lashes, brows, and the kind of quiet ritual you look forward to all week. A space made to feel a little like home.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-stretch sm:items-center">
            <a
              href="#services"
              className="group no-radius bg-gradient-to-b from-white to-[#d4cdc1] text-anchor px-10 py-5 uppercase tracking-[0.2em] text-sm font-bold hover:from-action hover:to-action hover:text-white active:scale-[0.96] transition-all duration-300 text-center"
            >
              <span className="flex items-center justify-center gap-3">
                Book Now
                <ArrowRight02Icon size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </a>
            {/* Desktop: About The Haus | Mobile: Call Us */}
            <Link
              to="/greensboro-med-spa"
              className="hidden sm:block no-radius border border-white text-white px-10 py-5 uppercase tracking-[0.2em] text-sm font-medium hover:bg-action hover:text-white hover:border-action active:scale-[0.96] transition-all duration-300 text-center"
            >
              About The Haus
            </Link>
            <a
              href="tel:9146181809"
              className="sm:hidden no-radius border border-white text-white px-10 py-5 uppercase tracking-[0.2em] text-sm font-medium hover:bg-action hover:text-white hover:border-action active:scale-[0.96] transition-all duration-300 text-center"
            >
              <span className="flex items-center justify-center gap-3">
                Call Us
                <Call02Icon size={16} strokeWidth={2} />
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Explore scroll indicator */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-4 lg:bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
        aria-label="Scroll to explore"
      >
        <span className="uppercase tracking-[0.3em] text-[10px] font-semibold">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown01Icon size={18} strokeWidth={1.75} />
        </motion.div>
      </motion.a>
    </section>
  );
}
