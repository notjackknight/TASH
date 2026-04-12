/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Packages } from './components/Packages';
import { Gallery } from './components/Gallery';
import { GiftCards } from './components/ECommerce';
import { About } from './components/About';
import { Reviews } from './components/Reviews';

export default function App() {
  return (
    <main>
      <Hero />
      <Services />
      <Packages />
      <Gallery />
      <About />
      <Reviews />
      <GiftCards />
    </main>
  );
}
