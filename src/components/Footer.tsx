import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ExternalLink, Heart, ShieldAlert } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-col footer-brand-col">
            <div className="footer-brand">
              <span className="brand-icon">
                <Compass size={22} aria-hidden="true" />
              </span>
              <span className="brand-title">BEYOND</span>
            </div>
            <p className="footer-tagline">
              An interactive events hub concept designed to help university students explore Sri Lankan wilderness with confidence, clear logistics, and essential packing checklists.
            </p>
            <div className="creator-badge">
              <Heart size={14} className="creator-heart" aria-hidden="true" />
              <span>Created by <strong>Nirasha Ranasinghe</strong>, University of Kelaniya Undergraduate</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/adventures">Adventures Directory</Link>
              </li>
              <li>
                <Link to="/my-kit">My Adventure Kit</Link>
              </li>
              <li>
                <Link to="/about">About This Project</Link>
              </li>
              <li>
                <Link to="/about#credits">Photography & Asset Credits</Link>
              </li>
            </ul>
          </div>

          {/* Official reference */}
          <div className="footer-col">
            <h3 className="footer-heading">Club Reference</h3>
            <p className="footer-small-text">
              Looking for the official University of Kelaniya Adventure Club website, executive board, and club registrations?
            </p>
            <a
              href="https://ac-uok.netlify.app/home"
              target="_blank"
              rel="noopener noreferrer"
              className="official-club-link"
              aria-label="Visit official University of Kelaniya Adventure Club website (opens in new tab)"
            >
              <span>Visit Official Club Website</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Important Disclosure */}
          <div className="footer-col footer-disclosure-col">
            <div className="disclosure-card">
              <div className="disclosure-header">
                <ShieldAlert size={16} aria-hidden="true" />
                <span className="disclosure-title">Recruitment Assignment Notice</span>
              </div>
              <p className="disclosure-text">
                This website is a standalone, unofficial concept created exclusively for the Adventure Club recruitment assignment. All listed events, schedules, fees, and registration flows are illustrative demonstrations and do not represent actual university bookings or official endorsements.
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} BEYOND — Conceptual UI/UX assignment by Nirasha Ranasinghe. Built with React, TypeScript & Vite.
          </p>
          <div className="footer-bottom-links">
            <Link to="/about" className="footer-sublink">
              Project Details & Architecture
            </Link>
            <span className="bullet-sep" aria-hidden="true">•</span>
            <Link to="/about#credits" className="footer-sublink">
              Asset Credits
            </Link>
            <span className="bullet-sep" aria-hidden="true">•</span>
            <a
              href="https://github.com/nirasha-dev/beyond-adventure-events-hub-"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-sublink"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

