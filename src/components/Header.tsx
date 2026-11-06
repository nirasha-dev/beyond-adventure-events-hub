import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Compass, Menu, X, Bookmark, ArrowRight } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ savedCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Brand identity */}
        <Link to="/" className="brand-logo" aria-label="BEYOND Adventure Events Hub Home">
          <span className="brand-icon">
            <Compass size={24} aria-hidden="true" />
          </span>
          <span className="brand-text">
            <span className="brand-title">BEYOND</span>
            <span className="brand-subtitle">Adventure Events Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/adventures"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Adventures
                {savedCount > 0 && (
                  <span className="saved-badge" title={`${savedCount} saved adventures`}>
                    <Bookmark size={12} aria-hidden="true" />
                    <span>{savedCount}</span>
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-kit"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                My Adventure Kit
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                About
              </NavLink>
            </li>
          </ul>

          <div className="nav-actions">
            <Link to="/adventures" className="btn btn-primary btn-sm">
              <span>Explore adventures</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          className="mobile-toggle"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="mobile-nav-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer-header">
              <span className="brand-title">BEYOND</span>
              <button
                type="button"
                className="drawer-close-btn"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile Navigation">
              <ul className="mobile-nav-links">
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/adventures"
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span>Adventures</span>
                    {savedCount > 0 && (
                      <span className="saved-badge">
                        <Bookmark size={12} aria-hidden="true" />
                        <span>{savedCount}</span>
                      </span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-kit"
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    My Adventure Kit
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    About This Project
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="mobile-drawer-footer">
              <Link to="/adventures" className="btn btn-primary w-full">
                <span>Explore adventures</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <p className="mobile-drawer-disclaimer">
                Unofficial recruitment concept for the Adventure Club, University of Kelaniya.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

