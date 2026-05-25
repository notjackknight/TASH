import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import {
  ArrowRight02Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  SparklesIcon,
  EyeIcon,
  QuillWrite01Icon,
  DiamondIcon,
  FeatherIcon,
  Sun03Icon,
} from 'hugeicons-react';
import { CarouselDots } from './CarouselDots';
import { openBooking } from '../hooks/useBooking';

type Service = {
  title: string;
  desc: string;
  price: string;
  category: Category;
};

const categories = [
  'All',
  'Facials',
  'Lashes',
  'Brows',
  'Advanced',
  'Waxing',
  'Finishing',
] as const;

type Category = typeof categories[number];

const categoryMeta: Record<
  Exclude<Category, 'All'>,
  { icon: typeof SparklesIcon; label: string }
> = {
  Facials: { icon: SparklesIcon, label: 'Facial Protocol' },
  Lashes: { icon: EyeIcon, label: 'Lash Enhancement' },
  Brows: { icon: QuillWrite01Icon, label: 'Brow Studio' },
  Advanced: { icon: DiamondIcon, label: 'Advanced Treatment' },
  Waxing: { icon: FeatherIcon, label: 'Waxing Service' },
  Finishing: { icon: Sun03Icon, label: 'Finishing Touch' },
};

const services: Service[] = [
  // ─── Top picks (cross-category, for "All" preview) ───────
  {
    title: 'The Signature TASH Facial',
    desc: 'A luxurious, customized skincare service designed to address individual needs through professional-grade treatments and deep relaxation. A balanced approach to skin health, suitable for all skin types.',
    price: '$100',
    category: 'Facials',
  },
  {
    title: 'Brow Wax',
    desc: 'Precise shaping and definition for a clean, polished look. Gentle techniques ensure easy removal and long-lasting results, customized to enhance your facial features.',
    price: '$28',
    category: 'Brows',
  },

  // ─── Facials (popularity order) ──────────────────────────
  {
    title: 'The TASH Hydraglow Facial',
    desc: 'Combines advanced hydration via our hydro-facial machine with rejuvenating skincare to leave your skin glowing and refreshed. Add on the Hydra-Plane Facial to level up the glow and rejuvenation.',
    price: '$160',
    category: 'Facials',
  },
  {
    title: 'The TASH Dermaplane Facial',
    desc: 'A gentle yet powerful treatment that exfoliates the skin by removing dead skin cells and peach fuzz, leaving your complexion instantly smoother, brighter, and glowing — with enhanced product absorption and flawless makeup application.',
    price: '$130',
    category: 'Facials',
  },
  {
    title: 'The TASH Brightening Facial',
    desc: 'Designed to restore radiance and even skin tone. Uses gentle exfoliants and molecular peels from Cosmedix to correct hyperpigmentation, dullness, and discoloration — leaving your complexion smooth, refreshed, and visibly glowing.',
    price: '$120',
    category: 'Facials',
  },
  {
    title: 'The Pure TASH Acne Detox Facial',
    desc: 'A targeted skincare service designed to deeply cleanse pores, rejuvenate skin, and combat blemishes. A customized facial plan to help you achieve a refreshed, clarified complexion.',
    price: '$150',
    category: 'Facials',
  },
  {
    title: 'The TASH Mini Facial',
    desc: 'Designed for quick yet effective skin rejuvenation, leaving your skin feeling fresh and revitalized in minimal time. The perfect facial for those on a tight schedule wanting professional care and convenience in one appointment.',
    price: '$85',
    category: 'Facials',
  },
  {
    title: 'The Calm TASH Facial',
    desc: 'A personalized skincare service using Cosmedix to nourish your skin with their premium ingredients. Leaving you soothed, hydrated, and radiant.',
    price: '$110',
    category: 'Facials',
  },
  {
    title: 'The Timeless TASH Facial',
    desc: 'A rejuvenating service designed to target signs of aging while providing deep hydration using Cosmedix custom ingredients. Hydrogen-oxygen infusion deeply hydrates and energizes the skin, ultrasonic and hydro exfoliation gently remove dead skin cells, and galvanic or high-frequency therapy stimulates circulation. Red LED light therapy supports collagen production and skin tightening — restoring a smoother, firmer, more youthful complexion.',
    price: '$165',
    category: 'Facials',
  },
  {
    title: 'The TASH Hydrogen Facial',
    desc: 'A rejuvenating treatment that infuses the skin with hydrogen-rich oxygen to deeply hydrate, refresh, and revitalize the complexion. Helps neutralize free radicals, improve circulation, and enhance radiance — leaving the skin plumper, smoother, and more youthful.',
    price: '$150',
    category: 'Facials',
  },
  {
    title: 'The TASH Back Facial',
    desc: 'A nourishing treatment designed to deeply cleanse and rejuvenate the skin on your back. Promotes hydration, clarity, and skin health — ideal for a refreshed and polished appearance.',
    price: '$105',
    category: 'Facials',
  },

  // ─── Lashes (popularity order) ───────────────────────────
  {
    title: 'The Soft TASH Fill',
    desc: 'Must have 50% or more lashes on to be considered a fill.',
    price: '$75',
    category: 'Lashes',
  },
  {
    title: 'The Soft Glam TASH Fill',
    desc: 'Must have 50% or more lashes on to be considered a fill.',
    price: '$60',
    category: 'Lashes',
  },
  {
    title: 'The TASH Soft Glam Full Set',
    desc: 'A luxurious lash set inspired by a mix of hybrid and classic styles, creating a gentle, fluffy fullness that\u2019s customized just for you.',
    price: '$150',
    category: 'Lashes',
  },
  {
    title: 'The Soft TASH Full Set',
    desc: 'Enhances your natural lashes with a clean, subtle finish. Customized and tailored to complement your beautiful features.',
    price: '$200',
    category: 'Lashes',
  },
  {
    title: "TASH's Signature Lash Lift",
    desc: 'Take your natural lashes to the next level. Instant results with a lifted, curled appearance.',
    price: '$114',
    category: 'Lashes',
  },
  {
    title: 'The Bold TASH Volume Fill',
    desc: 'You need to have at least 50% of your lashes to be considered a fill.',
    price: '$90',
    category: 'Lashes',
  },
  {
    title: 'The Bold TASH Volume Full Set',
    desc: 'No mega volumes here — but definitely some power and dramatic lashes to create a gorgeously fluffy set.',
    price: '$250',
    category: 'Lashes',
  },
  {
    title: 'The TASH Korean Lash Lift',
    desc: 'Experience the next level of lash enhancement. A premium treatment designed to nourish, lift, and define your natural lashes using advanced Korean lash technology — delivering a soft, natural curl with a glossy, healthy finish while prioritizing lash strength and integrity. Perfect for all lash types, with minimal maintenance and long-lasting results. No extensions, no mascara required.',
    price: '$125',
    category: 'Lashes',
  },
  {
    title: 'The Mini TASH Lash Touch Up',
    desc: 'TASH Skin created mini fills for those who need a tiny refresh or want to add on more lashes but aren\u2019t quite ready for a full fill.',
    price: 'Variable',
    category: 'Lashes',
  },
  {
    title: 'The Signature TASH Lash Tint',
    desc: 'Enhances your natural lashes by adding depth and definition for a darker, more polished look without mascara. A quick treatment with long-lasting color for effortless, everyday beauty.',
    price: '$30',
    category: 'Lashes',
  },
  {
    title: 'Lash Removal',
    desc: 'Using Lost Artistry\u2019s lash removal, we leave you bare with all your natural lashes free to breathe. Say goodbye to the oldies.',
    price: '$60',
    category: 'Lashes',
  },

  // ─── Brows (popularity order) ────────────────────────────
  {
    title: 'Brow Code Brow Tint',
    desc: 'Enhance your natural brows with long-lasting color, tailored to complement your features.',
    price: '$20',
    category: 'Brows',
  },
  {
    title: 'The TASH Brow Lamination',
    desc: 'Effortlessly fluffy, lifted brows. Restructures the brow hairs to enhance shape, symmetry, and fullness. Includes a 2-step treatment, tint or stain, and a brow wax.',
    price: '$110',
    category: 'Brows',
  },
  {
    title: 'Brow Code Hybrid Brow Stain',
    desc: 'An innovative formula that achieves fuller, longer-lasting brow results.',
    price: '$25',
    category: 'Brows',
  },

  // ─── Advanced Treatments (popularity order) ──────────────
  {
    title: 'The TASH Microneedling Treatment',
    desc: 'A targeted skincare service designed to stimulate collagen production, reduce the appearance of fine lines, and promote overall skin rejuvenation. Ideal for enhancing skin texture and tone with minimal downtime.',
    price: '$250',
    category: 'Advanced',
  },
  {
    title: 'Cosmedix Molecular Peels',
    desc: 'A professional-grade exfoliating treatment using advanced formulas to gently yet effectively remove dull surface skin and stimulate cellular renewal. Combines vitamin A complexes, fruit acids, and antioxidants to improve texture, smooth fine lines, reduce pigmentation, and reveal a brighter, more even-toned complexion — with minimal irritation and downtime compared to traditional peels.',
    price: 'Variable',
    category: 'Advanced',
  },
  {
    title: 'TODO_CLIENT: LED Therapy',
    desc: 'A non-invasive skin treatment that uses different colors of light to help heal skin, reduce acne, calm inflammation, and boost collagen — safe, gentle, and painless. Available as an add-on or stand-alone service. As a stand-alone, it includes a double cleanse, skin analysis, toning, mask, and LED.',
    price: '$100',
    category: 'Advanced',
  },
  {
    title: 'TASH Scalp Treatment and Massage',
    desc: 'A deep scalp reset designed to cleanse, stimulate, and get your crown back in alignment. Luxe scalp treatment plus a stress-melting massage for healthy roots and total relaxation.',
    price: '$60',
    category: 'Advanced',
  },
  {
    title: 'The TASH Hydrated Lip Mask',
    desc: 'Provides intensive hydration and nourishment for your lips. Add it on to a service or enjoy as a stand-alone treatment.',
    price: '$15',
    category: 'Advanced',
  },

  // ─── Waxing (popularity order) ───────────────────────────
  {
    title: 'The TASH Signature Lip Wax',
    desc: 'Precise hair removal for smooth, well-defined lips. Quick, effective, and easy to add to any appointment.',
    price: '$10',
    category: 'Waxing',
  },
  {
    title: 'The TASH Face Wax',
    desc: 'Brow, lip, chin, and sideburns — all in one polished service.',
    price: '$50',
    category: 'Waxing',
  },
  {
    title: 'The TASH Underarm Wax',
    desc: 'Quick, effective hair removal for smooth, clean underarms. Leaves skin feeling fresh, soft, and polished with long-lasting results.',
    price: '$40',
    category: 'Waxing',
  },
  {
    title: 'The TASH Full Leg Wax',
    desc: 'A thorough and precise hair removal treatment from ankle to thigh, leaving skin smooth and silky. Ideal for those seeking a professional and efficient hair removal solution.',
    price: '$110',
    category: 'Waxing',
  },
  {
    title: 'The TASH Half Leg Wax',
    desc: 'Efficient hair removal from the knee down for smooth, long-lasting results. Suitable for all skin types and a consistently polished appearance.',
    price: '$80',
    category: 'Waxing',
  },
  {
    title: 'The TASH Full Arm Wax',
    desc: 'Removes unwanted hair from shoulder to wrist, leaving your arms smooth, clean, and polished. Quick and effective with long-lasting results and a flawless finish.',
    price: '$95',
    category: 'Waxing',
  },
  {
    title: 'The TASH Stomach Wax',
    desc: 'A precise and efficient stomach waxing service designed to provide smooth, hair-free skin.',
    price: '$75',
    category: 'Waxing',
  },

  // ─── Finishing Touches ───────────────────────────────────
  {
    title: 'The TASH Pearly White Teeth Whitening',
    desc: 'A professional, appointment-based service designed to help you achieve a brighter, more confident smile. Fast, effective whitening tailored to your needs in a comfortable setting — three rounds for a flat fee, with all the same products you\u2019d find at a dental office.',
    price: '$200',
    category: 'Finishing',
  },
  {
    title: 'The TASH Luxury Spray Tan',
    desc: 'A custom, natural-looking tan using premium Norvell solutions for even application and long-lasting results. Tailored to your skin tone for a flawless, sun-kissed glow.',
    price: '$60',
    category: 'Finishing',
  },
  {
    title: "TASH's Tooth Gems",
    desc: 'Tooth gems made with authentic Swarovski crystals, designed to add a subtle sparkle or bold shine to your smile. Professionally applied with safe dental-grade adhesive — comfortable, non-invasive, and lasting over a year with proper care. Stylish, durable, and removable by a professional.',
    price: '$70 / gem',
    category: 'Finishing',
  },
];

