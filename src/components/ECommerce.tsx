import { motion } from 'motion/react';
import { GiftIcon, ArrowRight02Icon } from 'hugeicons-react';

const GIFT_CARD_URL = 'https://app.squareup.com/gift/ML5QH1ZNJJAR5/order';

export function GiftCards() {
  return (
    <section
      id="gifts"
      className="py-12 md:py-20 bg-identity border-t border-micro/20 scroll-mt-24 overflow-hidden"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-3 mb-3 md:mb-4 text-anchor">
              <GiftIcon size={18} strokeWidth={1.5} />
              <span className="uppercase tracking-[0.25em] text-[11px] font-semibold">
                Wrapped
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-anchor mb-4 md:mb-6 leading-[1.05]">
              Give the
              <br />
              <span className="italic font-light">Gift of Haus.</span>
            </h2>
            <p className="font-sans text-anchor/80 text-sm md:text-lg mb-6 md:mb-10 max-w-md leading-relaxed">
              Digital gift cards for every service. Choose any value and send it instantly.
            </p>
            <motion.a
              href={GIFT_CARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className="no-radius bg-anchor text-white border-2 border-transparent px-10 py-4 md:py-5 uppercase tracking-[0.25em] text-xs font-semibold inline-flex items-center gap-3 hover:bg-identity hover:text-action hover:border-action transition-colors duration-300"
            >
              <span>Purchase</span>
              <ArrowRight02Icon size={14} strokeWidth={2} />
            </motion.a>
          </motion.div>

          {/* Right — gift card mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            whileHover={{ rotate: 0, y: -6 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 20 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[18rem] md:max-w-md aspect-[1.586/1] bg-anchor border-2 border-anchor shadow-[8px_8px_0px_rgba(92,40,40,0.3)] md:shadow-[14px_14px_0px_rgba(92,40,40,0.3)] p-6 md:p-10 flex flex-col justify-between overflow-hidden">
              {/* Decorative shimmer */}
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 25% 20%, #fff 0%, transparent 40%), radial-gradient(circle at 75% 80%, #fff 0%, transparent 40%)',
                }}
              />

              {/* Card top */}
              <div className="relative flex items-start justify-between">
                <div className="text-white/60 uppercase tracking-[0.3em] text-[9px] font-semibold">
                  Gift Card
                </div>
                <GiftIcon size={22} strokeWidth={1.25} className="text-white/80" />
              </div>

              {/* Wordmark */}
              <div className="relative font-serif text-white text-lg md:text-3xl tracking-[0.18em] uppercase leading-[1.05]">
                The
                <br />
                Esthetic
                <br />
                Haus
              </div>

              {/* Card bottom */}
              <div className="relative flex items-end justify-between gap-4">
                <div className="font-serif italic text-white/60 text-xs leading-tight">
                  Any value
                  <br />
                  Any service
                </div>
                <div className="font-serif text-white text-2xl">$ —</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
