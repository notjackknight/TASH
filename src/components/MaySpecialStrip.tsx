import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  SparklesIcon,
  ArrowRight02Icon,
  ArrowLeft02Icon,
  Cancel01Icon,
  Tick02Icon,
  ArrowUpRight01Icon,
} from 'hugeicons-react';

const BOOKING_BASE =
  'https://book.squareup.com/appointments/lu0cj345hv4hr2/location/LVZVXGQCTDSJM';

function openSquareById(squareId: string): void {
  window.open(`${BOOKING_BASE}/services/${squareId}`, '_blank', 'noopener,noreferrer');
}

type Pickable = {
  title: string;
  price: string;
  squareId: string;
  note?: string;
};

const FACIALS: Pickable[] = [
  { title: 'The Signature Haus Facial', price: '$100', squareId: 'EQHOWXLBUOJOLW3DZP4WM66X' },
  { title: 'Hydraglow Haus Facial', price: '$160', squareId: 'ETTV4JN6AK35VESGH6GWS4XJ' },
  { title: 'The Dermaplane Haus Facial', price: '$130', squareId: '3ZY7ALQGYG3QMMQIXXIXO3VU' },
  { title: 'Brightening Haus Facial', price: '$120', squareId: 'TPROWVTAIZIZEGMQJAJL2AJ6' },
  { title: 'Acne Haus Detox Facial', price: '$150', squareId: '7X26S4PCSB2ZHPBZVWNUW6X2' },
  { title: 'Haus Express Facial', price: '$85', squareId: '223D7DYZVC4LRKWXOBG45O5S' },
  { title: 'Calm Haus Facial', price: '$110', squareId: 'Y7TOZFUMBYKF6OI3TEH4ISRA' },
  { title: 'Timeless Haus Facial', price: '$165', squareId: 'U7D6APTFN7O62BDURZ5K2F7H' },
  { title: 'Haus Hydrogen Oxygen Facial', price: '$150', squareId: 'KNGXACYJ4ME6TDR3GAK6DJXS' },
  { title: 'Haus Back Facial', price: '$105', squareId: 'XHXCLU4XQGQCMCOCHU4HTVGT' },
];

const LASHES: Pickable[] = [
  { title: 'Classic Haus Fill', price: '$75', squareId: 'JUDECILCHC6MPZLY7UIU6CC5' },
  { title: 'Haus Wispy Dream Fill', price: '$60', squareId: '5KEBDL53UWWHA3HXIIVKQVIN' },
  { title: 'The Haus of Wispy Dreams Full Set', price: '$150', squareId: 'BGHJY7MV4OTC6Y73PWEUP3DL' },
  { title: 'Classic Haus Full Set', price: '$200', squareId: 'VWRWBTJE5NMO3ZMUCVPKHG63' },
  { title: 'Signature Haus Lash Lift + Tint', price: '$114', squareId: 'J5GGVHIWT4BBITA4Y7NS2UXX' },
  { title: 'The Power Haus Fill', price: '$90', squareId: 'MC5XIDIRL3S4RV2RDYD5DDJX' },
  { title: 'The Power House Volume Full Set', price: '$250', squareId: 'OHKASGYJVHQDJN6OH24ZNYMU' },
  { title: 'The Haus Korean Lash Lift', price: '$125', squareId: 'QVTGFV6ARPB3SLFENDCX62F7' },
  { title: 'Mini Haus Lash Touch Up', price: 'Variable', squareId: 'ZO5DX44DH7GEHP7VVBGCFR66' },
  { title: 'Signature Haus Lash Tint', price: '$30', squareId: 'E2SZHLTMSLY242RNY247KH3Q' },
  { title: 'The Haus Lash Removal', price: '$60', squareId: 'E3ZOWMSDIZZ3YAA7UYMIUEZJ' },
];

const COMP_ADDON: Pickable = {
  title: 'Brow Wax',
  price: '$28',
  squareId: 'SAYKUPRLNC4VBLOBQKG7HUKI',
  note: 'Complimentary',
};

const DISCOUNT_ADDONS: Pickable[] = [
  { title: 'Haus Jelly Mask Add-On', price: '$30', squareId: 'YY6YJKOEX7F5BFVMJACS7JQU' },
  { title: 'Haus of Hydrated Lip Mask', price: '$15', squareId: 'NWYCOO7LPMJM2NLA62QI46HN' },
  { title: 'Haus Facial Machine Add-Ons', price: '$40', squareId: '72ZXBRVFKMELUMJO24IEBXZZ' },
  { title: 'Cosmedix Molecular Peels', price: 'Variable', squareId: 'WDWISQ6C7IRCMGNK7KVINUWU' },
];

type Tab = 'Facials' | 'Lashes';

