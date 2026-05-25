import type React from 'react';
import { useState } from 'react';
import { Message01Icon, Cancel01Icon, ArrowRight02Icon, Tick02Icon } from 'hugeicons-react';
import { motion, AnimatePresence } from 'motion/react';

type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';

function FloatingFormField({
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
    <div className="flex flex-col gap-1">
      <label
        htmlFor={`fab-${id}`}
        className="font-sans text-[10px] uppercase tracking-[0.22em] text-anchor/60 font-semibold"
      >
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={`fab-${id}`}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="no-radius bg-transparent border border-anchor/20 text-anchor px-3 py-2 font-sans text-sm focus:outline-none focus:border-action transition-all resize-none"
        />
      ) : (
        <input
          id={`fab-${id}`}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="no-radius bg-transparent border border-anchor/20 text-anchor px-3 py-2 font-sans text-sm focus:outline-none focus:border-action transition-all"
        />
      )}
    </div>
  );
}

function FloatingContactForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isValid = name.trim() && phone.trim() && message.trim() && smsConsent;

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
          phone: phone.trim(),
          message: message.trim(),
          smsConsent,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || 'Failed to send.');
      }

      setStatus('sent');
      setName('');
      setPhone('');
      setMessage('');
      setSmsConsent(false);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="fixed bottom-24 right-8 z-50 w-[320px] bg-white border border-anchor/20 shadow-[6px_6px_0px_rgba(92,40,40,0.12)] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-anchor/10 bg-canvas/50">
        <div className="flex items-center gap-2.5">
          <Message01Icon size={16} strokeWidth={1.5} className="text-action" />
          <span className="font-serif text-base text-anchor">Get in Touch</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-anchor/40 hover:text-anchor transition-colors"
          aria-label="Close"
        >
          <Cancel01Icon size={16} strokeWidth={1.5} />
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <AnimatePresence mode="wait">
          {status === 'sent' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center py-4 gap-3"
            >
              <div className="w-10 h-10 bg-action/10 flex items-center justify-center">
                <Tick02Icon size={20} strokeWidth={2} className="text-action" />
              </div>
              <p className="font-serif text-base text-anchor">Message sent!</p>
              <p className="font-sans text-xs text-anchor/60">We'll be in touch soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-1 uppercase tracking-[0.2em] text-[10px] font-semibold text-action hover:text-anchor transition-colors"
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
              className="flex flex-col gap-3"
            >
              {status === 'error' && errorMsg && (
                <div className="text-red-600 text-xs border border-red-200 bg-red-50 p-2">
                  {errorMsg}
                </div>
              )}

              <FloatingFormField id="name" label="Name" type="text" value={name} onChange={setName} />
              <FloatingFormField id="phone" label="Phone" type="text" value={phone} onChange={setPhone} />
              <FloatingFormField id="message" label="Message" type="textarea" value={message} onChange={setMessage} />

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-0.5 accent-action shrink-0"
                />
                <span className="font-sans text-[10px] text-anchor/50 leading-relaxed">
                  I agree to receive texts from TASH Skin. Msg &amp; data rates may apply. Reply STOP to opt out.
                </span>
              </label>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={!isValid || status === 'sending'}
                className="no-radius bg-anchor text-white px-5 py-2.5 uppercase tracking-[0.25em] text-[10px] font-semibold inline-flex items-center justify-center gap-2.5 hover:bg-action transition-colors duration-300 self-end mt-1 disabled:opacity-40 disabled:pointer-events-none"
              >
                <span>{status === 'sending' ? 'Sending...' : 'Send'}</span>
                <ArrowRight02Icon size={12} strokeWidth={2} />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function FloatingActionButton() {
  return (
    <>
      {/* Mobile: SMS link */}
      <motion.a
        href="sms:9146181809"
        whileTap={{ scale: 0.9 }}
        aria-label="Text us"
        className="md:hidden fixed bottom-6 right-6 z-40 no-radius bg-action text-white flex items-center justify-center gap-3 h-14 w-14 shadow-[4px_4px_0px_#4D4828] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_#4D4828] transition-all duration-200"
      >
        <Message01Icon size={22} strokeWidth={1.5} className="text-white" />
      </motion.a>
    </>
  );
}
