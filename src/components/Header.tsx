import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Bookmark, Menu, X } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  savedCount: number;
}

const officialLinks = [
  { label: 'About Us', href: 'https://ac-uok.netlify.app/aboutus.html' },
  { label: 'Adventurer Diaries', href: 'https://ac-uok.netlify.app/blog.html' },
];

export const Header: React.FC<HeaderProps> = ({ savedCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileMenuOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const adventureLink = (
    <NavLink to="/adventures" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
      Adventures
      {savedCount > 0 && <span className="saved-badge" title={`${savedCount} saved adventures`}><Bookmark size={12} aria-hidden="true" /><span>{savedCount}</span></span>}
    </NavLink>
  );

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="brand-logo" aria-label="Adventure Club University of Kelaniya home">
          <img className="brand-mark" src="/adventure-club-logo.png" alt="" />
          <span className="brand-text">
            <span className="brand-title">Adventure Club</span>
            <span className="brand-subtitle">University of Kelaniya</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links">
            <li><NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
            {officialLinks.map((item) => <li key={item.label}><a className="nav-link" href={item.href}>{item.label}</a></li>)}
            <li>{adventureLink}</li>
          </ul>
          <div className="nav-actions">
            <a href="https://ac-uok.netlify.app/contact.html" className="btn btn-primary btn-sm">Join Us <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </nav>

        <button type="button" className="mobile-toggle" aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMobileMenuOpen((open) => !open)}>
          {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-drawer-header">
              <span className="brand-title">Adventure Club</span>
              <button type="button" className="drawer-close-btn" aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)}><X size={22} aria-hidden="true" /></button>
            </div>
            <nav aria-label="Mobile Navigation">
              <ul className="mobile-nav-links">
                <li><NavLink to="/" end className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
                {officialLinks.map((item) => <li key={item.label}><a className="mobile-nav-link" href={item.href}>{item.label}</a></li>)}
                <li><NavLink to="/adventures" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Adventures</NavLink></li>
                <li><a href="https://ac-uok.netlify.app/contact.html" className="btn btn-primary mobile-nav-cta">Join Us <ArrowRight size={16} aria-hidden="true" /></a></li>
              </ul>
            </nav>
            <p className="mobile-nav-note">Adventure Club, University of Kelaniya.</p>
          </div>
        </div>
      )}
    </header>
  );
};
