/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { MaySpecialStrip } from './components/MaySpecialStrip';
import { Packages } from './components/Packages';
import { ShopStrip } from './components/ShopStrip';
import { Gallery } from './components/Gallery';
import { GiftCards } from './components/ECommerce';
import { About } from './components/About';
import { Reviews } from './components/Reviews';

export default function App() {
  return (
    <main>
      <Hero />
      <Services />
      <MaySpecialStrip />
      <Packages />
      <ShopStrip />
      <Gallery />
      <About />
      <Reviews />
      <GiftCards />
    </main>
  );
}
