import { useEffect, useRef, useState } from 'react';
import { CarouselDots } from './CarouselDots';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight02Icon,
  CrownIcon,
  FlowerIcon,
  Baby01Icon,
  Leaf01Icon,
  SparklesIcon,
  Tick02Icon,
  Cancel01Icon,
} from 'hugeicons-react';

type Package = {
  id: string;
  title: string;
  bestFor: string;
  price: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  image?: string;
  description: string;
  includes?: string[];
  highlights?: string[];
  upgrades?: string[];
};

const packages: Package[] = [
  {
    id: 'bridal',
    title: 'The Bridal Haus Experience',
    bestFor: 'Brides',
    price: '$785',
    Icon: CrownIcon,
    image: '/eh_public_assets/Haus_Packages/The_Bridal_Haus_Experience.webp',
    description:
      'A fully customizable bridal beauty journey designed to have you glowing from head to toe — skin, smile, lashes, brows, and beyond. Spaced strategically over 3–6 months (or condensed if needed) to ensure peak results by your wedding day.',
    includes: [
      '3 Haus Prep Facials — our signature facial series tailored to your skin\u2019s needs and wedding timeline. Focused on clarity, hydration, and a long-lasting glow.',
      '3 Rounds of Professional Teeth Whitening — gradual, safe sessions for a bright, photo-ready smile without sensitivity.',
      'Lash Enhancement (choose one) — Lash Lift or Lash Extensions.',
      'Scalp Therapy & Massage — a deeply relaxing scalp treatment to promote circulation, relieve stress, and support healthy hair.',
      'Brow Perfection (choose one) — Brow Lamination or Brow Tint + Wax.',
    ],
    highlights: [
      '100% customizable to you — services, timing, and focus areas',
      'Personalized consultation & bridal beauty plan',
      'Designed to align with your wedding events, photos, and honeymoon',
    ],
    upgrades: [
      'Dermaplaning or advanced facial add-ons',
      'Additional whitening sessions',
      'Bridal trial lashes or brows',
      'Wedding-week glow treatment',
    ],
  },
  {
    id: 'new-mommy',
    title: 'The Haus New Mommy Reset Glow Package',
    bestFor: 'New Moms',
    price: '$400',
    Icon: FlowerIcon,
    image: '/eh_public_assets/Haus_Packages/The_Haus_New_Mommy_Reset_Glow_Package.webp',
    description:
      'Designed for new mamas to provide nourishing care and support for rejuvenated, radiant skin. This thoughtfully curated package offers a seamless way to refresh and restore your natural glow with ease and convenience. New mamas deserve the perfect glow.',
  },
  {
    id: 'baby-bump',
    title: 'The Haus Baby Bump Package',
    bestFor: 'Expecting Moms',
    price: '$225',
    Icon: Baby01Icon,
    image: '/eh_public_assets/Haus_Packages/The_Haus_Baby_Bump_Package.webp',
    description:
      'A nurturing, glow-enhancing experience thoughtfully designed for expecting mothers. Calms hormonal skin changes, boosts hydration, and promotes radiant, healthy-looking skin in the safest, most soothing way. With gentle, pregnancy-safe products and intentional touch, this experience encourages deep relaxation while supporting your skin through every trimester. Your moment to pause, breathe, and embrace the beauty of motherhood — glowing confidently from bump to beyond.',
  },
  {
    id: 'molecular-peel',
    title: 'The Haus Molecular Peel Package',
    bestFor: 'Skin Renewal',
    price: '$840',
    Icon: Leaf01Icon,
    image: '/eh_public_assets/Haus_Packages/The_Haus_Molecular_Peel_Package.webp',
    description:
      'A curated series of 6 Cosmedix peels designed to target your specific skin goals with precision and results. This transformative treatment plan works to improve texture, tone, acne, and signs of aging through a structured, results-driven approach — all offered at a set package price for maximum value and consistency. Peels can also be done individually.',
  },
  {
    id: 'blemish-breakout',
    title: 'The Haus Blemish + Breakout Package',
    bestFor: 'Acne Care',
    price: '$2,300',
    Icon: SparklesIcon,
    image: '/eh_public_assets/Haus_Packages/The_Haus_Blemish+Breakout_Package.webp',
    description:
      'A comprehensive, results-focused skin transformation program designed to target active acne, congestion, and post-blemish marking at the source. This intensive series includes 10 corrective acne facials, strategically scheduled to restore balance, reduce inflammation, and support clearer, healthier-looking skin. Your plan also features progressive Cosmedix molecular peels to refine texture, improve tone, and accelerate cellular renewal, along with deeply nourishing hydration masks to maintain skin strength and barrier health throughout your journey. To support your results at home, you\u2019ll receive one complimentary Cosmedix retail product — on the haus — personally selected to align with your target skin goals.',
  },
];

