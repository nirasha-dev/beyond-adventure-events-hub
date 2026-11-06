import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Gauge,
  Bookmark,
  Backpack,
  Check,
  X,
  AlertTriangle,
  ShieldAlert,
  Compass,
  Sparkles,
  Info,
} from 'lucide-react';
import { ADVENTURES_DATA } from '../data/adventures';
import { EventTimeline } from '../components/EventTimeline';
import { RegistrationDialog } from '../components/RegistrationDialog';
import { EmptyState } from '../components/EmptyState';
import './EventDetailPage.css';

interface EventDetailPageProps {
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  isSaved,
  onToggleSave,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const [imageError, setImageError] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const registerButtonRef = useRef<HTMLButtonElement>(null);

  const adventure = ADVENTURES_DATA.find((adv) => adv.slug === slug);

  if (!adventure) {
    return (
      <div className="container" style={{ padding: '80px 20px' }}>
        <EmptyState
          title="Adventure not found"
          description={`We could not locate an adventure matching the slug "${slug}". It may have been relocated or does not exist.`}
          actionLabel="Return to all adventures"
          onAction={() => (window.location.href = '/adventures')}
          icon={<Compass size={40} />}
        />
      </div>
    );
  }

  const saved = isSaved(adventure.id);

  const statusClass =
    adventure.registrationStatus === 'Open'
      ? 'badge-open'
      : adventure.registrationStatus === 'Waitlist'
      ? 'badge-waitlist'
      : 'badge-closed';

  const isClosed = adventure.registrationStatus === 'Closed';

