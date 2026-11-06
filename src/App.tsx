import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AdventuresPage } from './pages/AdventuresPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { MyKitPage } from './pages/MyKitPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useSavedAdventures } from './hooks/useSavedAdventures';

export const App: React.FC = () => {
  const { savedIds, toggleSave, isSaved, savedCount } = useSavedAdventures();

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Skip to Content for Screen Readers & Keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Mandatory Unofficial Disclosure Banner */}
      <DisclaimerBanner />

      {/* Main Global Navigation */}
      <Header savedCount={savedCount} />

      {/* Primary Semantic Landmark */}
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isSaved={isSaved}
                onToggleSave={toggleSave}
              />
            }
          />
          <Route
            path="/adventures"
            element={
              <AdventuresPage
                isSaved={isSaved}
                onToggleSave={toggleSave}
                savedIds={savedIds}
              />
            }
          />
          <Route
            path="/adventures/:slug"
            element={
              <EventDetailPage
                isSaved={isSaved}
                onToggleSave={toggleSave}
              />
            }
          />
          <Route path="/my-kit" element={<MyKitPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Semantic Footer */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;

