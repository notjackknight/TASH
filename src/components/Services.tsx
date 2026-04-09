import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { ArrowRight02Icon, ArrowDown01Icon, ArrowUp01Icon, SparklesIcon } from 'hugeicons-react';
import { CarouselDots } from './CarouselDots';

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

const services: Service[] = [
  // ─── Top picks (cross-category, for "All" preview) ───────
  {
    title: 'The Signature Haus Facial',
    desc: 'A luxurious, customized skincare service designed to address individual needs through professional-grade treatments and deep relaxation. A balanced approach to skin health, suitable for all skin types.',
    price: '$100',
    category: 'Facials',
  },
  {
    title: 'Classic Haus Fill',
    desc: 'Must have 50% or more lashes on to be considered a fill.',
    price: '$75',
    category: 'Lashes',
  },
  {
    title: 'The Haus Brow Wax',
    desc: 'Precise shaping and definition for a clean, polished look. Gentle techniques ensure easy removal and long-lasting results, customized to enhance your facial features.',
    price: '$28',
    category: 'Brows',
  },

  // ─── Facials (popularity order) ──────────────────────────
  {
    title: 'Hydraglow Haus Facial',
    desc: 'Combines advanced hydration via our hydro-facial machine with rejuvenating skincare to leave your skin glowing and refreshed. Add on the Hydra-Plane Haus Facial to level up the glow and rejuvenation.',
    price: '$160',
    category: 'Facials',
  },
  {
    title: 'The Dermaplane Haus Facial',
    desc: 'A gentle yet powerful treatment that exfoliates the skin by removing dead skin cells and peach fuzz, leaving your complexion instantly smoother, brighter, and glowing — with enhanced product absorption and flawless makeup application.',
    price: '$130',
    category: 'Facials',
  },
  {
    title: 'Brightening Haus Facial',
    desc: 'Designed to restore radiance and even skin tone. Uses gentle exfoliants and molecular peels from Cosmedix to correct hyperpigmentation, dullness, and discoloration — leaving your complexion smooth, refreshed, and visibly glowing.',
    price: '$135',
    category: 'Facials',
  },
  {
    title: 'Acne Haus Detox Facial',
    desc: 'A targeted skincare service designed to deeply cleanse pores, rejuvenate skin, and combat blemishes. A customized facial plan to help you achieve a refreshed, clarified complexion.',
    price: '$150',
    category: 'Facials',
  },
  {
    title: 'Haus Express Facial',
    desc: 'Designed for quick yet effective skin rejuvenation, leaving your skin feeling fresh and revitalized in minimal time. The perfect facial for those on a tight schedule wanting professional care and convenience in one appointment.',
    price: '$85',
    category: 'Facials',
  },
  {
    title: 'Calm Haus Facial',
    desc: 'A personalized skincare service using Cosmedix to nourish your skin with their premium ingredients. Leaving the haus soothed, hydrated, and radiant.',
    price: '$120',
    category: 'Facials',
  },
  {
    title: 'Timeless Haus Facial',
    desc: 'A rejuvenating service designed to target signs of aging while providing deep hydration using Cosmedix custom ingredients. Hydrogen-oxygen infusion deeply hydrates and energizes the skin, ultrasonic and hydro exfoliation gently remove dead skin cells, and galvanic or high-frequency therapy stimulates circulation. Red LED light therapy supports collagen production and skin tightening — restoring a smoother, firmer, more youthful complexion.',
    price: '$165',
    category: 'Facials',
  },
  {
    title: 'Haus Hydrogen Oxygen Facial',
    desc: 'A rejuvenating treatment that infuses the skin with hydrogen-rich oxygen to deeply hydrate, refresh, and revitalize the complexion. Helps neutralize free radicals, improve circulation, and enhance radiance — leaving the skin plumper, smoother, and more youthful.',
    price: '$150',
    category: 'Facials',
  },
  {
    title: 'Haus Back Facial',
    desc: 'A nourishing treatment designed to deeply cleanse and rejuvenate the skin on your back. Promotes hydration, clarity, and skin health — ideal for a refreshed and polished appearance.',
    price: '$105',
    category: 'Facials',
  },

  // ─── Lashes (popularity order) ───────────────────────────
  {
    title: 'Haus Wispy Dream Fill',
    desc: 'Must have 50% or more lashes on to be considered a fill.',
    price: '$60',
    category: 'Lashes',
  },
  {
    title: 'The Haus of Wispy Dreams Full Set',
    desc: 'A luxurious lash set inspired by a mix of hybrid and classic styles, creating a gentle, fluffy fullness that\u2019s customized just for you.',
    price: '$150',
    category: 'Lashes',
  },
  {
    title: 'Classic Haus Full Set',
    desc: 'Enhances your natural lashes with a clean, subtle finish. Customized and tailored to complement your beautiful features.',
    price: '$200',
    category: 'Lashes',
  },
  {
    title: 'Signature Haus Lash Lift + Tint',
    desc: 'Take your natural lashes to the next level. Instant results with a lifted, curled appearance.',
    price: '$114',
    category: 'Lashes',
  },
  {
    title: 'The Power Haus Fill',
    desc: 'You need to have at least 50% of your lashes to be considered a fill.',
    price: '$90',
    category: 'Lashes',
  },
  {
    title: 'The Power Haus Volume Full Set',
    desc: 'No mega volumes in this haus — but definitely some power and dramatic lashes to create a gorgeously fluffy set.',
    price: '$200',
    category: 'Lashes',
  },
  {
    title: 'The Haus Korean Lash Lift',
    desc: 'Experience the next level of lash enhancement. A premium treatment designed to nourish, lift, and define your natural lashes using advanced Korean lash technology — delivering a soft, natural curl with a glossy, healthy finish while prioritizing lash strength and integrity. Perfect for all lash types, with minimal maintenance and long-lasting results. No extensions, no mascara required.',
    price: '$125',
    category: 'Lashes',
  },
  {
    title: 'Mini Haus Lash Touch Up',
    desc: 'The Esthetic Haus created mini fills for those who need a tiny refresh or want to add on more lashes but aren\u2019t quite ready for a full fill.',
    price: 'Variable',
    category: 'Lashes',
  },
  {
    title: 'Signature Haus Lash Tint',
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
    title: 'Brow Code Haus Brow Tint',
    desc: 'Enhance your natural brows with long-lasting color, tailored to complement your features.',
    price: '$20',
    category: 'Brows',
  },
  {
    title: 'Signature Haus Brow Lamination',
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
    title: 'Microneedling Treatment',
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
    title: 'The Haus of LED Therapy',
    desc: 'A non-invasive skin treatment that uses different colors of light to help heal skin, reduce acne, calm inflammation, and boost collagen — safe, gentle, and painless. Available as an add-on or stand-alone service. As a stand-alone, it includes a double cleanse, skin analysis, toning, mask, and LED.',
    price: '$105',
    category: 'Advanced',
  },
  {
    title: 'Haus Scalp Treatment & Massage',
    desc: 'A deep scalp reset designed to cleanse, stimulate, and get your crown back in alignment. Luxe scalp treatment plus a stress-melting massage for healthy roots and total relaxation.',
    price: '$60',
    category: 'Advanced',
  },
  {
    title: 'Haus of Hydrated Lip Mask',
    desc: 'Provides intensive hydration and nourishment for your lips. Add it on to a service or enjoy as a stand-alone treatment.',
    price: '$15',
    category: 'Advanced',
  },

  // ─── Waxing (popularity order) ───────────────────────────
  {
    title: 'Haus Lip Wax',
    desc: 'Precise hair removal for smooth, well-defined lips. Quick, effective, and easy to add to any appointment.',
    price: '$10',
    category: 'Waxing',
  },
  {
    title: 'Haus Face Wax',
    desc: 'Brow, lip, chin, and sideburns — all in one polished service.',
    price: '$50',
    category: 'Waxing',
  },
  {
    title: 'The Haus Underarm Wax',
    desc: 'Quick, effective hair removal for smooth, clean underarms. Leaves skin feeling fresh, soft, and polished with long-lasting results.',
    price: '$40',
    category: 'Waxing',
  },
  {
    title: 'The Haus Full Leg Wax',
    desc: 'A thorough and precise hair removal treatment from ankle to thigh, leaving skin smooth and silky. Ideal for those seeking a professional and efficient hair removal solution.',
    price: '$110',
    category: 'Waxing',
  },
  {
    title: 'Haus Half Leg Wax',
    desc: 'Efficient hair removal from the knee down for smooth, long-lasting results. Suitable for all skin types and a consistently polished appearance.',
    price: '$80',
    category: 'Waxing',
  },
  {
    title: 'The Haus Full Arm Wax',
    desc: 'Removes unwanted hair from shoulder to wrist, leaving your arms smooth, clean, and polished. Quick and effective with long-lasting results and a flawless finish.',
    price: '$95',
    category: 'Waxing',
  },
  {
    title: 'Haus Stomach Wax',
    desc: 'A precise and efficient stomach waxing service designed to provide smooth, hair-free skin.',
    price: '$75',
    category: 'Waxing',
  },

  // ─── Finishing Touches (popularity order) ────────────────
  {
    title: 'Custom Haus Spray Tan',
    desc: 'A custom, natural-looking tan using premium Norvell solutions for even application and long-lasting results. Tailored to your skin tone for a flawless, sun-kissed glow.',
    price: '$60',
    category: 'Finishing',
  },
  {
    title: 'Pearly White Haus Teeth Whitening',
    desc: 'A professional, appointment-based service designed to help you achieve a brighter, more confident smile. Fast, effective whitening tailored to your needs in a comfortable setting — three rounds for a flat fee, with all the same products you\u2019d find at a dental office.',
    price: '$200',
    category: 'Finishing',
  },
  {
    title: 'The Haus of Gems',
    desc: 'Tooth gems made with authentic Swarovski crystals, designed to add a subtle sparkle or bold shine to your smile. Professionally applied with safe dental-grade adhesive — comfortable, non-invasive, and lasting over a year with proper care. Stylish, durable, and removable by a professional.',
    price: '$70 / gem',
    category: 'Finishing',
  },
];

