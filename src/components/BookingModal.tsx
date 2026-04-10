import { useEffect, useRef, useState, useCallback, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cancel01Icon,
  ArrowRight02Icon,
  ArrowLeft01Icon,
  Tick02Icon,
  Calendar03Icon,
  Clock01Icon,
  SparklesIcon,
} from 'hugeicons-react';

// ─── Types ─────────────────────────────────────────────────
type BookingStep = 'service' | 'date' | 'time' | 'info' | 'card' | 'confirming' | 'success' | 'error';

type SquareService = {
  name: string;
  variationId: string;
  version: string;
  priceCents: number | null;
  durationMinutes: number | null;
};

type TimeSlot = {
  startAt: string;
  teamMemberId: string;
  durationMinutes: number | null;
  serviceVariationVersion: string | null;
};

// Square Web Payments SDK types
declare global {
  interface Window {
    Square?: {
      payments: (appId: string, locationId: string) => Promise<SqPayments>;
    };
  }
}
interface SqPayments { card: () => Promise<SqCard> }
interface SqCard { attach: (sel: string) => Promise<void>; tokenize: () => Promise<SqTokenResult>; destroy: () => void }
interface SqTokenResult { status: string; token?: string; errors?: Array<{ message: string }> }

const APP_ID = import.meta.env.VITE_SQUARE_APPLICATION_ID as string;
const LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID as string;
const TZ = 'America/New_York';

// ─── Helpers ───────────────────────────────────────────────
function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: TZ });
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: TZ });
}

function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