  return (
    <div className="event-detail-page">
      {/* Top Breadcrumb Bar */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <Link to="/adventures" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to all adventures</span>
          </Link>
        </div>
      </div>

      {/* Hero Media Banner */}
      <section className="detail-hero-section">
        <div className="container">
          <div className="detail-media-container">
            <img
              src={
                imageError
                  ? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80'
                  : adventure.image
              }
              alt={adventure.imageAlt}
              className="detail-hero-image"
              onError={() => setImageError(true)}
            />
            <div className="detail-media-overlay" />

            <div className="detail-media-badges">
              <span className="badge badge-category">{adventure.category}</span>
              <span className={`badge ${statusClass}`}>{adventure.registrationStatus}</span>
              <span className="badge badge-demo-prominent">Sample Event — Illustrative Only</span>
            </div>

            <div className="detail-media-caption">
              <span>Photo by {adventure.imageCredit.photographer} ({adventure.imageCredit.source})</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container detail-content-layout">
        {/* Left Column: Details, Overview, Timeline, Gear Lists */}
        <main className="detail-main-col">
          {/* Header Block */}
          <div className="detail-header-block">
            <div className="detail-location-row">
              <MapPin size={16} aria-hidden="true" />
              <span>{adventure.location}</span>
            </div>

            <h1 className="detail-title">{adventure.title}</h1>
            <p className="detail-tagline">{adventure.tagline}</p>

            {/* Quick Meta Strip */}
            <div className="detail-meta-strip">
              <div className="strip-item">
                <Calendar size={16} aria-hidden="true" />
                <div>
                  <span className="strip-label">Dates (Illustrative)</span>
                  <span className="strip-val">{adventure.displayDates}</span>
                  <span className="strip-sub">Timezone: {adventure.timezone}</span>
                </div>
              </div>

              <div className="strip-item">
                <Clock size={16} aria-hidden="true" />
                <div>
                  <span className="strip-label">Duration</span>
                  <span className="strip-val">{adventure.duration}</span>
                </div>
              </div>

              <div className="strip-item">
                <Gauge size={16} aria-hidden="true" />
                <div>
                  <span className="strip-label">Difficulty</span>
                  <span className="strip-val">{adventure.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <section className="detail-section" aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="detail-section-title">
              Expedition Overview
            </h2>
            <p className="detail-body-text">{adventure.detailedDescription}</p>

            <div className="meeting-point-callout">
              <Info size={18} className="callout-icon" aria-hidden="true" />
              <div>
                <strong>Sample Assembly & Meeting Point:</strong>
                <p>{adventure.meetingPoint}</p>
              </div>
            </div>
          </section>

          {/* Itinerary Timeline */}
          <section className="detail-section" aria-labelledby="itinerary-heading">
            <h2 id="itinerary-heading" className="detail-section-title">
              Hourly Expedition Itinerary
            </h2>
            <p className="detail-section-lead">
              A sample hour-by-hour operational schedule balancing trekking windows, hydration breaks, camp craft workshops, and safety debriefs.
            </p>
            <EventTimeline items={adventure.itinerary} />
          </section>

          {/* Included / Excluded Grid */}
          <section className="detail-section" aria-labelledby="logistics-heading">
            <h2 id="logistics-heading" className="detail-section-title">
              Logistics & Gear Provisions
            </h2>
            <div className="provisions-grid">
              <div className="provision-box included-box">
                <h3 className="provision-box-title">
                  <Check size={18} aria-hidden="true" />
                  <span>What is Included (Sample Pool)</span>
                </h3>
                <ul className="provision-list">
                  {adventure.included.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="provision-box excluded-box">
                <h3 className="provision-box-title">
                  <X size={18} aria-hidden="true" />
                  <span>What Participants Bring</span>
                </h3>
                <ul className="provision-list">
                  {adventure.excluded.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Preparation Notes & Safety Disclosures */}
          <section className="detail-section" aria-labelledby="prep-heading">
            <h2 id="prep-heading" className="detail-section-title">
              Preparation Notes & Terrain Guidelines
            </h2>
            <ul className="prep-notes-list">
              {adventure.preparationNotes.map((note, idx) => (
                <li key={idx}>
                  <AlertTriangle size={16} aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>

            {/* Special water activity disclosure if water activity */}
            <div className="safety-disclosure-card" role="note">
              <ShieldAlert size={20} className="safety-icon" aria-hidden="true" />
              <div>
                <h4>Certified Safety Notice</h4>
                <p>{adventure.safetyDisclosure}</p>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sticky Action Sidebar */}
        <aside className="detail-sidebar" aria-label="Expedition actions">
          <div className="sidebar-card">
            <div className="sidebar-price-header">
              <span className="sidebar-price-label">Illustrative Cost Share</span>
              <span className="sidebar-price-val">{adventure.displayPrice}</span>
              <span className="sidebar-price-sub">Covers chartered transit & shared camp fuel</span>
            </div>

            <div className="sidebar-status-box">
              <span className={`badge ${statusClass}`}>{adventure.registrationStatus}</span>
              <p className="sidebar-status-note">{adventure.registrationNote}</p>
            </div>

            {/* Primary Action Buttons */}
            <div className="sidebar-actions">
              <Link
                to={`/my-kit?event=${adventure.id}`}
                className="btn btn-primary w-full"
                aria-label={`Open packing kit for ${adventure.title}`}
              >
                <Backpack size={18} aria-hidden="true" />
                <span>Prepare my kit</span>
              </Link>

              <button
                ref={registerButtonRef}
                type="button"
                className="btn btn-secondary w-full"
                disabled={isClosed}
                onClick={() => setIsRegistrationOpen(true)}
                aria-label={
                  isClosed
                    ? 'Registration closed for this sample event'
                    : `Try demo registration for ${adventure.title}`
                }
              >
                <Sparkles size={16} aria-hidden="true" />
                <span>{isClosed ? 'Registration Closed' : 'Try demo registration'}</span>
              </button>

              <button
                type="button"
                className={`btn btn-ghost w-full sidebar-save-btn ${saved ? 'saved' : ''}`}
                onClick={() => onToggleSave(adventure.id)}
                aria-pressed={saved}
                aria-label={
                  saved
                    ? `Remove ${adventure.title} from saved adventures`
                    : `Save ${adventure.title} to saved adventures`
                }
              >
                <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
                <span>{saved ? 'Saved to my adventures' : 'Save this adventure'}</span>
              </button>
            </div>

            {/* Checklist summary callout */}
            <div className="sidebar-kit-teaser">
              <span className="teaser-heading">Interactive Gear Checklist</span>
              <p className="teaser-desc">
                Includes {adventure.defaultChecklist.length} pre-configured essentials across clothing, hydration, and outdoor gear.
              </p>
              <Link to={`/my-kit?event=${adventure.id}`} className="teaser-link">
                Review & customise checklist →
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Demo Registration Modal Dialog */}
      <RegistrationDialog
        adventure={adventure}
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        triggerRef={registerButtonRef}
      />
    </div>
  );
};