export function MaySpecialStrip() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-anchor border-t border-micro/20 overflow-hidden">
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className="group relative w-full flex items-center justify-between gap-4 md:gap-6 px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 py-5 md:py-6 text-white hover:bg-action transition-colors duration-300 text-left"
        >
          {/* Left — icon + headline */}
          <div className="flex items-center gap-3 md:gap-5 min-w-0">
            <SparklesIcon
              size={20}
              strokeWidth={1.5}
              className="shrink-0 text-white/80 group-hover:text-white transition-colors"
            />
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-3 min-w-0">
              <span className="uppercase tracking-[0.25em] text-[10px] md:text-[11px] font-semibold text-white/70 group-hover:text-white/90 transition-colors">
                May Special
              </span>
              <span className="font-serif text-lg md:text-2xl leading-tight truncate">
                Glow Haus <span className="italic font-light">Season.</span>
              </span>
            </div>
          </div>

          {/* Right — CTA */}
          <span className="shrink-0 inline-flex items-center gap-2 uppercase tracking-[0.25em] text-[10px] md:text-xs font-semibold">
            <span className="hidden sm:inline">Claim Offer</span>
            <span className="sm:hidden">Claim</span>
            <ArrowRight02Icon
              size={14}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </motion.button>
      </section>

      <AnimatePresence>
        {open && <MaySpecialModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MaySpecialModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('Facials');
  const [serviceChoice, setServiceChoice] = useState<Pickable | null>(null);
  const [addonChoice, setAddonChoice] = useState<Pickable | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [addonBooked, setAddonBooked] = useState(false);

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

  const list = tab === 'Facials' ? FACIALS : LASHES;

  const handleServicePick = (p: Pickable) => {
    setServiceChoice(p);
    setStep(2);
  };

  const handleBookService = () => {
    if (!serviceChoice) return;
    openSquareById(serviceChoice.squareId);
    setStep(3);
  };

  const handleBookAddon = () => {
    if (!addonChoice) return;
    openSquareById(addonChoice.squareId);
    setAddonBooked(true);
  };

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
        className="relative w-full md:max-w-2xl bg-white border border-anchor/20 shadow-[12px_12px_0px_rgba(92,40,40,0.18)] overflow-y-auto max-h-screen md:max-h-[90vh] no-radius flex flex-col"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center bg-white border border-anchor/30 text-anchor hover:bg-anchor hover:text-white transition-colors duration-200"
        >
          <Cancel01Icon size={18} strokeWidth={2} />
        </button>

        {/* Header */}
        <div className="px-6 md:px-10 pt-8 md:pt-10 pb-6 border-b border-anchor/10">
          <div className="flex items-center gap-3 mb-3 text-action">
            <SparklesIcon size={18} strokeWidth={1.5} />
            <span className="uppercase tracking-[0.25em] text-[11px] font-semibold">
              May Special
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl leading-[1.05] text-anchor mb-3">
            Glow Haus <span className="italic font-light">Season.</span>
          </h2>
          <p className="font-sans text-anchor/80 text-sm md:text-base leading-relaxed max-w-xl">
            Book any facial or lash service & receive a complimentary brow wax
            <span className="text-anchor/50"> — or — </span>
            $15 off any add-on.
          </p>

          {/* Step indicator */}
          <div className="mt-6 flex items-center gap-3">
            <StepDot index={1} label="Service" active={step === 1} done={step > 1} />
            <div className="h-px flex-1 bg-anchor/15" />
            <StepDot index={2} label="Add-On" active={step === 2} done={step > 2} />
            <div className="h-px flex-1 bg-anchor/15" />
            <StepDot index={3} label="Book" active={step === 3} done={addonBooked} />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 md:px-10 py-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                {/* Tab switcher */}
                <div className="flex gap-2 mb-5">
                  {(['Facials', 'Lashes'] as Tab[]).map((t) => {
                    const isActive = tab === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`no-radius px-5 py-2.5 uppercase tracking-[0.2em] text-[10px] font-semibold border transition-colors duration-200 ${
                          isActive
                            ? 'bg-anchor text-white border-anchor'
                            : 'bg-white text-anchor border-anchor/30 hover:border-action hover:text-action'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                {/* Service list */}
                <ul className="flex flex-col divide-y divide-anchor/10 border-t border-b border-anchor/10">
                  {list.map((s) => {
                    const isPicked = serviceChoice?.squareId === s.squareId;
                    return (
                      <li key={s.squareId}>
                        <button
                          onClick={() => handleServicePick(s)}
                          className={`group w-full flex items-center justify-between gap-4 py-3.5 px-1 text-left transition-colors duration-200 ${
                            isPicked ? 'bg-canvas/40' : 'hover:bg-canvas/30'
                          }`}
                        >
                          <span className="font-serif text-anchor text-base md:text-lg leading-tight">
                            {s.title}
                          </span>
                          <span className="shrink-0 flex items-center gap-3">
                            <span className="font-serif text-anchor/70 text-sm md:text-base">
                              {s.price}
                            </span>
                            <ArrowRight02Icon
                              size={14}
                              strokeWidth={2}
                              className="text-anchor/40 group-hover:text-action group-hover:translate-x-0.5 transition-all"
                            />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                {/* Selected service summary */}
                <div className="mb-5 p-4 bg-canvas/40 border border-anchor/15 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="uppercase tracking-[0.22em] text-[10px] font-semibold text-action mb-1">
                      Your Service
                    </div>
                    <div className="font-serif text-anchor text-base md:text-lg truncate">
                      {serviceChoice?.title}
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="shrink-0 inline-flex items-center gap-1.5 uppercase tracking-[0.2em] text-[10px] font-semibold text-anchor/70 hover:text-action transition-colors"
                  >
                    <ArrowLeft02Icon size={12} strokeWidth={2} />
                    Change
                  </button>
                </div>

                {/* Comp add-on */}
                <div className="mb-2">
                  <div className="uppercase tracking-[0.22em] text-[10px] font-semibold text-action mb-2">
                    Complimentary
                  </div>
                  <AddonRow
                    addon={COMP_ADDON}
                    picked={addonChoice?.squareId === COMP_ADDON.squareId}
                    onPick={() => setAddonChoice(COMP_ADDON)}
                    badge="Free with offer"
                  />
                </div>

                {/* Discount add-ons */}
                <div className="mt-5">
                  <div className="uppercase tracking-[0.22em] text-[10px] font-semibold text-action mb-2">
                    $15 Off Any Of These
                  </div>
                  <ul className="flex flex-col divide-y divide-anchor/10 border-t border-b border-anchor/10">
                    {DISCOUNT_ADDONS.map((a) => (
                      <li key={a.squareId}>
                        <AddonRow
                          addon={a}
                          picked={addonChoice?.squareId === a.squareId}
                          onPick={() => setAddonChoice(a)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                {/* Service status — flips to Booked once the user has booked the add-on (which implies they finished the service first) */}
                <div className="mb-3 p-4 bg-canvas/40 border border-anchor/15 flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 inline-flex items-center justify-center bg-action text-white mt-0.5">
                    <Tick02Icon size={14} strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="uppercase tracking-[0.22em] text-[10px] font-semibold text-action mb-1">
                      {addonBooked ? 'Booked' : 'Booking In Progress'}
                    </div>
                    <div className="font-serif text-anchor text-base md:text-lg leading-tight">
                      {serviceChoice?.title}
                    </div>
                    {!addonBooked && (
                      <div className="font-sans text-anchor/70 text-xs md:text-sm mt-1">
                        Opened in a new tab. Finish that booking, then come back here for step 2.
                      </div>
                    )}
                  </div>
                </div>

                {/* Add-on — CTA before booking, status panel after */}
                <div className="mb-5">
                  <div className="uppercase tracking-[0.22em] text-[10px] font-semibold text-action mb-2">
                    Step 2 — Your Add-On
                  </div>
                  {addonBooked ? (
                    <div className="p-4 bg-canvas/40 border border-anchor/15 flex items-start gap-3">
                      <span className="shrink-0 w-7 h-7 inline-flex items-center justify-center bg-action text-white mt-0.5">
                        <Tick02Icon size={14} strokeWidth={2.5} />
                      </span>
                      <div className="min-w-0 flex-1 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="uppercase tracking-[0.22em] text-[10px] font-semibold text-action mb-1">
                            Booked
                          </div>
                          <div className="font-serif text-anchor text-base md:text-lg leading-tight">
                            {addonChoice?.title}
                          </div>
                          {addonChoice?.note && (
                            <div className="uppercase tracking-[0.2em] text-[9px] font-semibold text-action mt-1">
                              {addonChoice.note}
                            </div>
                          )}
                        </div>
                        <span className="shrink-0 font-serif text-anchor/70 text-sm md:text-base">
                          {addonChoice?.price}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 md:p-5 border border-anchor/20 bg-white">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="min-w-0">
                          <div className="font-serif text-anchor text-base md:text-lg leading-tight">
                            {addonChoice?.title}
                          </div>
                          {addonChoice?.note && (
                            <div className="uppercase tracking-[0.2em] text-[9px] font-semibold text-action mt-1">
                              {addonChoice.note}
                            </div>
                          )}
                        </div>
                        <span className="shrink-0 font-serif text-anchor/70 text-sm md:text-base">
                          {addonChoice?.price}
                        </span>
                      </div>
                      <button
                        onClick={handleBookAddon}
                        className="no-radius w-full bg-anchor text-white border-2 border-transparent px-6 py-3.5 uppercase tracking-[0.25em] text-[11px] font-semibold inline-flex items-center justify-center gap-3 hover:bg-white hover:text-action hover:border-action transition-colors duration-300"
                      >
                        <span>Book My Add-On</span>
                        <ArrowUpRight01Icon size={14} strokeWidth={2} />
                      </button>
                    </div>
                  )}
                </div>

                {addonBooked && (
                  <div className="p-4 bg-action/5 border border-action/30 flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 inline-flex items-center justify-center bg-action text-white mt-0.5">
                      <Tick02Icon size={14} strokeWidth={2.5} />
                    </span>
                    <div className="font-sans text-anchor/85 text-xs md:text-sm leading-relaxed">
                      Your discount{' '}
                      {addonChoice?.squareId === COMP_ADDON.squareId
                        ? '(complimentary brow wax)'
                        : '($15 off your add-on)'}{' '}
                      will be applied at checkout once both bookings are confirmed by The Esthetic Haus.
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {step === 2 && (
          <div className="px-6 md:px-10 py-5 border-t border-anchor/10 bg-canvas/30">
            {addonChoice && serviceChoice && (
              <p className="font-sans text-anchor/75 text-xs md:text-sm leading-relaxed mb-4">
                We'll book your{' '}
                <span className="font-semibold text-anchor">{serviceChoice.title}</span>{' '}
                first. Once you've finished that booking in the new tab, return here and we'll book your{' '}
                <span className="font-semibold text-anchor">{addonChoice.title}</span>{' '}
                in one click.
              </p>
            )}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] font-semibold text-anchor/70 hover:text-action transition-colors"
              >
                <ArrowLeft02Icon size={12} strokeWidth={2} />
                Back
              </button>
              <button
                onClick={handleBookService}
                disabled={!addonChoice}
                className="no-radius bg-anchor text-white border-2 border-transparent px-6 py-3.5 uppercase tracking-[0.25em] text-[11px] font-semibold inline-flex items-center justify-center gap-3 hover:bg-white hover:text-action hover:border-action transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none"
              >
                <span>Book My Service</span>
                <ArrowUpRight01Icon size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        )}

        {/* Footer — step 3: simple Done button */}
        {step === 3 && (
          <div className="px-6 md:px-10 py-5 border-t border-anchor/10 bg-canvas/30 flex items-center justify-between gap-3">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] font-semibold text-anchor/70 hover:text-action transition-colors"
            >
              <ArrowLeft02Icon size={12} strokeWidth={2} />
              Change Add-On
            </button>
            <button
              onClick={onClose}
              className="no-radius bg-white text-anchor border-2 border-anchor px-6 py-3.5 uppercase tracking-[0.25em] text-[11px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-anchor hover:text-white transition-colors duration-300"
            >
              <span>Done</span>
              <Tick02Icon size={14} strokeWidth={2} />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepDot({
  index,
  label,
  active,
  done,
}: {
  index: number;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-6 h-6 inline-flex items-center justify-center border-2 text-[10px] font-semibold transition-colors duration-200 ${
          done
            ? 'bg-action text-white border-action'
            : active
              ? 'bg-anchor text-white border-anchor'
              : 'bg-white text-anchor/50 border-anchor/30'
        }`}
      >
        {done ? <Tick02Icon size={12} strokeWidth={2.5} /> : index}
      </span>
      <span
        className={`uppercase tracking-[0.2em] text-[10px] font-semibold transition-colors duration-200 ${
          active || done ? 'text-anchor' : 'text-anchor/40'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function AddonRow({
  addon,
  picked,
  onPick,
  badge,
}: {
  addon: Pickable;
  picked: boolean;
  onPick: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onPick}
      className={`group w-full flex items-center justify-between gap-4 py-3.5 px-1 text-left transition-colors duration-200 ${
        picked ? 'bg-canvas/60' : 'hover:bg-canvas/30'
      }`}
    >
      <span className="flex items-center gap-3 min-w-0">
        <span
          className={`w-4 h-4 inline-flex items-center justify-center border-2 shrink-0 transition-colors duration-200 ${
            picked ? 'bg-action border-action' : 'bg-white border-anchor/40 group-hover:border-action'
          }`}
        >
          {picked && <Tick02Icon size={10} strokeWidth={3} className="text-white" />}
        </span>
        <span className="min-w-0">
          <span className="block font-serif text-anchor text-base md:text-lg leading-tight truncate">
            {addon.title}
          </span>
          {badge && (
            <span className="block uppercase tracking-[0.2em] text-[9px] font-semibold text-action mt-0.5">
              {badge}
            </span>
          )}
        </span>
      </span>
      <span className="shrink-0 font-serif text-anchor/70 text-sm md:text-base">
        {addon.price}
      </span>
    </button>
  );
}
