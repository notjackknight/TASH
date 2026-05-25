import type React from 'react';
import { useState } from 'react';
import { SparklesIcon, ArrowRight02Icon, ArrowDown01Icon, ArrowUp01Icon } from 'hugeicons-react';
import { SEOHead } from '../../components/SEOHead';
import { Breadcrumb } from '../../components/Breadcrumb';
import { useNavigate } from 'react-router';

const faqs = [
  { q: 'How do I know which facial is right for me?', a: 'Every facial begins with a thorough skin analysis. Your esthetician will assess your skin type, concerns, and goals to recommend the best treatment for you, with no guesswork involved.' },
  { q: 'How often should I get a facial?', a: 'For most clients, every 4-6 weeks is ideal to maintain results and support your skin\u2019s natural renewal cycle. Your esthetician may recommend a different cadence based on your specific treatment plan.' },
  { q: 'What products do you use?', a: 'We use clinical-grade Cosmedix formulations. They are clinically proven, chirally correct ingredients that deliver real results without harsh chemicals or irritation.' },
];

function FAQItem({ question, answer }: { key?: React.Key; question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-anchor/15 last:border-0">
      {/* Mobile: collapsible */}
      <button onClick={() => setOpen((v) => !v)} className="lg:hidden w-full flex items-center justify-between gap-4 py-5 text-left group">
        <h3 className="font-serif text-xl font-bold text-anchor group-hover:text-action transition-colors">{question}</h3>
        <span className="shrink-0 text-anchor/40 group-hover:text-action transition-colors">
          {open ? <ArrowUp01Icon size={18} strokeWidth={1.8} /> : <ArrowDown01Icon size={18} strokeWidth={1.8} />}
        </span>
      </button>
      <div className={`lg:hidden ${open ? 'block' : 'hidden'} pb-5 -mt-1`}>
        <p className="font-sans text-sm text-anchor/70 leading-relaxed">{answer}</p>
      </div>
      {/* Desktop: always expanded, no toggle */}
      <div className="hidden lg:block py-3">
        <h3 className="font-serif text-lg font-bold text-anchor mb-1">{question}</h3>
        <p className="font-sans text-sm text-anchor/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FacialsPage() {
  const navigate = useNavigate();
  return (
    <>
      <SEOHead
        title="Facials in Greensboro, NC | TASH Skin"
        description="Professional facials in Greensboro, NC, from hydrating facials and dermaplaning to acne treatments and anti-aging protocols. Customized skincare at TASH Skin. Book today."
        path="/services/facials"
      />

      {/* ── Hero ── */}
      <section className="relative w-full min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden bg-anchor">
        <div className="absolute inset-0">
          <img
            src="/eh_public_assets/backgrounds/facials_hero.webp"
            alt="Professional facial treatment"
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
              <SparklesIcon size={18} strokeWidth={1.5} className="text-white/80" />
              <span className="uppercase tracking-[0.25em] text-[11px] font-semibold text-white/80">Facial Protocol</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
              Professional Facials{' '}<span className="italic font-light">in<br />Greensboro, NC</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/90 max-w-xl leading-relaxed drop-shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
              Every facial at TASH Skin begins with a thorough skin analysis and is customized using clinical-grade Cosmedix formulations. Whether you need deep hydration, brightening, acne control, or anti-aging, we tailor the treatment to you.
            </p>
          </div>
        </div>
      </section>

      {/* ── Bottom half — tiled background with two side-by-side white cards ── */}
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

        <div className="relative w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 py-10 md:py-12 lg:py-8">
          <div className="lg:-mb-4">
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/#services' }, { label: 'Facials' }]} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left card — What to Know */}
            <div className="bg-white border border-anchor/20 shadow-[8px_8px_0px_rgba(92,40,40,0.10)] md:shadow-[12px_12px_0px_rgba(92,40,40,0.10)] px-6 py-7 md:px-10 md:py-8 flex flex-col">
              <h2 className="font-serif font-bold text-2xl md:text-4xl text-anchor mb-4">
                What to <span className="italic">Know</span>
              </h2>
              <div className="font-sans text-sm md:text-base text-anchor/70 leading-relaxed space-y-4">
                <p>
                  Our facial menu ranges from express treatments to advanced protocols, including hydrating facials, dermaplaning, brightening peels, acne detox facials, and anti-aging treatments. Each service is designed to address specific skin concerns with clinical-grade products and professional techniques.
                </p>
                <p>
                  All facials include a double cleanse, skin analysis, and customized treatment plan. Depending on your service, you may also receive extractions, a mask, LED therapy, or hydrogen-oxygen infusion. We use Cosmedix products exclusively. These clinical-grade formulations are chirally correct for maximum absorption and results.
                </p>
                <p>
                  For best results, avoid retinol and active exfoliants for 24-48 hours before your appointment. After your facial, your esthetician will recommend a home care routine to extend and maintain your results between visits.
                </p>
              </div>
            </div>

            {/* Right card — FAQ + CTA */}
            <div className="bg-white border border-anchor/20 shadow-[8px_8px_0px_rgba(92,40,40,0.10)] md:shadow-[12px_12px_0px_rgba(92,40,40,0.10)] px-6 py-7 md:px-10 md:py-8 flex flex-col">
              <h2 className="font-serif font-bold text-2xl md:text-4xl text-anchor mb-4">
                Common <span className="italic">Questions</span>
              </h2>
              <div className="border border-anchor/15 px-5 md:px-6 mb-6">
                {faqs.map((faq) => <FAQItem key={faq.q} question={faq.q} answer={faq.a} />)}
              </div>

              <button
                onClick={() => navigate('/?category=Facials#services')}
                className="no-radius bg-anchor text-white px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold inline-flex items-center justify-center gap-3 hover:bg-action transition-colors duration-300 w-full"
              >
                Book a Facial
                <ArrowRight02Icon size={15} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
