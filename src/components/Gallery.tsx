import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Image02Icon,
  SparklesIcon,
  ArrowRight02Icon,
  ArrowLeft02Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Cancel01Icon,
} from 'hugeicons-react';

type Tile =
  | {
      type: 'image';
      src: string;
      alt: string;
      span: string;
      mobileSpan: string;
    }
  | {
      type: 'placeholder';
      label: string;
      span: string;
      mobileSpan: string;
    };

// Span vocabulary:
//   span       — desktop mosaic. All tiles are row-span-2; only col-span varies
//                (1 or 2). Sequence packs cleanly into both 4-col (lg) and 3-col (md)
//                grids via grid-flow-dense, with no internal gaps.
//   mobileSpan — mobile horizontal mosaic (2 rows fixed, grid-flow-col-dense).
//                Total row×col cells is divisible by 2 so the strip packs perfectly.
//
// Desktop band pattern (each band fills 4 columns = one visual tile row):
//   [1,2,1]  [1,1,2]  [2,1,1]  [1,1,1,1]  [2,2]  [1,1,1,1]  [2,1,1]  [1,1,1,1]  [1,2,1]
//   = 29 tiles, 7 wide accents, 9 bands. First 2 bands = 6 tiles = default collapsed view.

const S1 = 'col-span-1 row-span-2'; // narrow tile
const S2 = 'col-span-2 row-span-2'; // wide tile

// Sequence of desktop col-spans, band by band (for readability only)
const SPANS: string[] = [
  S1, S2, S1,   // band 1
  S1, S1, S2,   // band 2
  S2, S1, S1,   // band 3
  S1, S1, S1, S1, // band 4
  S2, S2,       // band 5
  S1, S1, S1, S1, // band 6
  S2, S1, S1,   // band 7
  S1, S1, S1, S1, // band 8
  S1, S2, S1,   // band 9
];

type ImageSource = {
  type: 'image';
  src: string;
  alt: string;
  mobileSpan: string;
};

const imageSources: ImageSource[] = [
  { type: 'image', src: '/eh_public_assets/gallery/gallery17.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-2 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery18.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-1 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery19.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery20.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery21.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-2 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery22.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery23.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery24.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-1 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery25.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-2 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery26.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery27.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery28.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-1 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery29.webp', alt: 'The Haus, in frames', mobileSpan: 'row-span-1 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery1.webp',  alt: 'Calming spa interior', mobileSpan: 'row-span-2 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery2.webp',  alt: 'Skincare ritual',      mobileSpan: 'row-span-1 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery3.webp',  alt: 'Botanical detail',     mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery4.webp',  alt: 'Treatment room',       mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery5.webp',  alt: 'Cosmedix product flatlay', mobileSpan: 'row-span-2 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery14.webp', alt: 'The Haus moment',      mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery6.webp',  alt: 'Aesthetic moment',     mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery7.webp',  alt: 'Architectural detail', mobileSpan: 'row-span-1 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery8.webp',  alt: 'Lash close-up',        mobileSpan: 'row-span-2 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery9.webp',  alt: 'Hands at work',        mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery16.webp', alt: 'Studio detail',        mobileSpan: 'row-span-1 col-span-1' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery10.webp', alt: 'Tooth gem detail',     mobileSpan: 'row-span-1 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery11.webp', alt: 'Brow lamination',      mobileSpan: 'row-span-2 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery12.webp', alt: 'Ambient haus',         mobileSpan: 'row-span-1 col-span-2' },
  { type: 'image', src: '/eh_public_assets/Cosmedix_section_asset.webp', alt: 'Cosmedix essentials', mobileSpan: 'row-span-1 col-span-2' },
  { type: 'image', src: '/eh_public_assets/gallery/gallery13.webp', alt: 'Closing moment',       mobileSpan: 'row-span-1 col-span-2' },
];

const tiles: Tile[] = imageSources.map((img, i) => ({
  ...img,
  span: SPANS[i],
}));

function ImageTile({
  src,
  alt,
  span,
  onClick,
}: {
  src: string;
  alt: string;
  span: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 22 }}
      className={`group relative overflow-hidden border border-micro/20 no-radius cursor-zoom-in bg-canvas ${span}`}
      aria-label={`View ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-anchor/0 group-hover:bg-anchor/15 transition-colors duration-500 pointer-events-none"></div>
    </motion.button>
  );
}

// Derive the full-resolution variant used by the lightbox from a tile src.
// Gallery photos ship two versions: a small tile (galleryN.webp) and a larger
// lightbox-ready version (galleryN@full.webp). Non-gallery images only have
// one size, so we return the original src unchanged for those.
function fullSrcFor(src: string): string {
  if (src.includes('/gallery/') && src.endsWith('.webp')) {
    return src.replace(/\.webp$/, '@full.webp');
  }
  return src;
}

function PlaceholderTile({ label, span }: { label: string; span: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 22 }}
      className={`relative overflow-hidden border border-anchor/20 no-radius ${span}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-canvas via-identity/30 to-canvas flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 20%, #5C2828 0%, transparent 50%), radial-gradient(circle at 70% 80%, #334D12 0%, transparent 50%)',
          }}
        />
        <div className="relative flex flex-col items-center gap-2 text-anchor/40">
          <Image02Icon size={28} strokeWidth={1.25} />
          <span className="font-serif italic text-[11px] tracking-[0.2em] uppercase">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Flat list of just real images, in display order — used by the lightbox for navigation.
