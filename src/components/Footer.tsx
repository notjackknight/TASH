import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight02Icon,
  Location01Icon,
  Call02Icon,
  Mail01Icon,
  Clock01Icon,
  InstagramIcon,
  Directions02Icon,
  Tick02Icon,
} from 'hugeicons-react';

const hours = [
  { day: 'Monday', time: '8:00am – 4:00pm' },
  { day: 'Tuesday', time: '8:00am – 3:00pm' },
  { day: 'Wednesday', time: '9:00am – 6:00pm' },
  { day: 'Thursday', time: '8:00am – 3:00pm' },
  { day: 'Friday', time: '8:00am – 3:00pm' },
  { day: 'Saturday', time: '9:00am – 3:00pm' },
  { day: 'Sunday', time: "The Lord's Day", italic: true },
];

const directionsUrl =
  'https://www.google.com/maps/dir/?api=1&destination=5698+West+Gate+City+Blvd+Suite+116+Greensboro+NC+27407';

export function Footer() {
  const contactInfo = (
    <div className="flex flex-col gap-4 lg:gap-5">
      <ContactTile Icon={Location01Icon}>
        <div className="font-semibold text-white">
          The Esthetic Haus @ Suites by Ivy House
        </div>
        <div className="text-white/80 mt-1">
          5698 West Gate City Blvd
          <br />
          Suite 116
          <br />
          Greensboro, NC 27407
        </div>
      </ContactTile>
      <ContactTile Icon={Call02Icon}>
        <a href="tel:9146181809" className="hover:text-white transition-colors">
          (914) 618-1809
        </a>
      </ContactTile>
      <ContactTile Icon={Mail01Icon}>
        <a
          href="mailto:theesthetichausllc@gmail.com"
          className="hover:text-white transition-colors break-all sm:break-normal"
        >
          theesthetichausllc@gmail.com
        </a>
      </ContactTile>
    </div>
  );

  const hoursContent = (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4 lg:mb-2 text-white/70">
        <Clock01Icon size={20} strokeWidth={1.5} />
        <span className="uppercase tracking-[0.25em] text-[11px] font-semibold">
          Hours
        </span>
      </div>
      <ul className="font-serif text-white/90">
        {hours.map(({ day, time, italic }) => (
          <li
            key={day}
            className="grid grid-cols-[7rem_1fr] items-baseline gap-4 py-2 lg:py-1 border-b border-white/10 last:border-0"
          >
            <span className="uppercase tracking-[0.18em] text-xs font-semibold text-white/60">
              {day}
            </span>
            <span
              className={`text-base lg:text-lg ${italic ? 'italic text-white/80' : ''}`}
            >
              {time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const mapContent = (
    <div className="w-full">
      <div className="relative w-full h-[250px] lg:h-[200px] border border-white/30 no-radius overflow-hidden">
        <iframe
          title="The Esthetic Haus location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.549216765045!2d-79.8788414!3d36.0313889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88531a3809623233%3A0x631024e030e4b7b!2s5698%20W%20Gate%20City%20Blvd%20%23116%2C%20Greensboro%2C%20NC%2027407!5e0!3m2!1sen!2sus!4v1709668000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        {/* Overlay badge */}
        <div className="absolute top-4 left-4 bg-white border border-anchor/20 px-4 py-2 flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
          <Location01Icon size={14} strokeWidth={1.75} className="text-action" />
          <span className="font-serif italic text-anchor text-sm">The Haus</span>
        </div>
      </div>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 lg:mt-2 inline-flex items-center gap-2 group uppercase tracking-[0.22em] text-[10px] font-semibold text-white/70 hover:text-white transition-colors"
      >
        <Directions02Icon size={14} strokeWidth={1.5} />
        <span>Get Directions</span>
        <ArrowRight02Icon
          size={12}
          strokeWidth={2}
          className="transition-transform group-hover:translate-x-1"
        />
      </a>
    </div>
  );

  const formContent = <ContactForm />;

  return (
    <footer className="relative bg-anchor text-white border-t border-micro/20 overflow-hidden">
      {/* Decorative texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, #fff 0%, transparent 40%), radial-gradient(circle at 85% 80%, #fff 0%, transparent 40%)',
        }}
      />

      {/* ─── MASTER CONTAINER ───────────────────────────────── */}
      <div
        className="relative mx-auto px-6 md:px-8 py-10 lg:py-8"
        style={{ maxWidth: '1200px' }}
      >
        {/* ─── Section title (centered) ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 22 }}
          className="text-center mb-8 lg:mb-5"
        >
          <div className="inline-flex items-center gap-3 mb-3 lg:mb-2 text-white/70">
            <Location01Icon size={16} strokeWidth={1.5} />
            <span className="uppercase tracking-[0.28em] text-[11px] font-semibold">
              Find Us
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-5xl text-white leading-[1.05]">
            Visit the <span className="italic font-light">Haus.</span>
          </h2>
        </motion.div>

        {/* ─── 50/50 GRID ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 22 }}
          className="grid grid-cols-1 lg:grid-cols-2 items-start gap-6 lg:gap-12"
        >
          {/* LEFT COLUMN — Contact info + Hours */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {contactInfo}
            {hoursContent}
          </div>

          {/* RIGHT COLUMN — Map above Form */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {mapContent}
            {formContent}
          </div>
        </motion.div>

        {/* ─── Bottom strip ───────────────────────────────────── */}
        <div className="pt-8 mt-10 lg:pt-4 lg:mt-6 border-t border-white/20">
          <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-1 mb-6 md:mb-8 lg:mb-3">
            <div className="font-serif text-base md:text-3xl lg:text-2xl tracking-[0.18em] md:tracking-[0.25em] uppercase text-white whitespace-nowrap">
              The Esthetic Haus
            </div>
            <div className="font-serif italic text-white/50 text-sm">
              Where every visit feels like home.
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans uppercase tracking-widest text-white/50">
            <p>&copy; {new Date().getFullYear()} The Esthetic Haus</p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <InstagramIcon size={16} strokeWidth={1.5} />
                <span>Instagram</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Contact form with submission logic ──────────────────────
type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isValid = name.trim() && email.trim() && message.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || 'Failed to send.');
      }

      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  return (
    <div className="relative w-full bg-white border border-anchor/20 p-5 lg:p-4 overflow-hidden">
      {/* Decorative monogram watermark */}
      <div className="absolute -bottom-8 -right-4 font-serif italic text-anchor/[0.04] text-[12rem] lg:text-[7rem] leading-none pointer-events-none select-none">
        eh
      </div>

      {/* Header */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-3 lg:mb-2 text-action">
          <Mail01Icon size={16} strokeWidth={1.5} />
          <span className="uppercase tracking-[0.28em] text-[10px] font-semibold">
            Get in Touch
          </span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-anchor leading-[1.05] mb-5 lg:hidden">
          Tell us <span className="italic font-light">everything.</span>
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center text-center py-6 gap-4"
          >
            <div className="w-12 h-12 bg-action/10 flex items-center justify-center">
              <Tick02Icon size={24} strokeWidth={2} className="text-action" />
            </div>
            <p className="font-serif text-lg text-anchor">Message sent!</p>
            <p className="font-sans text-xs text-anchor/60">
              We'll be in touch soon.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 uppercase tracking-[0.2em] text-[10px] font-semibold text-action hover:text-anchor transition-colors"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-4 lg:gap-2"
          >
            {status === 'error' && errorMsg && (
              <div className="text-red-600 text-xs border border-red-200 bg-red-50 p-2">
                {errorMsg}
              </div>
            )}

            <FormField id="name" label="Name" type="text" value={name} onChange={setName} />
            <FormField id="email" label="Email" type="email" value={email} onChange={setEmail} />
            <FormField id="message" label="Message" type="textarea" value={message} onChange={setMessage} />

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={!isValid || status === 'sending'}
              className="no-radius bg-anchor text-white border-2 border-transparent px-8 py-3 lg:px-6 lg:py-2.5 uppercase tracking-[0.25em] text-xs font-semibold inline-flex items-center justify-center gap-3 hover:bg-white hover:text-action hover:border-action transition-colors duration-300 self-end mt-2 lg:mt-1 disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>{status === 'sending' ? 'Sending...' : 'Send'}</span>
              <ArrowRight02Icon size={14} strokeWidth={2} />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Reusable form field ─────────────────────────────────────
function FormField({
  id,
  label,
  type,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 md:gap-2 lg:gap-0.5">
      <label
        htmlFor={id}
        className="font-sans text-[10px] uppercase tracking-[0.22em] text-anchor/60 font-semibold"
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="no-radius bg-transparent border-0 border-b border-anchor/30 text-anchor px-0 py-2 md:py-3 lg:py-1 font-serif text-base focus:outline-none focus:border-action focus:border-b-2 transition-all resize-none min-h-[3rem] md:min-h-[6rem] lg:min-h-[2rem]"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="no-radius bg-transparent border-0 border-b border-anchor/30 text-anchor px-0 py-2 md:py-3 lg:py-1 font-serif text-base focus:outline-none focus:border-action focus:border-b-2 transition-all"
        />
      )}
    </div>
  );
}

// ─── Contact tile ──────────────────────────────────────────────
function ContactTile({
  Icon,
  children,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <Icon size={22} strokeWidth={1.5} className="shrink-0 mt-1 text-white/70" />
      <div className="font-serif text-white/90 text-lg md:text-xl lg:text-base leading-relaxed flex-1">
        {children}
      </div>
    </div>
  );
}
