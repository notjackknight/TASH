import { Link } from 'react-router';
import {
  SparklesIcon,
  EyeIcon,
  QuillWrite01Icon,
  DiamondIcon,
  FeatherIcon,
  Sun03Icon,
  ArrowRight02Icon,
  Location04Icon,
} from 'hugeicons-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';


const serviceCategories = [
  { name: 'Facials', icon: SparklesIcon, to: '/services/facials' },
  { name: 'Lashes', icon: EyeIcon, to: '/services/lashes' },
  { name: 'Brows', icon: QuillWrite01Icon, to: '/services/brows' },
  { name: 'Advanced', icon: DiamondIcon, to: '/services/microneedling' },
  { name: 'Waxing', icon: FeatherIcon, to: '/#services' },
  { name: 'Finishing', icon: Sun03Icon, to: '/services/teeth-whitening' },
];

export default function GreensboroMedSpaPage() {
  return (
    <>
      <SEOHead
        title="About The Esthetic Haus | Skincare Studio in Greensboro, NC"
        description="The Esthetic Haus by Natasha is a licensed esthetician studio in Greensboro, NC specializing in customized facials, lash extensions, brow treatments, microneedling, and professional skincare. Book your appointment today."
        path="/greensboro-med-spa"
      />

      <div className="min-h-screen">
        {/* ── Hero ───────────────────────────────────────── */}
        <section className="relative w-full min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden bg-anchor">
          <div className="absolute inset-0">
            <img
              src="/eh_public_assets/backgrounds/greensboro_hero.webp"
              alt="The Esthetic Haus in Greensboro, NC"
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-neutral-900/70 via-neutral-900/50 to-neutral-900/80" />
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/55 to-neutral-900/20" />
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent" />
          </div>

          <div className="relative w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 py-16 lg:py-20">
            <div className="z-10 text-white lg:max-w-2xl xl:max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Location04Icon size={18} strokeWidth={1.5} className="text-white/80" />
                <span className="uppercase tracking-[0.25em] text-[11px] font-semibold text-white/80">Greensboro, NC</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
                A Premier Skincare Studio<br /><span className="italic font-light">in Greensboro, NC</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/90 max-w-xl leading-relaxed drop-shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
                A licensed esthetician studio in the heart of Greensboro, where professional skincare meets the warmth and comfort of home.
              </p>
            </div>
          </div>
        </section>

        {/* ── About content — tiled background ────────────────── */}
        <section className="relative bg-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none bg-scroll lg:bg-fixed"
            style={{
              backgroundImage: "url('/eh_public_assets/backgrounds/tile_pattern.webp')",
              backgroundRepeat: 'repeat',
              backgroundSize: '500px auto',
            }}
          />
          <div className="absolute inset-0 pointer-events-none bg-white/88" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-anchor/25 to-transparent" />

          <div className="relative w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 py-10 md:py-14 lg:py-12">
            <div className="lg:-mb-4">
              <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About The Haus' }]} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

              {/* ── Left column: About copy (spans 2 cols on desktop) ── */}
              <div className="lg:col-span-2 bg-white border border-anchor/20 shadow-[8px_8px_0px_rgba(92,40,40,0.10)] md:shadow-[12px_12px_0px_rgba(92,40,40,0.10)] px-6 py-7 md:px-10 md:py-8">

                <h2 className="font-serif font-bold text-2xl md:text-4xl text-anchor mb-6">
                  A Space Made <span className="italic">for You.</span>
                </h2>

                <div className="font-sans text-sm md:text-base text-anchor/70 leading-relaxed space-y-5">
                  <p>
                    The Esthetic Haus by Natasha is a licensed esthetician studio in Greensboro, NC, built on the belief that skincare should be personal, intentional, and rooted in education. Located along the Gate City Blvd corridor, The Haus specializes in customized facials, chemical peels, dermaplaning, microneedling, lash extensions, brow treatments, and professional skincare using clinical-grade Cosmedix formulations. Every treatment is tailored to your unique skin, your concerns, and your goals. There are no cookie-cutter protocols here.
                  </p>
                  <p>
                    Whether you're addressing acne, hyperpigmentation, signs of aging, or simply investing in the kind of self-care that makes you feel like yourself again, Natasha takes the time to understand your skin and build a treatment plan that actually works. Skin health education is at the core of everything we do, because the best results happen when you understand your skin, not just when you treat it.
                  </p>
                  <p>
                    The Haus was created to be warm, intimate, and welcoming. It's the kind of place where you're treated like family, where your esthetician remembers your name and your skin history. Every visit is designed to feel familiar yet elevated. Come experience what personalized esthetics feels like in a space that was made to feel a little like home.
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-anchor/10">
                  <Link
                    to="/#services"
                    className="no-radius bg-anchor text-white px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold inline-flex items-center justify-center gap-3 hover:bg-action transition-colors duration-300"
                  >
                    Book Your Visit
                    <ArrowRight02Icon size={15} strokeWidth={2} />
                  </Link>
                </div>
              </div>

              {/* ── Right column: Services menu ── */}
              <div className="bg-white border border-anchor/20 shadow-[8px_8px_0px_rgba(92,40,40,0.10)] md:shadow-[12px_12px_0px_rgba(92,40,40,0.10)] px-6 py-7 md:px-10 md:py-8 flex flex-col">

                <h2 className="font-serif font-bold text-2xl md:text-4xl text-anchor mb-5">
                  Our <span className="italic">Services</span>
                </h2>

                <nav className="flex flex-col flex-1">
                  {serviceCategories.map((cat, i) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.name}
                        to={cat.to}
                        className={`group flex items-center gap-4 py-5 md:py-6 hover:pl-2 transition-all duration-300 flex-1 ${i < serviceCategories.length - 1 ? 'border-b border-anchor/10' : ''}`}
                      >
                        <Icon size={18} strokeWidth={1.4} className="text-action shrink-0" />
                        <span className="font-serif text-lg md:text-xl text-anchor group-hover:text-action transition-colors flex-1">
                          {cat.name}
                        </span>
                        <ArrowRight02Icon size={14} strokeWidth={1.8} className="text-anchor/20 group-hover:text-action group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto pt-5 border-t border-anchor/10">
                  <Link
                    to="/#services"
                    className="no-radius inline-flex items-center gap-2.5 text-action hover:text-anchor transition-colors duration-300 uppercase tracking-[0.2em] text-[10px] font-semibold group"
                  >
                    <span>View Full Menu</span>
                    <ArrowRight02Icon size={12} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