const categoryRoutes: Partial<Record<Exclude<Category, 'All'>, string>> = {
  Facials: '/services/facials',
  Lashes: '/services/lashes',
  Brows: '/services/brows',
  Advanced: '/services/microneedling',
  Finishing: '/services/teeth-whitening',
};

const categoryLinkLabels: Partial<Record<Exclude<Category, 'All'>, string>> = {
  Facials: 'Learn About Facials',
  Lashes: 'Learn About Lashes',
  Brows: 'Learn About Brows',
  Advanced: 'Learn About Microneedling',
  Finishing: 'Learn About Teeth Whitening',
};

const DESKTOP_PREVIEW = 3;
const READ_MORE_THRESHOLD = 140;

function ServiceCard({ service, plain = false }: { key?: React.Key; service: Service; plain?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = service.desc.length > READ_MORE_THRESHOLD;
  const shortDesc = isLong
    ? service.desc.slice(0, READ_MORE_THRESHOLD).trimEnd() + '\u2026'
    : service.desc;

  const meta = categoryMeta[service.category as Exclude<Category, 'All'>];
  const Icon = meta.icon;

  const Article: any = plain ? 'article' : motion.article;
  const articleProps = plain
    ? {}
    : {
        layout: true,
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { type: 'spring', stiffness: 90, damping: 22 },
      };

  return (
    <Article
      {...articleProps}
      className="group relative flex flex-col bg-white border-2 border-anchor/25 no-radius overflow-hidden hover:bg-canvas/20 transition-all duration-300 ease-in-out"
    >
      <div className="flex-1 flex flex-col p-7 md:p-8">
        {/* Eyebrow — icon + category label */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-action">
            <Icon size={18} strokeWidth={1.4} />
          </span>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-action">
            {meta.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-[1.35rem] md:text-[1.5rem] leading-tight text-anchor mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <div className="text-micro text-[0.85rem] md:text-sm font-light leading-[1.65] mb-0 flex-1">
          <motion.p layout="position">
            {expanded || !isLong ? service.desc : shortDesc}
          </motion.p>
          {isLong && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 text-action uppercase tracking-[0.18em] text-[10px] font-semibold hover:text-anchor transition-colors"
            >
              {expanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Structural divider */}
        <hr className="border-0 h-px bg-canvas group-hover:bg-action/30 transition-colors duration-300 ease-in-out mt-6 mb-0" />

        {/* Footer specs — Price | Select */}
        <div className="grid grid-cols-2 items-stretch -mx-7 md:-mx-8">
          {/* Price — left */}
          <div className="flex items-center px-7 md:px-8 py-4">
            <span className="font-serif font-bold text-3xl md:text-[2rem] text-anchor">
              {service.price}
            </span>
          </div>

          {/* Select — right */}
          <div className="flex items-center justify-center px-7 md:px-8 py-4 border-l border-canvas group-hover:border-action/30 transition-colors duration-300 ease-in-out">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => openBooking(service.title)}
              className="no-radius bg-anchor text-white border-2 border-transparent px-6 py-3 uppercase tracking-[0.25em] text-[10px] font-semibold inline-flex items-center gap-2.5 hover:bg-white hover:text-action hover:border-action transition-colors duration-300"
            >
              <span>Select</span>
              <ArrowRight02Icon size={14} strokeWidth={1.8} />
            </motion.button>
          </div>
        </div>
      </div>
    </Article>
  );
}

export function Services() {
  const [searchParams] = useSearchParams();
  const initialCategory = (() => {
    const param = searchParams.get('category');
    if (param && (categories as readonly string[]).includes(param)) return param as Category;
    return 'All' as Category;
  })();

  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Sync with URL search param changes (e.g. navigating from a service page CTA)
  useEffect(() => {
    const param = searchParams.get('category');
    if (param && (categories as readonly string[]).includes(param)) {
      setActiveCategory(param as Category);
      setShowAll(false);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? services
        : services.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const desktopVisible = showAll ? filtered : filtered.slice(0, DESKTOP_PREVIEW);
  const hasMore = filtered.length > DESKTOP_PREVIEW;

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setShowAll(false);
    // Reset carousel to first item
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const handleCollapse = () => {
    setShowAll(false);
    // Scroll back to the top of the section
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={sectionRef} id="services" className="py-5 md:py-10 bg-white relative overflow-hidden scroll-mt-24">
      {/* Seamless tiled background — fixed attachment creates parallax as the section scrolls past */}
      <div
        className="absolute inset-0 pointer-events-none bg-scroll lg:bg-fixed"
        style={{
          backgroundImage: "url('/eh_public_assets/backgrounds/tile_pattern.webp')",
          backgroundRepeat: 'repeat',
          backgroundSize: '500px auto',
        }}
      />
      {/* Heavy white wash */}
      <div className="absolute inset-0 pointer-events-none bg-white/88" />
      {/* Top gradient — fades to solid white at the top for text readability, pattern emerges below */}
      <div className="absolute inset-x-0 top-0 h-[280px] md:h-[340px] pointer-events-none bg-gradient-to-b from-white via-white/95 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-anchor/25 to-transparent"></div>

      {/* Header — editorial style, no card */}
      <div className="relative w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mb-6 md:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-0"
        >
          <div>
            <h2 className="font-serif text-5xl md:text-6xl text-anchor whitespace-nowrap">
              TASH Services
            </h2>
          </div>
          <p className="font-sans text-base md:text-lg text-anchor/70 md:text-right max-w-[22rem] leading-relaxed md:mb-1">
            Treatments designed to restore, refine, and elevate your natural aesthetic.
          </p>
        </motion.div>

        {/* Category filters */}
        <LayoutGroup>
          <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="relative no-radius px-5 md:px-6 py-2.5 md:py-3 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold border border-anchor/30 bg-white transition-colors duration-300"
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-category"
                      className="absolute inset-0 bg-anchor"
                      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-anchor hover:text-action'
                    }`}
                  >
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Mobile-only swipe hint */}
        <div className="md:hidden mt-8 flex items-center gap-3 text-anchor/60">
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
      </div>

      {/* DESKTOP GRID */}
      <div className="relative hidden md:block w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {desktopVisible.map((service) => (
            <ServiceCard key={service.title} service={service} plain />
          ))}
        </div>

        {hasMore && (
          <div className="mt-16 flex justify-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => (showAll ? handleCollapse() : setShowAll(true))}
              className="no-radius group inline-flex items-center gap-4 border-2 border-anchor bg-white px-10 py-5 uppercase tracking-[0.25em] text-xs font-semibold text-anchor hover:bg-anchor hover:text-white transition-colors duration-300"
            >
              <span>
                {showAll
                  ? 'Collapse'
                  : `View all ${filtered.length} services`}
              </span>
              <motion.span
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="inline-flex"
              >
                {showAll ? (
                  <ArrowUp01Icon size={18} strokeWidth={2} />
                ) : (
                  <ArrowDown01Icon size={18} strokeWidth={2} />
                )}
              </motion.span>
            </motion.button>
          </div>
        )}
      </div>

      {/* MOBILE CAROUSEL */}
      <div className="relative md:hidden w-full overflow-x-auto pb-6 hide-scrollbar pl-6 snap-x snap-mandatory" ref={carouselRef}>
        <div className="flex gap-6 w-max pr-6">
          {filtered.map((service) => (
            <div
              key={service.title}
              className="snap-center w-[82vw] max-w-[360px] flex"
            >
              <ServiceCard service={service} plain />
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE CAROUSEL DOTS */}
      <CarouselDots
        scrollRef={carouselRef}
        count={filtered.length}
        resetKey={activeCategory}
        maxVisible={7}
        className="relative md:hidden pt-2 pb-2 px-6"
      />

      {/* Category page link — shown when a specific category is active */}
      {activeCategory !== 'All' && categoryRoutes[activeCategory] && (
        <div className="relative mt-6 md:mt-10 flex justify-center px-6">
          <Link
            to={categoryRoutes[activeCategory]!}
            className="no-radius inline-flex items-center gap-3 bg-anchor text-white px-7 py-3.5 hover:bg-action transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-semibold group"
          >
            <span>{categoryLinkLabels[activeCategory] ?? `Explore ${activeCategory}`}</span>
            <ArrowRight02Icon size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </section>
  );
}