const galleryImages = tiles.filter((t): t is Extract<Tile, { type: 'image' }> => t.type === 'image');

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = galleryImages[index];
  const fullSrc = fullSrcFor(image.src);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  // Preload the next and previous full-res images so swiping feels instant.
  useEffect(() => {
    const len = galleryImages.length;
    const neighbors = [
      galleryImages[(index + 1) % len],
      galleryImages[(index - 1 + len) % len],
    ];
    const preloaders = neighbors.map((n) => {
      const img = new Image();
      img.src = fullSrcFor(n.src);
      return img;
    });
    return () => {
      // Release references so the browser can GC if it wants to.
      preloaders.forEach((p) => { p.src = ''; });
    };
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] bg-anchor/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
    >
      {/* Image — drag directly on the visible element, dragSnapToOrigin for auto spring-back */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.6}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          const SWIPE = 60;
          const V = 300;
          if (info.offset.x < -SWIPE || info.velocity.x < -V) onNext();
          else if (info.offset.x > SWIPE || info.velocity.x > V) onPrev();
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
      >
        <img
          src={fullSrc}
          alt={image.alt}
          draggable={false}
          decoding="async"
          className="max-w-full max-h-[85vh] object-contain border border-white/20 shadow-[12px_12px_0px_rgba(0,0,0,0.25)] pointer-events-none select-none"
        />
      </motion.div>

      {/* Controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur border border-white/30 text-white hover:bg-white hover:text-anchor transition-colors duration-200"
      >
        <Cancel01Icon size={20} strokeWidth={2} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-white/10 backdrop-blur border border-white/30 text-white hover:bg-white hover:text-anchor transition-colors duration-200"
      >
        <ArrowLeft02Icon size={20} strokeWidth={2} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-white/10 backdrop-blur border border-white/30 text-white hover:bg-white hover:text-anchor transition-colors duration-200"
      >
        <ArrowRight02Icon size={20} strokeWidth={2} />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-white/70 uppercase tracking-[0.25em] text-[10px] font-semibold pointer-events-none">
        {String(index + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
      </div>
    </motion.div>
  );
}

// Collapsed desktop height = 2 tile rows. Each tile is row-span-2 and auto-rows
// are 120px (md) / 140px (lg) with gap-3 (12px) between rows:
//   md: 4*120 + 3*12 = 516px
//   lg: 4*140 + 3*12 = 596px
// These values live in the max-h Tailwind classes below.

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Helper that takes a tile and returns the index of that image in galleryImages
  const openTile = (tile: Tile) => {
    if (tile.type !== 'image') return;
    const idx = galleryImages.findIndex((g) => g.src === tile.src);
    if (idx >= 0) setOpenIndex(idx);
  };

  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
  const next = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % galleryImages.length));

  return (
    <section id="gallery" className="py-20 md:py-20 bg-white border-t border-micro/20 scroll-mt-24">
      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="mb-12 md:mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-4 text-action">
            <SparklesIcon size={18} strokeWidth={1.5} />
            <span className="uppercase tracking-[0.25em] text-[11px] font-semibold">
              The Haus, in Frames
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-anchor">Gallery</h2>
        </motion.div>

        {/* DESKTOP — vertical mosaic (collapsible) */}
        <div className="hidden md:block">
          <div
            className={`relative overflow-hidden transition-[max-height] duration-500 ease-out ${
              expanded ? 'max-h-[9999px]' : 'max-h-[516px] lg:max-h-[596px]'
            }`}
          >
            <div className="grid md:grid-cols-3 lg:grid-cols-4 auto-rows-[120px] lg:auto-rows-[140px] grid-flow-dense gap-2 md:gap-3">
              {tiles.map((tile, i) =>
                tile.type === 'image' ? (
                  <ImageTile
                    key={i}
                    src={tile.src}
                    alt={tile.alt}
                    span={tile.span}
                    onClick={() => openTile(tile)}
                  />
                ) : (
                  <PlaceholderTile key={i} label={tile.label} span={tile.span} />
                )
              )}
            </div>
            {/* Bottom fade when collapsed */}
            {!expanded && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
            )}
          </div>

          {/* Expand / collapse toggle */}
          <div className="mt-6 flex justify-center">
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setExpanded((v) => !v)}
              className="group inline-flex items-center gap-3 border border-anchor/30 bg-white text-anchor px-8 py-3 no-radius uppercase tracking-[0.22em] text-[11px] font-semibold hover:bg-anchor hover:text-white transition-colors duration-300"
            >
              <span>{expanded ? 'Show less' : 'View full gallery'}</span>
              <span
                className={`inline-flex transition-transform ${
                  expanded ? 'group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'
                }`}
              >
                {expanded ? (
                  <ArrowUp01Icon size={16} strokeWidth={1.75} />
                ) : (
                  <ArrowDown01Icon size={16} strokeWidth={1.75} />
                )}
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* MOBILE — horizontal scrolling mosaic */}
      <div className="md:hidden">
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
        <div className="w-full overflow-x-auto hide-scrollbar pl-6">
          <div className="grid grid-rows-2 grid-flow-col-dense auto-cols-[36vw] gap-2 w-max pr-6 h-[52vh] max-h-[440px]">
            {tiles.map((tile, i) =>
              tile.type === 'image' ? (
                <ImageTile
                  key={`m-${i}`}
                  src={tile.src}
                  alt={tile.alt}
                  span={tile.mobileSpan}
                  onClick={() => openTile(tile)}
                />
              ) : (
                <PlaceholderTile
                  key={`m-${i}`}
                  label={tile.label}
                  span={tile.mobileSpan}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox index={openIndex} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </section>
  );
}
