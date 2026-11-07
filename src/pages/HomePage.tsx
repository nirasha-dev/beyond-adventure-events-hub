import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Backpack,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  Search,
  BookOpen,
} from 'lucide-react';
import { ADVENTURES_DATA } from '../data/adventures';
import { EventCard } from '../components/EventCard';
import './HomePage.css';

interface HomePageProps {
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}

const FAQS = [
  {
    question: 'Is this an official club website?',
    answer:
      'No. BEYOND is an independent, unofficial concept website created by Nirasha Ranasinghe specifically for the University of Kelaniya Adventure Club recruitment assignment. Please use the club’s official channels for executive board information and announcements.',
  },
  {
    question: 'Are these real events?',
    answer:
      'All events listed on this platform are illustrative concepts developed to demonstrate technical functionality, UI ergonomics, and student trip preparation tools. They do not represent scheduled university club departures.',
  },
  {
    question: 'Does the registration form make a real booking?',
    answer:
      'No. The registration dialog is purely a frontend demonstration. When you submit the form, it validates your input locally and displays a simulated confirmation. No data is stored, sent across the network, or booked with any organiser.',
  },
  {
    question: 'Where are my saved adventures and packing lists stored?',
    answer:
      'Everything is stored locally on this specific browser and device using LocalStorage. We do not use remote servers, trackers, or cookies. If you clear your browser site data or switch browsers, your saved progress will reset to default sample values.',
  },
  {
    question: 'Do I need previous adventure experience?',
    answer:
      'In a real university club setting, events are graded (Easy, Moderate, Challenging) so newcomers can start with foundational camps like "Under the Stars" before advancing to mountain traverses or white-water river expeditions. Each event overview provides clear gear lists and fitness expectations.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ isSaved, onToggleSave }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const nextAdventure = [...ADVENTURES_DATA]
    .filter((adventure) => adventure.eventStatus === 'Upcoming')
    .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime())[0];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-background-image" />
        <div className="hero-scrim" />

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <Compass size={16} aria-hidden="true" />
              <span>University of Kelaniya Adventure Club</span>
            </div>

            <h1 id="hero-title" className="hero-title">
              We are the <br />
              <span className="hero-title-accent">Adventure Club.</span>
            </h1>

            <p className="hero-description lead">
              A community of like-minded undergraduates building skills, friendships and a lasting passion for adventure.
            </p>

            <div className="hero-actions">
              <Link to="/adventures" className="btn btn-primary btn-lg">
                <span>Explore Adventures</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/my-kit" className="btn btn-secondary btn-lg hero-btn-secondary">
                <Backpack size={18} aria-hidden="true" />
                <span>Plan your next trip</span>
              </Link>
            </div>

            <div className="hero-disclaimer-pill">
              <ShieldAlert size={14} aria-hidden="true" />
              <span>Explore, prepare and adventure together</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Adventures Section */}
      <section className="section featured-section" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Curated Expeditions</span>
              <h2 id="featured-title" className="section-title">
                Upcoming Adventures
              </h2>
            </div>
            <Link to="/adventures" className="btn btn-secondary btn-sm section-more-link">
              <span>View All Adventures</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="adventures-grid">
            {nextAdventure && (
              <EventCard
                key={nextAdventure.id}
                adventure={nextAdventure}
                isSaved={isSaved(nextAdventure.id)}
                onToggleSave={onToggleSave}
              />
            )}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section how-it-works-section" aria-labelledby="how-title">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">The Student Journey</span>
            <h2 id="how-title" className="section-title">
              How Adventures Works
            </h2>
            <p className="section-subtitle">
              Three simple steps designed to take the guesswork out of student outdoor expeditions.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <Search size={24} aria-hidden="true" />
              </div>
              <h3 className="step-title">Find your adventure</h3>
              <p className="step-desc">
                Filter sample expeditions by terrain, difficulty, and cost share. Save bookmarks for trips you want to inspect with friends.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <BookOpen size={24} aria-hidden="true" />
              </div>
              <h3 className="step-title">Know the plan</h3>
              <p className="step-desc">
                Review verified hourly itineraries, gear inclusions, and clear physical guidelines before committing your weekend.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <Backpack size={24} aria-hidden="true" />
              </div>
              <h3 className="step-title">Pack and get ready</h3>
              <p className="step-desc">
                Use your interactive Adventure Kit checklist. Add custom personal items, track readiness percentages, and print cleanly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Feature Spotlight */}
      <section className="section prep-spotlight-section">
        <div className="container">
          <div className="spotlight-card">
            <div className="spotlight-content">
              <span className="spotlight-badge">
                <Sparkles size={14} aria-hidden="true" />
                Featured Tool
              </span>
              <h2 className="spotlight-title">
                Never leave your rain poncho behind again.
              </h2>
              <p className="spotlight-description">
                Packing for Knuckles mist or Kitulgala rapids is different from a regular university day trip. <strong>My Adventure Kit</strong> gives you a tailored gear checklist for each expedition with progress tracking that stays on your device.
              </p>
              <ul className="spotlight-perks">
                <li>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>Category-grouped checklists (Clothing, Food, Gear, Essentials)</span>
                </li>
                <li>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>Add, rename and manage your own custom items</span>
                </li>
                <li>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>Clean printable layout for packing at home</span>
                </li>
              </ul>
              <div className="spotlight-actions">
                <Link to="/my-kit" className="btn btn-primary">
                  <Backpack size={18} aria-hidden="true" />
                  <span>Open My Adventure Kit</span>
                </Link>
              </div>
            </div>

            <div className="spotlight-preview-panel" aria-hidden="true">
              <div className="preview-floating-card">
                <div className="preview-header">
                  <span className="preview-title">Beyond the Mist Checklist</span>
                  <span className="preview-pill">67% Ready</span>
                </div>
                <div className="preview-item done">
                  <span className="preview-check">✓</span>
                  <span>Rain jacket / windbreaker</span>
                </div>
                <div className="preview-item done">
                  <span className="preview-check">✓</span>
                  <span>Leech socks (1 pair)</span>
                </div>
                <div className="preview-item done">
                  <span className="preview-check">✓</span>
                  <span>2.5L Hydration bladder</span>
                </div>
                <div className="preview-item pending">
                  <span className="preview-box"></span>
                  <span>Headlamp + spare batteries</span>
                </div>
                <div className="preview-footer">
                  <span>Saved on this browser & device</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section faqs-section" aria-labelledby="faqs-title">
        <div className="container faqs-container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Clarity & Transparency</span>
            <h2 id="faqs-title" className="section-title">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle">
              Distinguishing this recruitment project demonstration from official club operations.
            </p>
          </div>

          <div className="faqs-list" role="region" aria-label="Frequently Asked Questions">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      className="faq-answer-panel"
                      role="region"
                    >
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
