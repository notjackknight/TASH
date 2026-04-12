import type React from 'react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cancel01Icon, ArrowLeft02Icon } from 'hugeicons-react';

type LegalPage = 'terms' | 'privacy' | null;

export function Legal() {
  const [page, setPage] = useState<LegalPage>(getPageFromHash);

  useEffect(() => {
    function onHashChange() {
      setPage(getPageFromHash());
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!page) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', handleKey);
    };
  }, [page]);

  function close() {
    history.pushState(null, '', window.location.pathname);
    setPage(null);
  }

  return (
    <AnimatePresence>
      {page && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] bg-white overflow-y-auto"
        >
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-anchor border-b border-white/20">
            <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
              <button
                onClick={close}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors uppercase tracking-[0.2em] text-[11px] font-semibold"
              >
                <ArrowLeft02Icon size={16} strokeWidth={2} />
                <span>Back to Home</span>
              </button>
              <button
                onClick={close}
                aria-label="Close"
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <Cancel01Icon size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
            {page === 'terms' ? <TermsContent /> : <PrivacyContent />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getPageFromHash(): LegalPage {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'terms') return 'terms';
  if (hash === 'privacy') return 'privacy';
  return null;
}

function TermsContent() {
  return (
    <article className="prose-legal">
      <h1 className="font-serif text-4xl md:text-5xl text-anchor mb-2 leading-tight">
        Terms of <span className="italic font-light">Use</span>
      </h1>
      <p className="text-anchor/50 text-sm mb-10">Last updated: April 2026</p>

      <Section title="Acceptance of Terms">
        <p>
          By accessing or using The Esthetic Haus website and services, you agree to be bound by these Terms of Use. If you do not agree, please do not use our website or book any services.
        </p>
      </Section>

      <Section title="Services">
        <p>
          The Esthetic Haus provides esthetic services including facials, lash enhancements, brow treatments, waxing, teeth whitening, and related skincare treatments. All services are performed by licensed estheticians. Results may vary by individual.
        </p>
      </Section>

      <Section title="Booking & Appointments">
        <p>
          Appointments are booked through our third-party booking provider (Square). By booking an appointment, you agree to provide accurate contact information and to arrive on time for your scheduled service.
        </p>
      </Section>

      <Section title="Cancellation Policy">
        <p>
          Your appointment time is reserved especially for you. We kindly ask that you respect our time and the time of other clients by providing adequate notice if you need to cancel or reschedule.
        </p>
        <ul>
          <li><strong>48+ hours' notice:</strong> Cancel or reschedule at no charge.</li>
          <li><strong>Less than 48 hours' notice:</strong> A 50% charge of the scheduled service cost will apply.</li>
          <li><strong>Less than 24 hours' notice:</strong> 100% of the scheduled service cost will be charged.</li>
        </ul>

        <h4>No-Shows</h4>
        <p>
          Clients who fail to show up for their appointment without notice will be charged 100% of the scheduled service cost. Repeated no-shows may require a non-refundable deposit or full prepayment to book future appointments.
        </p>

        <h4>Late Arrivals</h4>
        <p>
          If you arrive late, your service time may be shortened to avoid impacting the next client. If you arrive more than 10-15 minutes late, your appointment may need to be rescheduled and will be treated as a late cancellation.
        </p>

        <h4>Emergencies</h4>
        <p>
          We understand that emergencies happen. Please contact us as soon as possible, and we will do our best to accommodate on a case-by-case basis.
        </p>
        <p>
          By booking an appointment with The Esthetic Haus, you acknowledge and agree to this cancellation policy.
        </p>
      </Section>

      <Section title="Payment">
        <p>
          Payment is due at the time of service unless otherwise arranged. We accept major credit cards, debit cards, and digital payments through Square. Gift cards may be applied toward any service or product.
        </p>
      </Section>

      <Section title="Intellectual Property">
        <p>
          All content on this website — including text, images, logos, and design — is the property of The Esthetic Haus and may not be reproduced, distributed, or used without prior written consent.
        </p>
      </Section>

      <Section title="Limitation of Liability">
        <p>
          The Esthetic Haus is not liable for any adverse reactions, injuries, or dissatisfaction arising from services rendered, provided that services were performed in accordance with industry standards. Clients are responsible for disclosing relevant medical conditions, allergies, and skin sensitivities prior to treatment.
        </p>
      </Section>

      <Section title="Changes to Terms">
        <p>
          We reserve the right to update these terms at any time. Continued use of our website or services constitutes acceptance of any changes.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these terms? Reach us at{' '}
          <a href="mailto:theesthetichausllc@gmail.com" className="text-action hover:text-anchor transition-colors">
            theesthetichausllc@gmail.com
          </a>{' '}
          or call{' '}
          <a href="tel:9146181809" className="text-action hover:text-anchor transition-colors">
            (914) 618-1809
          </a>.
        </p>
      </Section>
    </article>
  );
}

function PrivacyContent() {
  return (
    <article className="prose-legal">
      <h1 className="font-serif text-4xl md:text-5xl text-anchor mb-2 leading-tight">
        Privacy <span className="italic font-light">Policy</span>
      </h1>
      <p className="text-anchor/50 text-sm mb-10">Last updated: April 2026</p>

      <Section title="Information We Collect">
        <p>When you book an appointment or contact us, we may collect:</p>
        <ul>
          <li>Name and contact information (phone number, email address)</li>
          <li>Appointment history and service preferences</li>
          <li>Payment information (processed securely through Square — we do not store card details)</li>
          <li>Messages submitted through our contact form</li>
        </ul>
      </Section>

      <Section title="How We Use Your Information">
        <p>We use the information we collect to:</p>
        <ul>
          <li>Schedule and manage your appointments</li>
          <li>Communicate with you about your services</li>
          <li>Process payments</li>
          <li>Respond to your inquiries</li>
          <li>Improve our services and client experience</li>
        </ul>
      </Section>

      <Section title="Third-Party Services">
        <p>
          We use Square for booking and payment processing. Your payment information is handled directly by Square in accordance with their privacy policy and PCI compliance standards. We do not have access to or store your full credit card information.
        </p>
      </Section>

      <Section title="Data Security">
        <p>
          We take reasonable measures to protect your personal information. However, no method of transmission or storage is 100% secure. We encourage you to take steps to protect your personal information as well.
        </p>
      </Section>

      <Section title="Cookies & Analytics">
        <p>
          Our website may use basic analytics to understand how visitors interact with our site. We do not sell or share your personal information with third parties for marketing purposes.
        </p>
      </Section>

      <Section title="Your Rights">
        <p>
          You may request to view, update, or delete your personal information at any time by contacting us directly. We will respond to your request in a reasonable timeframe.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          We may update this Privacy Policy periodically. Any changes will be reflected on this page with an updated date.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          For privacy-related questions, reach us at{' '}
          <a href="mailto:theesthetichausllc@gmail.com" className="text-action hover:text-anchor transition-colors">
            theesthetichausllc@gmail.com
          </a>{' '}
          or call{' '}
          <a href="tel:9146181809" className="text-action hover:text-anchor transition-colors">
            (914) 618-1809
          </a>.
        </p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h3 className="font-serif text-xl md:text-2xl text-anchor mb-3">{title}</h3>
      <div className="font-sans text-anchor/80 text-sm md:text-base leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_h4]:font-semibold [&_h4]:text-anchor [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:text-sm [&_h4]:uppercase [&_h4]:tracking-wide">
        {children}
      </div>
    </section>
  );
}
