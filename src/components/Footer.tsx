import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-col footer-brand-col">
            <div className="footer-brand">
              <img className="brand-mark" src="/adventure-club-logo.png" alt="" />
              <span className="brand-title">Adventure Club</span>
            </div>
            <p className="footer-tagline">
              A community of University of Kelaniya undergraduates passionate about adventure, skills development and environmental conservation.
            </p>
            <div className="creator-badge">
              <span>University of Kelaniya • Adventure Club</span>
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
                <Link to="/adventures">Adventures</Link>
              </li>
              <li>
              </li>
            </ul>
          </div>

          {/* Official reference */}
          <div className="footer-col">
            <h3 className="footer-heading">Club Reference</h3>
            <p className="footer-small-text">
              This independent concept is not the official club website and does not publish club news or membership updates.
            </p>
            <a
              href="https://ac-uok.netlify.app/home"
              target="_blank"
              rel="noopener noreferrer"
              className="official-club-link"
              aria-label="Visit the official University of Kelaniya Adventure Club website"
            >
              Visit the official club website
            </a>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} Adventure Club, University of Kelaniya.
          </p>
          <div className="footer-bottom-links">
            <Link to="/about" className="footer-sublink">
              Project Details & Architecture
            </Link>
            <span className="bullet-sep" aria-hidden="true">•</span>
            <a
              href="https://github.com/nirasha-dev/beyond-adventure-events-hub"
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