// ─── Component ─────────────────────────────────────────────
export function BookingModal({
  onClose,
  preselectedServiceTitle,
}: {
  onClose: () => void;
  preselectedServiceTitle: string | null;
}) {
  const [step, setStep] = useState<BookingStep>(preselectedServiceTitle ? 'date' : 'service');
  const [services, setServices] = useState<SquareService[]>([]);
  const [selectedService, setSelectedService] = useState<SquareService | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date(); d.setDate(1); return d;
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingResult, setBookingResult] = useState<{ startAt: string; cardLast4?: string } | null>(null);

  const cardRef = useRef<SqCard | null>(null);

  // Esc + scroll lock
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = prev; };
  }, [onClose]);

  const [servicesError, setServicesError] = useState('');

  // Fetch services on mount
  useEffect(() => {
    let cancelled = false;
    fetch('/api/booking/services')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: { services: SquareService[] }) => {
        if (cancelled) return;
        const svcs = data.services || [];
        setServices(svcs);
        // If preselected, try to match
        if (preselectedServiceTitle) {
          const match = svcs.find(
            s => s.name.toLowerCase() === preselectedServiceTitle.toLowerCase()
          );
          if (match) {
            setSelectedService(match);
          } else {
            // No match found — fall back to service picker
            console.warn(`No Square match for "${preselectedServiceTitle}". Available:`, svcs.map(s => s.name));
            setStep('service');
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch services:', err);
        if (!cancelled) setServicesError('Unable to load services. Please try again.');
      });
    return () => { cancelled = true; };
  }, [preselectedServiceTitle]);

  // Initialize card SDK when reaching the card step
  useEffect(() => {
    if (step !== 'card') return;
    let cancelled = false;
    let card: SqCard | null = null;

    async function init() {
      if (!window.Square || !APP_ID || !LOCATION_ID) return;
      try {
        const payments = await window.Square.payments(APP_ID, LOCATION_ID);
        card = await payments.card();
        if (cancelled) { card.destroy(); return; }
        await card.attach('#booking-card-container');
        cardRef.current = card;
      } catch (err) {
        console.error('Failed to init Square card:', err);
      }
    }
    init();
    return () => { cancelled = true; if (card) card.destroy(); };
  }, [step]);

  // Fetch availability for a service on a given date
  async function fetchAvailability(date: Date, service: SquareService) {
    setSlotsLoading(true);
    setSlots([]);
    setSelectedSlot(null);
    try {
      const startDate = isoDate(date);
      const endDate = startDate; // single day
      const res = await fetch('/api/booking/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceVariationId: service.variationId, startDate, endDate }),
      });
      const data = await res.json();
      const mapped: TimeSlot[] = (data.slots || []).map((s: { startAt: string; segments: Array<{ teamMemberId: string; durationMinutes: number; serviceVariationVersion: string }> }) => ({
        startAt: s.startAt,
        teamMemberId: s.segments?.[0]?.teamMemberId || '',
        durationMinutes: s.segments?.[0]?.durationMinutes || null,
        serviceVariationVersion: s.segments?.[0]?.serviceVariationVersion || null,
      }));
      setSlots(mapped);
    } catch { setSlots([]); }
    finally { setSlotsLoading(false); }
  }

  function handleDateSelect(date: Date) {
    if (!selectedService) return;
    setSelectedDate(date);
    setStep('time');
    fetchAvailability(date, selectedService);
  }

  function handleSelectService(s: SquareService) {
    setSelectedService(s);
    setStep('date');
  }

  async function handleConfirm(e: FormEvent) {
    e.preventDefault();
    if (!selectedService || !selectedSlot || !cardRef.current) return;

    setStep('confirming');
    setErrorMessage('');

    try {
      // Tokenize card
      const tokenResult = await cardRef.current.tokenize();
      if (tokenResult.status !== 'OK' || !tokenResult.token) {
        throw new Error(tokenResult.errors?.[0]?.message || 'Card validation failed.');
      }

      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceVariationId: selectedService.variationId,
          serviceVariationVersion: selectedSlot.serviceVariationVersion || selectedService.version,
          teamMemberId: selectedSlot.teamMemberId,
          startAt: selectedSlot.startAt,
          durationMinutes: selectedSlot.durationMinutes || selectedService.durationMinutes || 60,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          note: note.trim() || undefined,
          cardToken: tokenResult.token,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Booking failed.');

      setBookingResult({ startAt: (data as { booking?: { startAt?: string }; cardLast4?: string }).booking?.startAt || selectedSlot.startAt, cardLast4: (data as { cardLast4?: string }).cardLast4 });
      setStep('success');
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
      setStep('error');
    }
  }

  const isInfoValid = name.trim() && email.trim() && phone.trim();

  // ─── Render ──────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-anchor/70 backdrop-blur-sm flex items-stretch md:items-center justify-center md:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full md:max-w-2xl bg-white border border-anchor/20 shadow-[12px_12px_0px_rgba(92,40,40,0.18)] overflow-y-auto max-h-screen md:max-h-[90vh] no-radius"
      >
        {/* Close */}
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center bg-white border border-anchor/30 text-anchor hover:bg-anchor hover:text-white transition-colors duration-200">
          <Cancel01Icon size={18} strokeWidth={2} />
        </button>

        <div className="p-6 md:p-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3 text-action">
            <Calendar03Icon size={18} strokeWidth={1.5} />
            <span className="uppercase tracking-[0.25em] text-[11px] font-semibold">Book an Appointment</span>
          </div>

          {/* Service banner (when selected) */}
          {selectedService && step !== 'service' && (
            <div className="mb-6 pb-4 border-b border-anchor/15">
              <h2 className="font-serif text-2xl md:text-3xl text-anchor leading-[1.05]">{selectedService.name}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-anchor/60">
                {selectedService.priceCents != null && <span className="font-serif text-lg text-action">${(selectedService.priceCents / 100).toFixed(0)}</span>}
                {selectedService.durationMinutes != null && (
                  <span className="flex items-center gap-1"><Clock01Icon size={14} strokeWidth={1.5} />{selectedService.durationMinutes} min</span>
                )}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* ─── SERVICE PICKER ─── */}
            {step === 'service' && (
              <motion.div key="service" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-2">
                <h3 className="font-serif text-xl text-anchor mb-4">Select a service</h3>
                {services.length === 0 && (
                  <div className="py-8 text-center text-anchor/50 text-sm">Loading services...</div>
                )}
                <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-1">
                  {services.map(s => (
                    <button
                      key={s.variationId}
                      onClick={() => handleSelectService(s)}
                      className="w-full text-left flex items-center justify-between py-3 px-4 border border-anchor/15 hover:border-action hover:bg-canvas/30 transition-colors"
                    >
                      <div>
                        <div className="font-serif text-base text-anchor">{s.name}</div>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-anchor/50">
                          {s.priceCents != null && <span>${(s.priceCents / 100).toFixed(0)}</span>}
                          {s.durationMinutes != null && <span>{s.durationMinutes} min</span>}
                        </div>
                      </div>
                      <ArrowRight02Icon size={16} strokeWidth={1.5} className="text-anchor/30" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── DATE PICKER ─── */}
            {step === 'date' && (
              <motion.div key="date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {!selectedService ? (
                  <div className="py-12 flex flex-col items-center gap-4">
                    {servicesError ? (
                      <p className="text-red-600 text-sm">{servicesError}</p>
                    ) : (
                      <>
                        <div className="w-8 h-8 border-2 border-anchor/20 border-t-action animate-spin" />
                        <span className="text-xs text-anchor/50 uppercase tracking-widest">Loading service details...</span>
                      </>
                    )}
                  </div>
                ) : (
                <CalendarPicker
                  month={calendarMonth}
                  onMonthChange={setCalendarMonth}
                  onSelect={handleDateSelect}
                />
                )}
              </motion.div>
            )}

            {/* ─── TIME SLOTS ─── */}
            {step === 'time' && (
              <motion.div key="time" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {selectedDate && (
                  <div className="mb-4 text-sm text-anchor/60">{formatDate(selectedDate)}</div>
                )}
                {slotsLoading ? (
                  <div className="py-12 flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-anchor/20 border-t-action animate-spin" />
                    <span className="text-xs text-anchor/50 uppercase tracking-widest">Checking availability...</span>
                  </div>
                ) : slots.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-anchor/60 text-sm mb-4">No availability on this date.</p>
                    <button onClick={() => setStep('date')} className="text-action uppercase tracking-[0.2em] text-[10px] font-semibold hover:text-anchor transition-colors">Try another day</button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                      {slots.map(slot => {
                        const active = selectedSlot?.startAt === slot.startAt;
                        return (
                          <button
                            key={slot.startAt}
                            onClick={() => setSelectedSlot(slot)}
                            className={`no-radius py-3 px-2 border-2 text-center font-serif text-sm transition-colors duration-200 ${
                              active
                                ? 'bg-anchor text-white border-anchor'
                                : 'bg-white text-anchor border-anchor/20 hover:border-anchor'
                            }`}
                          >
                            {formatTime(slot.startAt)}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-anchor/15">
                      <button onClick={() => setStep('date')} className="flex items-center gap-2 text-anchor/50 hover:text-anchor text-xs uppercase tracking-widest transition-colors">
                        <ArrowLeft01Icon size={14} strokeWidth={2} /> Back
                      </button>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        disabled={!selectedSlot}
                        onClick={() => setStep('info')}
                        className="no-radius bg-anchor text-white border-2 border-transparent px-6 py-3 uppercase tracking-[0.25em] text-[10px] font-semibold inline-flex items-center gap-2 hover:bg-white hover:text-action hover:border-action transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none"
                      >
                        Continue <ArrowRight02Icon size={14} strokeWidth={2} />
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* ─── CUSTOMER INFO ─── */}
            {step === 'info' && (
              <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex flex-col gap-4">
                  <Field id="book-name" label="Name" value={name} onChange={setName} />
                  <Field id="book-email" label="Email" type="email" value={email} onChange={setEmail} />
                  <Field id="book-phone" label="Phone" type="tel" value={phone} onChange={setPhone} />
                  <Field id="book-note" label="Notes (optional)" type="textarea" value={note} onChange={setNote} />
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-anchor/15 mt-6">
                  <button onClick={() => setStep('time')} className="flex items-center gap-2 text-anchor/50 hover:text-anchor text-xs uppercase tracking-widest transition-colors">
                    <ArrowLeft01Icon size={14} strokeWidth={2} /> Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    disabled={!isInfoValid}
                    onClick={() => setStep('card')}
                    className="no-radius bg-anchor text-white border-2 border-transparent px-6 py-3 uppercase tracking-[0.25em] text-[10px] font-semibold inline-flex items-center gap-2 hover:bg-white hover:text-action hover:border-action transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    Continue <ArrowRight02Icon size={14} strokeWidth={2} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ─── CARD ON FILE ─── */}
            {step === 'card' && (
              <motion.form key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleConfirm}>
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3 text-anchor/50">
                    <SparklesIcon size={16} strokeWidth={1.5} />
                    <span className="uppercase tracking-[0.22em] text-[10px] font-semibold">Secure Your Appointment</span>
                  </div>
                  <p className="text-xs text-anchor/60 leading-relaxed mb-4">
                    Your card will be held to secure this appointment. You will only be charged in the event of a late cancellation or no-show, per our cancellation policy.
                  </p>
                  <div id="booking-card-container" className="min-h-[40px] border border-anchor/20 p-3" />
                </div>

                {/* Summary */}
                {selectedSlot && selectedDate && (
                  <div className="bg-canvas/50 border border-anchor/10 p-4 mb-6">
                    <div className="uppercase tracking-[0.22em] text-[10px] font-semibold text-anchor/40 mb-2">Appointment Summary</div>
                    <div className="font-serif text-base text-anchor">{selectedService?.name}</div>
                    <div className="text-sm text-anchor/60 mt-1">{formatDate(selectedDate)} at {formatTime(selectedSlot.startAt)}</div>
                    <div className="text-sm text-anchor/60">{name} &middot; {phone}</div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-anchor/15">
                  <button type="button" onClick={() => setStep('info')} className="flex items-center gap-2 text-anchor/50 hover:text-anchor text-xs uppercase tracking-widest transition-colors">
                    <ArrowLeft01Icon size={14} strokeWidth={2} /> Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="no-radius bg-action text-white border-2 border-transparent px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold inline-flex items-center gap-3 hover:bg-white hover:text-action hover:border-action transition-colors duration-300"
                  >
                    Confirm Booking <ArrowRight02Icon size={14} strokeWidth={2} />
                  </motion.button>
                </div>
              </motion.form>
            )}

            {/* ─── CONFIRMING ─── */}
            {step === 'confirming' && (
              <motion.div key="confirming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16 gap-6">
                <div className="w-10 h-10 border-2 border-anchor/20 border-t-action animate-spin" />
                <p className="font-sans text-sm text-anchor/70 uppercase tracking-widest">Confirming your appointment...</p>
              </motion.div>
            )}

            {/* ─── SUCCESS ─── */}
            {step === 'success' && bookingResult && (
              <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center py-8 gap-6">
                <div className="w-16 h-16 bg-action/10 flex items-center justify-center">
                  <Tick02Icon size={32} strokeWidth={2} className="text-action" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-anchor mb-2">Booked!</h3>
                  <p className="font-sans text-sm text-anchor/70 max-w-sm">
                    Your <strong>{selectedService?.name}</strong> is confirmed for{' '}
                    <strong>{formatDate(new Date(bookingResult.startAt))}</strong> at{' '}
                    <strong>{formatTime(bookingResult.startAt)}</strong>.
                  </p>
                  <p className="font-sans text-xs text-anchor/50 mt-3">A confirmation email is on its way.</p>
                  {bookingResult.cardLast4 && (
                    <p className="font-sans text-xs text-anchor/40 mt-2">Card ending in {bookingResult.cardLast4} saved on file.</p>
                  )}
                </div>
                <motion.button whileTap={{ scale: 0.97 }} onClick={onClose} className="no-radius bg-anchor text-white border-2 border-transparent px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold hover:bg-white hover:text-action hover:border-action transition-colors duration-300">
                  Done
                </motion.button>
              </motion.div>
            )}

            {/* ─── ERROR ─── */}
            {step === 'error' && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center py-8 gap-6">
                <div className="bg-red-50 border border-red-200 text-red-800 text-sm p-4 w-full">
                  {errorMessage || 'Something went wrong.'}
                </div>
                <button onClick={() => setStep('card')} className="text-action uppercase tracking-[0.2em] text-[10px] font-semibold hover:text-anchor transition-colors">
                  Try again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Calendar Picker ───────────────────────────────────────
function CalendarPicker({
  month,
  onMonthChange,
  onSelect,
}: {
  month: Date;
  onMonthChange: (d: Date) => void;
  onSelect: (d: Date) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = addDays(today, 1);
  const maxDate = addDays(today, 30);

  const year = month.getFullYear();
  const mo = month.getMonth();
  const firstDay = new Date(year, mo, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, mo + 1, 0).getDate();

  const monthLabel = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  function prevMonth() {
    const p = new Date(year, mo - 1, 1);
    if (p >= new Date(today.getFullYear(), today.getMonth(), 1)) onMonthChange(p);
  }
  function nextMonth() {
    const n = new Date(year, mo + 1, 1);
    if (n <= maxDate) onMonthChange(n);
  }

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 text-anchor/40 hover:text-anchor transition-colors" aria-label="Previous month">
          <ArrowLeft01Icon size={18} strokeWidth={2} />
        </button>
        <span className="font-serif text-lg text-anchor">{monthLabel}</span>
        <button onClick={nextMonth} className="p-2 text-anchor/40 hover:text-anchor transition-colors" aria-label="Next month">
          <ArrowRight02Icon size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-center text-[10px] uppercase tracking-widest text-anchor/40 font-semibold py-1">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const date = new Date(year, mo, day);
          date.setHours(0, 0, 0, 0);
          const isPast = date < tomorrow;
          const isFuture = date > maxDate;
          const disabled = isPast || isFuture;

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`py-2.5 font-serif text-base text-center transition-colors duration-150 ${
                disabled
                  ? 'text-anchor/20 cursor-default'
                  : 'text-anchor hover:bg-action hover:text-white'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Reusable field ────────────────────────────────────────
function Field({
  id, label, type = 'text', value, onChange,
}: {
  id: string; label: string; type?: 'text' | 'email' | 'tel' | 'textarea'; value: string; onChange: (v: string) => void;
}) {
  const cls = 'no-radius bg-transparent border-0 border-b border-anchor/30 text-anchor px-0 py-2 font-serif text-base focus:outline-none focus:border-action focus:border-b-2 transition-all w-full';
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-sans text-[10px] uppercase tracking-[0.22em] text-anchor/60 font-semibold">{label}</label>
      {type === 'textarea' ? (
        <textarea id={id} rows={2} value={value} onChange={e => onChange(e.target.value)} className={`${cls} resize-none min-h-[3rem]`} />
      ) : (
        <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}
