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
    adventure.eventStatus === 'Completed'
      ? 'badge-closed'
      : adventure.registrationStatus === 'Open'
      ? 'badge-open'
      : adventure.registrationStatus === 'Waitlist' || adventure.registrationStatus === 'Full'
      ? 'badge-waitlist'
      : 'badge-closed';

  const isClosed =
    adventure.eventStatus !== 'Upcoming' ||
    adventure.registrationStatus === 'Closed' ||
    adventure.registrationStatus === 'Full';
  const statusLabel = adventure.eventStatus === 'Completed' ? 'Completed' : adventure.registrationStatus;

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
              <span className={`badge ${statusClass}`}>
                {statusLabel}
              </span>
              <span className="badge badge-demo-prominent">Sample Event — Illustrative Only</span>
            </div>

            {adventure.eventStatus === 'Upcoming' && (
              <section className="detail-section decision-section" aria-labelledby="decision-heading">
                <h2 id="decision-heading" className="detail-section-title">Before you join</h2>
                {adventure.tripUpdate && (
                  <div className="trip-update-callout" role="status">
                    <strong>Trip Update · {adventure.tripUpdate.date}</strong>
                    <span>{adventure.tripUpdate.title}: {adventure.tripUpdate.message}</span>
                  </div>
                )}
                <div className="decision-grid">
                  <div><strong>Fee</strong><span>{adventure.displayPrice}</span></div>
                  <div><strong>Registration deadline</strong><span>{adventure.registrationDeadline || 'To be confirmed'}</span></div>
                  <div><strong>Who can join</strong><span>{adventure.eligibility || 'To be confirmed by the committee.'}</span></div>
                  <div><strong>Beginner suitability</strong><span>{adventure.beginnerSuitability || 'See the trip briefing.'}</span></div>
                  <div><strong>Transport</strong><span>{adventure.transport || 'Details to be confirmed.'}</span></div>
                  <div><strong>Fee includes</strong><span>{adventure.feeIncludes?.join(', ') || 'See the registration notice.'}</span></div>
                </div>
                <Link to="/adventures#first-adventure-guide" className="guide-link">Read the First Adventure Guide →</Link>
              </section>
            )}

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
                {adventure.mapsUrl && (
                  <a href={adventure.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-link">Open in Maps</a>
                )}
              </div>
            </div>
          </section>

          {adventure.eventStatus === 'Upcoming' && adventure.packingProvision && (
            <section className="detail-section" aria-labelledby="packing-provision-heading">
              <h2 id="packing-provision-heading" className="detail-section-title">Packing provisions</h2>
              <div className="provisions-grid">
                <div className="provision-box excluded-box"><h3 className="provision-box-title">Bring Your Own</h3><ul className="provision-list">{adventure.packingProvision.bringYourOwn.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div className="provision-box included-box"><h3 className="provision-box-title">Provided by the Club</h3><ul className="provision-list">{adventure.packingProvision.providedByClub.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div className="provision-box"><h3 className="provision-box-title">Available to Borrow</h3><ul className="provision-list">{adventure.packingProvision.availableToBorrow.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
            </section>
          )}

          {adventure.eventStatus === 'Completed' && (
            <>
              {adventure.recap && (
                <section className="detail-section archive-section" aria-labelledby="recap-heading">
                  <h2 id="recap-heading" className="detail-section-title">Trip recap</h2>
                  <p className="detail-body-text">{adventure.recap}</p>
                </section>
              )}
              {adventure.photos && adventure.photos.length > 0 && (
                <section className="detail-section archive-section" aria-labelledby="gallery-heading">
                  <h2 id="gallery-heading" className="detail-section-title">Photo gallery</h2>
                  <div className="archive-gallery">
                    {adventure.photos.map((photo) => (
                      <figure key={photo.image} className="archive-photo">
                        <a href={photo.image} target="_blank" rel="noopener noreferrer">
                          <img src={photo.image} alt={photo.alt} loading="lazy" />
                        </a>
                        <figcaption>{photo.caption}{photo.credit && <span>{photo.credit}</span>}</figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}
              {adventure.articles && adventure.articles.length > 0 && (
                <section className="detail-section archive-section" aria-labelledby="articles-heading">
                  <h2 id="articles-heading" className="detail-section-title">Articles & Diaries</h2>
                  <ul className="archive-links">
                    {adventure.articles.map((article) => <li key={article.title}><a href={article.url}>{article.title}</a><span>{article.source}</span></li>)}
                  </ul>
                </section>
              )}
              {adventure.participantExperiences && adventure.participantExperiences.length > 0 && (
                <section className="detail-section archive-section" aria-labelledby="experiences-heading">
                  <h2 id="experiences-heading" className="detail-section-title">Participant experiences</h2>
                  <div className="archive-quotes">
                    {adventure.participantExperiences.map((experience) => (
                      <blockquote key={experience.quote}><p>“{experience.quote}”</p>{experience.author && <cite>{experience.author}</cite>}</blockquote>
                    ))}
                  </div>
                </section>
              )}
              {adventure.resources && adventure.resources.length > 0 && (
                <section className="detail-section archive-section" aria-labelledby="resources-heading">
                  <h2 id="resources-heading" className="detail-section-title">Videos & resources</h2>
                  <ul className="archive-links">
                    {adventure.resources.map((resource) => <li key={resource.title}><a href={resource.url}>{resource.title}</a><span>{resource.source}</span></li>)}
                  </ul>
                </section>
              )}
            </>
          )}

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

              {!isClosed && (
                adventure.registrationLink ? (
                  <a href={adventure.registrationLink} className="btn btn-secondary w-full">Register for this adventure</a>
                ) : (
                  <button
                    ref={registerButtonRef}
                    type="button"
                    className="btn btn-secondary w-full"
                    onClick={() => setIsRegistrationOpen(true)}
                    aria-label={`Try demo registration for ${adventure.title}`}
                  >
                    <Sparkles size={16} aria-hidden="true" />
                    <span>Try demo registration</span>
                  </button>
                )
              )}

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
