/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Packages } from './components/Packages';
import { Gallery } from './components/Gallery';
import { GiftCards } from './components/ECommerce';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';

export default function App() {
  return (
    <div className="min-h-screen bg-canvas text-anchor selection:bg-identity selection:text-anchor">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Packages />
        <Gallery />
        <About />
        <GiftCards />
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
