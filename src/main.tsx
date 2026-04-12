import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { SiteLayout } from './layouts/SiteLayout';
import App from './App';
import './index.css';

const GreensboroMedSpa = lazy(() => import('./pages/GreensboroMedSpaPage'));
const Facials = lazy(() => import('./pages/services/FacialsPage'));
const Lashes = lazy(() => import('./pages/services/LashesPage'));
const Microneedling = lazy(() => import('./pages/services/MicroneedlingPage'));
const TeethWhitening = lazy(() => import('./pages/services/TeethWhiteningPage'));
const Brows = lazy(() => import('./pages/services/BrowsPage'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<App />} />
            <Route path="greensboro-med-spa" element={<Suspense><GreensboroMedSpa /></Suspense>} />
            <Route path="services/facials" element={<Suspense><Facials /></Suspense>} />
            <Route path="services/lashes" element={<Suspense><Lashes /></Suspense>} />
            <Route path="services/microneedling" element={<Suspense><Microneedling /></Suspense>} />
            <Route path="services/teeth-whitening" element={<Suspense><TeethWhitening /></Suspense>} />
            <Route path="services/brows" element={<Suspense><Brows /></Suspense>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
