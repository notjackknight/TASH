/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Packages } from './components/Packages';
import { Gallery } from './components/Gallery';
import { GiftCards } from './components/ECommerce';
import { About } from './components/About';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';
import { BookingProvider } from './contexts/BookingContext';
import { BookingModalWrapper } from './components/BookingModalWrapper';

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-canvas text-anchor selection:bg-identity selection:text-anchor">
        <Navigation />
        <main>
          <Hero />
          <Services />
          <Packages />
          <Gallery />
          <About />
          <Reviews />
          <GiftCards />
        </main>
        <Footer />
        <FloatingActionButton />
        <BookingModalWrapper />
      </div>
    </BookingProvider>
  );
}