const DESKTOP_PREVIEW = 3;
const READ_MORE_THRESHOLD = 140;

function ServiceCard({ service, plain = false }: { service: Service; plain?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = service.desc.length > READ_MORE_THRESHOLD;
  const shortDesc = isLong
    ? service.desc.slice(0, READ_MORE_THRESHOLD).trimEnd() + '\u2026'
    : service.desc;

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
      className="group relative flex flex-col bg-white border border-micro/20 no-radius overflow-hidden hover:border-anchor/60 transition-colors duration-300"
    >
      {/* Image / placeholder — top 50% */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-micro/15 bg-gradient-to-br from-canvas via-identity/30 to-canvas">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-serif italic text-anchor/30 text-2xl tracking-widest">
            the haus
          </div>
        </div>
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm border border-anchor/20 uppercase tracking-[0.18em] text-[10px] font-semibold text-anchor">
          {service.category}
        </div>
      </div>

      {/* Content — bottom 50% */}
      <div className="flex-1 flex flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-serif text-2xl md:text-[1.6rem] leading-tight text-anchor">
            {service.title}
          </h3>
          <span className="font-serif text-3xl md:text-4xl text-action whitespace-nowrap pt-1">
            {service.price}
          </span>
        </div>

        <div className="text-anchor/70 text-sm leading-relaxed mb-6 flex-1">
          <motion.p layout="position">
            {expanded || !isLong ? service.desc : shortDesc}
          </motion.p>
          {isLong && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 text-[#b54545] uppercase tracking-[0.18em] text-[10px] font-semibold hover:text-[#8a2f2f] transition-colors"
            >
              {expanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="no-radius w-full bg-anchor text-white border-2 border-transparent py-4 uppercase tracking-[0.25em] text-xs font-semibold hover:bg-white hover:text-action hover:border-action transition-colors duration-300 flex items-center justify-center gap-3"
        >
          <span>Select</span>
          <ArrowRight02Icon size={16} strokeWidth={2} />
        </motion.button>
      </div>
    </Article>
  );
}

export function Services() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} id="services" className="py-16 md:py-20 bg-white relative overflow-hidden scroll-mt-24">
      {/* Seamless tiled background — fixed attachment creates parallax as the section scrolls past */}
      <div
        className="absolute inset-0 pointer-events-none bg-scroll md:bg-fixed"
        style={{
          backgroundImage: "url('/eh_public_assets/backgrounds/tile_pattern.webp')",
          backgroundRepeat: 'repeat',
          backgroundSize: '500px auto',
        }}
      />
      {/* Heavy white wash */}
      <div className="absolute inset-0 pointer-events-none bg-white/88" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-anchor/25 to-transparent"></div>

      {/* Header */}
      <div className="relative w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="inline-block bg-white border border-anchor/20 shadow-[8px_8px_0px_rgba(92,40,40,0.10)] md:shadow-[12px_12px_0px_rgba(92,40,40,0.10)] px-6 py-6 md:px-10 md:py-8 max-w-full"
        >
          <div className="flex items-center gap-3 mb-4 text-action">
            <SparklesIcon size={18} strokeWidth={1.5} />
            <span className="uppercase tracking-[0.25em] text-[11px] font-semibold">
              The Menu
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-anchor mb-6 whitespace-nowrap">
            The Haus Services
          </h2>
          <p className="font-sans text-lg text-anchor/70 max-w-xl">
            Curated treatments designed to restore, refine, and elevate your natural aesthetic.
          </p>
        </motion.div>

        {/* Category filters */}
        <LayoutGroup>
          <div className="mt-10 md:mt-12 flex flex-wrap gap-2 md:gap-3">
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
      <div ref={carouselRef} className="relative md:hidden w-full overflow-x-auto pb-6 hide-scrollbar pl-6 snap-x snap-mandatory">
        <div className="flex gap-6 w-max pr-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => (
              <div
                key={service.title}
                className="snap-center w-[82vw] max-w-[360px] flex"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE CAROUSEL DOTS */}
      <CarouselDots
        scrollRef={carouselRef}
        count={filtered.length}
        resetKey={activeCategory}
        maxVisible={7}
        className="relative md:hidden pt-2 pb-2"
      />
    </section>
  );
}
