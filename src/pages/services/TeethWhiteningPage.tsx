import type React from 'react';
import { useState } from 'react';
import { Sun03Icon, ArrowRight02Icon, ArrowDown01Icon, ArrowUp01Icon } from 'hugeicons-react';
import { SEOHead } from '../../components/SEOHead';
import { Breadcrumb } from '../../components/Breadcrumb';
import { openBooking } from '../../hooks/useBooking';

const faqs = [
  { q: 'Is teeth whitening painful?', a: 'Most clients experience no discomfort. If you have sensitivity, let us know and we\u2019ll adjust the treatment to ensure your comfort.' },
  { q: 'How long do results last?', a: 'Results typically last 3-6 months depending on dietary habits and oral care. Avoiding dark beverages and tobacco helps maintain your brighter smile.' },
  { q: 'Is this the same as what dentists use?', a: 'Yes, we use the same professional-grade whitening products found in dental offices \u2014 at a fraction of the cost and in a comfortable, spa-like environment.' },
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

export default function TeethWhiteningPage() {
  return (
    <>
      <SEOHead
        title="Professional Teeth Whitening in Greensboro, NC | $200 | The Esthetic Haus"
        description="Professional teeth whitening in Greensboro, NC. Three rounds for $200 — same products as a dental office. Fast, effective results at The Esthetic Haus."
        path="/services/teeth-whitening"
      />

      {/* ── Hero — matching landing page Hero overlay + text style ── */}
      <section className="relative w-full min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden bg-anchor">
        <div className="absolute inset-0">
          <img
            src="/eh_public_assets/backgrounds/teeth_whitening_hero.webp"
            alt="Teeth whitening treatment"
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          {/* Mobile overlay */}
          <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-neutral-900/70 via-neutral-900/50 to-neutral-900/80" />
          {/* Desktop overlay */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/55 to-neutral-900/20" />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent" />
        </div>

        <div className="relative w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 py-16 lg:py-20">
          <div className="z-10 text-white lg:max-w-2xl xl:max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Sun03Icon size={18} strokeWidth={1.5} className="text-white/80" />
              <span className="uppercase tracking-[0.25em] text-[11px] font-semibold text-white/80">Finishing Touch</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
              Professional Teeth<br />Whitening{' '}<span className="italic font-light">in<br />Greensboro, NC</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/90 max-w-xl leading-relaxed drop-shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
              Get a brighter, more confident smile with professional teeth whitening at The Esthetic Haus. Our service uses the same professional-grade products you'd find at a dental office — three consecutive rounds in one comfortable appointment, at a fraction of the cost.
            </p>
          </div>
        </div>
      </section>

      {/* ── Bottom half — tiled background with two side-by-side white cards ── */}
      {/* lg: fills exactly the remaining viewport below the hero (minus nav ~6rem) */}
      <section className="relative bg-white overflow-hidden">
        {/* Tiled background — fixed for sticky/parallax (matching Services section) */}
        <div
          className="absolute inset-0 pointer-events-none bg-fixed"
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
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/#services' }, { label: 'Teeth Whitening' }]} />
          </div>

          {/* Two cards side by side — stretch to fill remaining space */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left card — What to Know */}
            <div className="bg-white border border-anchor/20 shadow-[8px_8px_0px_rgba(92,40,40,0.10)] md:shadow-[12px_12px_0px_rgba(92,40,40,0.10)] px-6 py-7 md:px-10 md:py-8 flex flex-col">
              <h2 className="font-serif font-bold text-2xl md:text-4xl text-anchor mb-4">
                What to <span className="italic">Know</span>
              </h2>
              <div className="font-sans text-sm md:text-base text-anchor/70 leading-relaxed space-y-4">
                <p>
                  For a flat fee of $200, you receive three consecutive rounds of clinical-grade whitening gel in a single appointment. Each round is approximately 15 minutes, with a total treatment time of about 60-75 minutes. There are no hidden fees — your price covers the complete treatment from start to finish.
                </p>
                <p>
                  Unlike over-the-counter strips, professional whitening delivers even, controlled results supervised by a trained professional. The application is tailored to your sensitivity level in a comfortable, spa-like setting — faster and more dramatic results than anything you'd get at home.
                </p>
                <p>
                  For best results, avoid dark beverages (coffee, red wine, tea), deeply pigmented foods, and tobacco for 24-48 hours after treatment. Your teeth are most porous immediately after whitening, so the first 48 hours are critical for maintaining your results.
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
                onClick={() => openBooking('Pearly White Haus Teeth Whitening')}
                className="no-radius bg-anchor text-white px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold inline-flex items-center justify-center gap-3 hover:bg-action transition-colors duration-300 w-full"
              >
                <span className="lg:hidden">Book Now</span>
                <span className="hidden lg:inline">Book Teeth Whitening</span>
                <ArrowRight02Icon size={15} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