function PlaceholderImage({ Icon, label }: { Icon: Package['Icon']; label: string }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-canvas via-identity/40 to-canvas flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 20%, #5C2828 0%, transparent 50%), radial-gradient(circle at 70% 80%, #334D12 0%, transparent 50%)',
        }}
      ></div>
      <div className="relative flex flex-col items-center gap-3 text-anchor/40">
        <Icon size={56} strokeWidth={1} />
        <span className="font-serif italic text-sm tracking-widest uppercase">{label}</span>
      </div>
    </div>
  );
}

function CompactCard({ pkg, onOpen }: { pkg: Package; onOpen: () => void }) {
  const { Icon } = pkg;
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group relative w-full text-left flex flex-col bg-white border border-micro/20 no-radius overflow-hidden hover:border-anchor hover:shadow-[8px_8px_0px_rgba(92,40,40,0.12)] transition-[border-color,box-shadow] duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] md:aspect-[5/4] w-full overflow-hidden border-b border-micro/15 bg-canvas">
        {pkg.image ? (
          <img
            src={pkg.image}
            alt={pkg.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderImage Icon={Icon} label={pkg.bestFor} />
        )}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/85 backdrop-blur-sm border border-anchor/20 uppercase tracking-[0.18em] text-[10px] font-semibold text-anchor">
          {pkg.bestFor}
        </div>
      </div>

      {/* Title + reveal hint */}
      <div className="flex flex-col p-5 md:p-6 gap-3">
        <h3 className="font-serif text-xl md:text-2xl leading-tight text-anchor min-h-[3.2rem]">
          {pkg.title}
        </h3>
        <div className="flex items-center justify-between pt-3 border-t border-anchor/15">
          <span
            className={`flex items-center justify-center w-10 h-10 text-anchor/70 group-hover:text-action transition-colors duration-300`}
            aria-hidden="true"
          >
            <Icon size={26} strokeWidth={1.5} />
          </span>
          <span className="uppercase tracking-[0.2em] text-[10px] font-semibold text-anchor/60 group-hover:text-action inline-flex items-center gap-2 transition-colors">
            <span>View</span>
            <ArrowRight02Icon size={14} strokeWidth={2} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function PackageModal({ pkg, onClose }: { pkg: Package; onClose: () => void }) {
  const { Icon } = pkg;

  // Esc key + body scroll lock
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-anchor/70 backdrop-blur-sm flex items-stretch md:items-center justify-center md:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:max-w-4xl bg-white border border-anchor/20 shadow-[12px_12px_0px_rgba(92,40,40,0.18)] overflow-y-auto max-h-screen md:max-h-[90vh] no-radius"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center bg-white border border-anchor/30 text-anchor hover:bg-anchor hover:text-white transition-colors duration-200"
        >
          <Cancel01Icon size={18} strokeWidth={2} />
        </button>

        {/* Hero image */}
        <div className="relative aspect-[16/9] md:aspect-[2/1] w-full overflow-hidden border-b border-micro/15 bg-canvas">
          {pkg.image ? (
            <img
              src={pkg.image}
              alt={pkg.title}
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <PlaceholderImage Icon={Icon} label={pkg.bestFor} />
          )}
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm border border-anchor/20 uppercase tracking-[0.18em] text-[10px] font-semibold text-anchor">
            {pkg.bestFor}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-12">
          <div className="flex items-center gap-3 mb-3 text-action">
            <Icon size={18} strokeWidth={1.5} />
            <span className="uppercase tracking-[0.25em] text-[11px] font-semibold">
              {pkg.bestFor}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] text-anchor mb-5">
            {pkg.title}
          </h2>
          <p className="font-sans text-anchor/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
            {pkg.description}
          </p>

          {pkg.includes && (
            <div className="mb-8">
              <div className="uppercase tracking-[0.22em] text-[10px] font-semibold text-anchor/50 mb-4">
                What’s Included
              </div>
              <ul className="space-y-3 max-w-2xl">
                {pkg.includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-anchor/80 leading-relaxed"
                  >
                    <span className="text-action mt-0.5 shrink-0">
                      <Tick02Icon size={16} strokeWidth={2} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(pkg.highlights || pkg.upgrades) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 max-w-2xl">
              {pkg.highlights && (
                <div>
                  <div className="uppercase tracking-[0.22em] text-[10px] font-semibold text-anchor/50 mb-3">
                    The Haus Difference
                  </div>
                  <ul className="space-y-2">
                    {pkg.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="text-xs text-anchor/70 leading-relaxed flex gap-2"
                      >
                        <span className="text-action">—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.upgrades && (
                <div>
                  <div className="uppercase tracking-[0.22em] text-[10px] font-semibold text-anchor/50 mb-3">
                    Optional Upgrades
                  </div>
                  <ul className="space-y-2">
                    {pkg.upgrades.map((u, i) => (
                      <li
                        key={i}
                        className="text-xs text-anchor/70 leading-relaxed flex gap-2"
                      >
                        <span className="text-action">+</span>
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* CTA strip */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-anchor/15">
            <div className="flex flex-col">
              <span className="uppercase tracking-[0.2em] text-[10px] font-semibold text-anchor/50">
                Investment
              </span>
              <span className="font-serif text-3xl text-action leading-tight">
                {pkg.price}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="no-radius bg-anchor text-white border-2 border-transparent px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold inline-flex items-center justify-center gap-3 hover:bg-white hover:text-action hover:border-action transition-colors duration-300"
            >
              <span>Select</span>
              <ArrowRight02Icon size={14} strokeWidth={2} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Packages() {
  const [openId, setOpenId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const openPackage = packages.find((p) => p.id === openId) || null;

  return (
    <section id="packages" className="py-16 md:py-20 bg-canvas border-t border-micro/20 scroll-mt-24">
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        {/* Header */}
        <div className="mb-12 md:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="inline-block bg-white border border-anchor/20 shadow-[8px_8px_0px_rgba(92,40,40,0.10)] md:shadow-[12px_12px_0px_rgba(92,40,40,0.10)] px-6 py-6 md:px-10 md:py-8 max-w-full"
          >
            <div className="inline-flex items-center gap-3 mb-4 text-action">
              <SparklesIcon size={18} strokeWidth={1.5} />
              <span className="uppercase tracking-[0.25em] text-[11px] font-semibold">
                Curated Protocols
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-anchor mb-6 whitespace-nowrap">
              The Haus Packages
            </h2>
            <p className="font-sans text-lg text-anchor/70 max-w-2xl mx-auto">
              A handful of intentional journeys, each shaped around a season of your life.
              <span className="hidden md:inline">
                <br />
              </span>{' '}
              Tap any to step inside.
            </p>
          </motion.div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`lg:col-span-2 ${i === 3 ? 'lg:col-start-2' : ''}`}
            >
              <CompactCard pkg={pkg} onOpen={() => setOpenId(pkg.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE CAROUSEL */}
      <div className="md:hidden mt-2">
        <div className="px-6 mb-5 flex items-center gap-3 text-anchor/60">
          <span className="uppercase tracking-[0.2em] text-[10px] font-semibold">
            Swipe to explore
          </span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="flex items-center"
          >
            <ArrowRight02Icon size={18} strokeWidth={1.75} />
          </motion.div>
        </div>
        <div ref={carouselRef} className="w-full overflow-x-auto pb-6 hide-scrollbar pl-6 snap-x snap-mandatory">
          <div className="flex gap-6 w-max pr-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="snap-center w-[78vw] max-w-[340px] flex"
              >
                <CompactCard pkg={pkg} onOpen={() => setOpenId(pkg.id)} />
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE CAROUSEL DOTS */}
        <CarouselDots
          scrollRef={carouselRef}
          count={packages.length}
          maxVisible={7}
          className="pt-2 pb-2"
        />
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {openPackage && (
          <PackageModal pkg={openPackage} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
