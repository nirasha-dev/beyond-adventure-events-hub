import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Compass,
  Heart,
  ShieldCheck,
  Code2,
  Layers,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import './AboutPage.css';

export const AboutPage: React.FC = () => {
  const location = useLocation();

  // Handle anchor scroll.
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  return (
    <div className="about-page">
      {/* Header Banner */}
      <section className="about-header-section">
        <div className="container">
          <div className="about-eyebrow">
            <Compass size={16} aria-hidden="true" />
            <span>Recruitment Assignment Project</span>
          </div>
          <h1 className="about-title">About BEYOND</h1>
          <p className="about-lead lead">
            A student-centered adventure discovery and preparation hub built for the University of Kelaniya Adventure Club recruitment assignment by Nirasha Ranasinghe.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="container about-body-container">
        {/* Recruitment Assignment Context */}
        <section className="about-card" aria-labelledby="context-heading">
          <div className="card-heading-group">
            <ShieldCheck size={24} className="card-accent-icon" aria-hidden="true" />
            <h2 id="context-heading">Recruitment Assignment Context</h2>
          </div>
          <p>
            This web application was designed and engineered by <strong>Nirasha Ranasinghe</strong>, an undergraduate student at the <strong>University of Kelaniya</strong>, as an independent technical project for the <strong>Adventure Club</strong> recruitment evaluation.
          </p>
          <div className="context-notice-callout">
            <p>
              <strong>Important Scope & Identity Disclosure:</strong>
              <br />
              The University of Kelaniya Adventure Club maintains its own official channels. <strong>BEYOND</strong> is not a replacement, nor is it officially commissioned or endorsed by the university or club. It serves as a creative, standalone proof-of-concept exploring how digital tools can enhance expedition preparedness and trip confidence for university students.
            </p>
          </div>
        </section>

        {/* The Problem & Solution */}
        <section className="about-card" aria-labelledby="problem-heading">
          <div className="card-heading-group">
            <Sparkles size={24} className="card-accent-icon" aria-hidden="true" />
            <h2 id="problem-heading">The Problem We Address</h2>
          </div>
          <div className="two-column-story">
            <div>
              <h3 className="story-subheading">The Student Barrier</h3>
              <p>
                Many undergraduates hesitate to join outdoor adventures not because they lack interest, but because of <em>logistical uncertainty</em>:
              </p>
              <ul className="bullet-list">
                <li>What gear will the club provide versus what must I bring?</li>
                <li>How cold does it get at Knuckles at night, and what are leech risks?</li>
                <li>Is white-water rafting suitable for beginners who aren't varsity swimmers?</li>
              </ul>
            </div>
            <div>
              <h3 className="story-subheading">The BEYOND Solution</h3>
              <p>
                BEYOND bridges this gap with <strong>transparent logistics</strong> and an <strong>interactive packing kit</strong>:
              </p>
              <ul className="bullet-list">
                <li>Hourly schedules outlining the exact pace and safety stops.</li>
                <li>Clear distinctions between shared club gear and personal items.</li>
                <li>A dynamic packing checklist that saves progress locally and prints cleanly.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Core Architecture & Technical Approach */}
        <section className="about-card" aria-labelledby="tech-heading">
          <div className="card-heading-group">
            <Code2 size={24} className="card-accent-icon" aria-hidden="true" />
            <h2 id="tech-heading">Technical Architecture & Stack</h2>
          </div>
          <p>
            Engineered with a minimalist, high-reliability frontend philosophy. Zero heavy external CSS frameworks or unnecessary backend complexity.
          </p>

          <div className="tech-stack-grid">
            <div className="tech-item">
              <span className="tech-name">React 18 & TypeScript</span>
              <span className="tech-desc">Strict type safety, custom hooks, and modular component architecture.</span>
            </div>
            <div className="tech-item">
              <span className="tech-name">Vite 6</span>
              <span className="tech-desc">Instant HMR development environment and optimized production bundling.</span>
            </div>
            <div className="tech-item">
              <span className="tech-name">Plain CSS & Design Tokens</span>
              <span className="tech-desc">
                Custom CSS custom properties (variables), high-contrast accessible typography, and print media queries.
              </span>
            </div>
            <div className="tech-item">
              <span className="tech-name">LocalStorage Engine</span>
              <span className="tech-desc">
                Versioned, event-isolated client-side persistence with graceful quota fallbacks.
              </span>
            </div>
            <div className="tech-item">
              <span className="tech-name">Lucide Icons</span>
              <span className="tech-desc">Accessible SVG icon system with semantic aria-hidden bindings.</span>
            </div>
            <div className="tech-item">
              <span className="tech-name">Vitest</span>
              <span className="tech-desc">Automated unit test coverage verifying filters, checklist math, and form validation.</span>
            </div>
          </div>
        </section>

        {/* Deliverables Checklist */}
        <section className="about-card" aria-labelledby="deliverables-heading">
          <div className="card-heading-group">
            <Layers size={24} className="card-accent-icon" aria-hidden="true" />
            <h2 id="deliverables-heading">Recruitment Assignment Deliverables</h2>
          </div>
          <ul className="deliverables-list">
            <li>
              <CheckCircle size={18} className="check-icon" aria-hidden="true" />
              <div>
                <strong>Working Web Project:</strong> Complete responsive single-page web app with client-side routing, filtering, interactive checklist, and simulated registration.
              </div>
            </li>
            <li>
              <CheckCircle size={18} className="check-icon" aria-hidden="true" />
              <div>
                <strong>Source Repository:</strong> Full source code, tests, documentation, and lockfile ready for GitHub version control.
              </div>
            </li>
            <li>
              <CheckCircle size={18} className="check-icon" aria-hidden="true" />
              <div>
                <strong>Static Hosting Readiness:</strong> SPA routing configurations for Netlify (<code>_redirects</code>) and Vercel (<code>vercel.json</code>) pre-configured.
              </div>
            </li>
          </ul>
        </section>

        {/* Creator Sign-off */}
        <section className="about-card creator-signature-card">
          <Heart size={24} className="creator-heart-icon" aria-hidden="true" />
          <div>
            <h3>Developed by Nirasha Ranasinghe</h3>
            <p className="signature-text">
              Undergraduate Student, University of Kelaniya, Sri Lanka.
              <br />
              Submitted for the Adventure Club recruitment task. Thank you for taking the time to review this concept!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
