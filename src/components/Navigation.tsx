import { useEffect, useState, type ReactNode } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar03Icon,
  Call02Icon,
  Menu02Icon,
  Cancel01Icon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
  LinkSquare02Icon,
  FavouriteIcon,
  Tick02Icon,
  Award02Icon,
} from 'hugeicons-react';


type ModalKey = 'affiliate' | 'refer' | null;

type MenuItem = { label: string } & (
  | { hash: string }
  | { to: string }
  | { modal: Exclude<ModalKey, null> }
);

const menuItems: MenuItem[] = [
  { label: 'Services', hash: '#services' },
  { label: 'Packages', hash: '#packages' },
  { label: 'Gallery', hash: '#gallery' },
  { label: 'About', to: '/greensboro-med-spa' },
  { label: 'Gifts', hash: '#gifts' },
  { label: 'Cosmedix', modal: 'affiliate' },
  { label: 'Refer', modal: 'refer' },
];

function resolveHash(hash: string, isHome: boolean): string {
  return isHome ? hash : `/${hash}`;
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalKey>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

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
          <Link to="/" className="flex items-center" aria-label="The Esthetic Haus — Home">
            <img
              src="/eh_public_assets/Logo/EH_Logo.webp"
              alt="The Esthetic Haus"
              fetchPriority="high"
              decoding="async"
              className="h-14 md:h-16 lg:h-20 w-auto object-contain"
            />
          </Link>

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
                  {'hash' in item ? (
                    <a href={resolveHash(item.hash, isHome)} className={linkClass}>
                      {item.label}
                      {underline}
                    </a>
                  ) : 'to' in item ? (
                    <Link to={item.to} className={linkClass}>
                      {item.label}
                      {underline}
                    </Link>
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
          <div className="flex items-center justify-end gap-1 md:gap-5 text-white">
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
              onClick={() => navigate('/#services')}
              className="hidden md:flex no-radius bg-gradient-to-b from-white to-[#d4cdc1] text-anchor px-5 py-4 hover:from-action hover:to-action hover:text-white transition-all duration-300 items-center gap-2 uppercase tracking-widest text-xs font-bold"
            >
              <span>Book Now</span>
              <ArrowRight02Icon size={14} strokeWidth={2} />
            </button>

            {/* Mobile Call */}
            <a
              href="tel:9146181809"
              aria-label="Call us"
              className="md:hidden p-1.5 hover:text-canvas transition-colors"
            >
              <Call02Icon size={26} strokeWidth={1.5} />
            </a>

            {/* Mobile hamburger — rightmost */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-1.5 hover:text-canvas transition-colors"
            >
              <Menu02Icon size={28} strokeWidth={1.5} />
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
                      {'hash' in item ? (
                        <a
                          href={resolveHash(item.hash, isHome)}
                          onClick={() => handleItemClick(item)}
                          className="group flex items-baseline justify-between py-4 border-b border-anchor/10"
                        >
                          {content}
                        </a>
                      ) : 'to' in item ? (
                        <Link
                          to={item.to}
                          onClick={() => handleItemClick(item)}
                          className="group flex items-baseline justify-between py-4 border-b border-anchor/10"
                        >
                          {content}
                        </Link>
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
                  setTimeout(() => {
                    if (location.pathname === '/') {
                      const el = document.getElementById('services');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      navigate('/#services');
                    }
                  }, 300);
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
          href="https://www.cosmedix.com/?utm_campaign=eyJtZXJjaGlkIjoiMGY0YTRlZmQwYmQ2ZmY4ODQ3MDlkZDM0OGQ3M2Y1Y2IiLCJ1c2VyaWQiOiIzNzk3NiIsImJvYXJkaWQiOiIyNzgxMDIwIiwidHJhY2tpZCI6IjMwMjQ4ODAiLCJpc3Nob3B1cmwiOiJ0cnVlIn0%3D&utm_source=replika&utm_medium=replika&NULL&replika_key=0f4a4efd0bd6ff884709dd348d73f5cb&replika_param=eyJtZXJjaGlkIjoiMGY0YTRlZmQwYmQ2ZmY4ODQ3MDlkZDM0OGQ3M2Y1Y2IiLCJ1c2VyaWQiOiIzNzk3NiIsImJvYXJkaWQiOiIyNzgxMDIwIiwidHJhY2tpZCI6IjMwMjQ4ODAiLCJpc3Nob3B1cmwiOiJ0cnVlIn0%3D#PageName=shop-teh"
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
          Referral Reward
        </span>
      </div>
      <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] text-anchor mb-5">
        Glow together,
        <br />
        <span className="italic font-light">the Haus way.</span>
      </h2>
      <p className="font-sans text-anchor/80 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
        When you refer a friend or family member, you both receive 15% off your next service of $50 or more. Because glowing is always better together.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
        {[
          {
            n: '01',
            title: 'Spread the Word',
            desc: 'Tell a friend or family member about The Esthetic Haus.',
          },
          {
            n: '02',
            title: 'They Book',
            desc: 'Your referral books their first treatment and mentions your name.',
          },
          {
            n: '03',
            title: 'You Both Save',
            desc: '15% off your next service of $50+ — for both of you.',
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
          Just mention your referral at your next visit
        </span>
        <button
          onClick={onClose}
          className="no-radius bg-anchor text-white border-2 border-transparent px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold inline-flex items-center justify-center gap-3 hover:bg-white hover:text-action hover:border-action transition-colors duration-300"
        >
          <span>Got It</span>
          <ArrowRight02Icon size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
