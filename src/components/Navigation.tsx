import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar03Icon,
  Menu02Icon,
  Cancel01Icon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
  LinkSquare02Icon,
  FavouriteIcon,
  Tick02Icon,
  Award02Icon,
} from 'hugeicons-react';
import { useBooking } from '../hooks/useBooking';

type ModalKey = 'affiliate' | 'refer' | null;

type MenuItem = { label: string } & (
  | { href: string }
  | { modal: Exclude<ModalKey, null> }
);

const menuItems: MenuItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Gifts', href: '#gifts' },
  { label: 'Cosmedix', modal: 'affiliate' },
  { label: 'Refer', modal: 'refer' },
];

export function Navigation() {
  const { openBooking } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalKey>(null);

  // Close on Esc + lock body scroll when mobile menu open
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const handleItemClick = (item: MenuItem) => {
    setMenuOpen(false);
    if ('modal' in item) {
      // Slight delay so the mobile menu closes first
      setTimeout(() => setModal(item.modal), 50);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full pt-safe bg-anchor border-b border-micro/10">
        <div className="w-full pl-4 pr-1 md:px-10 lg:px-16 xl:px-20 h-24 md:h-24 grid grid-cols-[auto_1fr_auto] items-center gap-2 md:gap-6">
          {/* LEFT — Logo */}
          <a href="/" className="flex items-center" aria-label="The Esthetic Haus — Home">
            <img
              src="/eh_public_assets/Logo/EH_Logo.png"
              alt="The Esthetic Haus"
              fetchPriority="high"
              decoding="async"
              className="h-14 md:h-16 lg:h-20 w-auto object-contain"
            />
          </a>

          {/* CENTER — Section menu (desktop only) */}
          <ul className="hidden md:flex items-center justify-center gap-6 lg:gap-10">
            {menuItems.map((item) => {
              const linkClass =
                'group relative uppercase tracking-[0.22em] text-[11px] font-semibold text-white/85 hover:text-white transition-colors duration-300';
              const underline = (
                <span className="absolute left-0 -bottom-1.5 w-0 h-px bg-white group-hover:w-full transition-[width] duration-300"></span>
              );
              return (
                <li key={item.label}>
                  {'href' in item ? (
                    <a href={item.href} className={linkClass}>
                      {item.label}
                      {underline}
                    </a>
                  ) : (
                    <button onClick={() => setModal(item.modal)} className={linkClass}>
                      {item.label}
                      {underline}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {/* RIGHT — Account / actions */}
          <div className="flex items-center justify-end gap-4 md:gap-5 text-white">
            {/* Desktop My Appointments (only when URL configured) + Book Now */}
            {import.meta.env.VITE_SQUARE_BOOKING_URL && (
              <>
                <a
                  href={import.meta.env.VITE_SQUARE_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex hover:text-canvas transition-colors duration-300 items-center gap-2 uppercase tracking-widest text-xs font-medium"
                >
                  <Calendar03Icon size={20} strokeWidth={1.5} />
                  <span>My Appointments</span>
                </a>
                <div className="hidden md:block w-px h-4 bg-white/30" />
              </>
            )}
            <button
              onClick={() => openBooking()}
              className="hidden md:flex no-radius bg-action text-white px-5 py-2.5 hover:bg-white hover:text-action transition-colors duration-300 items-center gap-2 uppercase tracking-widest text-xs font-semibold"
            >
              <span>Book Now</span>
              <ArrowRight02Icon size={14} strokeWidth={2} />
            </button>

            {/* Mobile Book Now */}
            <button
              aria-label="Book Now"
              onClick={() => openBooking()}
              className="md:hidden p-2 hover:text-canvas transition-colors"
            >
              <Calendar03Icon size={22} strokeWidth={1.5} />
            </button>

            {/* Mobile hamburger — rightmost */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2 hover:text-canvas transition-colors"
            >
              <Menu02Icon size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-anchor/10 pt-safe">
              <span className="font-serif text-lg tracking-widest uppercase text-anchor">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center text-anchor hover:text-action transition-colors"
              >
                <Cancel01Icon size={22} strokeWidth={1.75} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 overflow-y-auto py-6">
              <ul className="flex flex-col gap-1">
                {menuItems.map((item, i) => {
                  const content = (
                    <>
                      <span className="font-serif text-3xl text-anchor group-hover:italic transition-all duration-300">
                        {item.label}
                      </span>
                      <span className="font-serif italic text-sm text-anchor/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </>
                  );
                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1 + i * 0.04,
                        type: 'spring',
                        stiffness: 120,
                        damping: 20,
                      }}
                    >
                      {'href' in item ? (
                        <a
                          href={item.href}
                          onClick={() => handleItemClick(item)}
                          className="group flex items-baseline justify-between py-4 border-b border-anchor/10"
                        >
                          {content}
                        </a>
                      ) : (
                        <button
                          onClick={() => handleItemClick(item)}
                          className="group w-full flex items-baseline justify-between py-4 border-b border-anchor/10 text-left"
                        >
                          {content}
                        </button>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="px-8 pb-10 pt-6 border-t border-anchor/10 flex items-center justify-between text-anchor">
              {import.meta.env.VITE_SQUARE_BOOKING_URL && (
                <a
                  href={import.meta.env.VITE_SQUARE_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 uppercase tracking-widest text-xs font-medium hover:text-action transition-colors"
                >
                  <Calendar03Icon size={18} strokeWidth={1.5} />
                  <span>My Appointments</span>
                </a>
              )}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openBooking();
                }}
                className="no-radius bg-anchor text-white px-5 py-3 flex items-center gap-2 uppercase tracking-widest text-xs font-semibold hover:bg-action transition-colors"
              >
                <span>Book Now</span>
                <ArrowRight02Icon size={14} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {modal === 'affiliate' && (
          <Modal onClose={() => setModal(null)}>
            <AffiliateContent onClose={() => setModal(null)} />
          </Modal>
        )}
        {modal === 'refer' && (
          <Modal onClose={() => setModal(null)}>
            <ReferContent onClose={() => setModal(null)} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Shared Modal scaffold ─────────────────────────────────
function Modal({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-anchor/70 backdrop-blur-sm flex items-stretch md:items-center justify-center md:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:max-w-3xl bg-white border border-anchor/20 shadow-[12px_12px_0px_rgba(92,40,40,0.18)] overflow-y-auto max-h-screen md:max-h-[90vh] no-radius"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center bg-white border border-anchor/30 text-anchor hover:bg-anchor hover:text-white transition-colors duration-200"
        >
          <Cancel01Icon size={18} strokeWidth={2} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

// ─── Affiliate modal content ───────────────────────────────
function AffiliateContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6 md:p-12">
      <div className="flex items-center gap-3 mb-3 text-action">
        <LinkSquare02Icon size={18} strokeWidth={1.5} />
        <span className="uppercase tracking-[0.25em] text-[11px] font-semibold">
          Clinical Skincare Partner
        </span>
      </div>
      <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] text-anchor mb-5">
        The Cosmedix
        <br />
        <span className="italic font-light">Affiliate Portal.</span>
      </h2>
      <p className="font-sans text-anchor/80 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
        Cosmedix is our trusted clinical skincare line — pharmaceutical-grade formulations curated by The Esthetic Haus for at-home maintenance between treatments. Shop directly through our portal for member pricing and authentic product.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
        {[
          {
            Icon: Award02Icon,
            title: 'Clinical Grade',
            desc: 'Pharmaceutical-grade formulations selected for results, not marketing.',
          },
          {
            Icon: Tick02Icon,
            title: 'Curated by Us',
            desc: 'Every product personally vetted by The Esthetic Haus team.',
          },
          {
            Icon: LinkSquare02Icon,
            title: 'Direct Access',
            desc: 'Authenticated portal with member pricing and exclusive bundles.',
          },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="border-l-2 border-action pl-4">
            <div className="text-action mb-3">
              <Icon size={22} strokeWidth={1.5} />
            </div>
            <div className="font-serif text-lg text-anchor mb-1">{title}</div>
            <p className="text-xs text-anchor/70 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-anchor/15">
        <span className="font-serif italic text-anchor/60 text-sm">
          Powered by Cosmedix
        </span>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="no-radius bg-anchor text-white border-2 border-transparent px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold inline-flex items-center justify-center gap-3 hover:bg-white hover:text-action hover:border-action transition-colors duration-300"
        >
          <span>Visit the Portal</span>
          <ArrowUpRight01Icon size={14} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

// ─── Refer modal content ───────────────────────────────────
function ReferContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6 md:p-12">
      <div className="flex items-center gap-3 mb-3 text-action">
        <FavouriteIcon size={18} strokeWidth={1.5} />
        <span className="uppercase tracking-[0.25em] text-[11px] font-semibold">
          $50 for you · $50 for them
        </span>
      </div>
      <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] text-anchor mb-5">
        Refer a
        <br />
        <span className="italic font-light">Haus Bestie.</span>
      </h2>
      <p className="font-sans text-anchor/80 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
        Share the haus with someone you love. When they book their first treatment, you both receive $50 in credit toward your next visit. Effortless. Generous. On the haus.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
        {[
          {
            n: '01',
            title: 'Get Your Link',
            desc: 'Generate a unique referral link tied to your account.',
          },
          {
            n: '02',
            title: 'Share It',
            desc: 'Send to a friend, post it, slip it into a text — your call.',
          },
          {
            n: '03',
            title: 'Both Glow',
            desc: 'They book, you both receive $50 in haus credit.',
          },
        ].map((step) => (
          <div key={step.n} className="border-l-2 border-action pl-4">
            <div className="font-serif italic text-action text-sm mb-2">{step.n}</div>
            <div className="font-serif text-lg text-anchor mb-1">{step.title}</div>
            <p className="text-xs text-anchor/70 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-anchor/15">
        <span className="font-serif italic text-anchor/60 text-sm">
          Sign in to generate your link
        </span>
        <button
          onClick={onClose}
          className="no-radius bg-anchor text-white border-2 border-transparent px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold inline-flex items-center justify-center gap-3 hover:bg-white hover:text-action hover:border-action transition-colors duration-300"
        >
          <span>Get Started</span>
          <ArrowRight02Icon size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
