import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Gauge, Bookmark, ArrowUpRight } from 'lucide-react';
import { Adventure } from '../types';
import './EventCard.css';

interface EventCardProps {
  adventure: Adventure;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  adventure,
  isSaved,
  onToggleSave,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSave(adventure.id);
  };

  const statusClass =
    adventure.registrationStatus === 'Open'
      ? 'badge-open'
      : adventure.registrationStatus === 'Waitlist'
      ? 'badge-waitlist'
      : 'badge-closed';

  return (
    <article className="adventure-card">
      {/* Visual media header */}
      <div className="card-media-wrapper">
        <img
          src={
            imageError
              ? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
              : adventure.image
          }
          alt={adventure.imageAlt}
          className="card-image"
          loading="lazy"
          onError={() => setImageError(true)}
        />
        <div className="card-media-overlay" />

        {/* Top Badges */}
        <div className="card-badges-top">
          <span className="badge badge-category">{adventure.category}</span>
          <span className={`badge ${statusClass}`}>{adventure.registrationStatus}</span>
        </div>

        {/* Save / Bookmark Button */}
        <button
          type="button"
          className={`card-bookmark-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleBookmarkClick}
          aria-pressed={isSaved}
          aria-label={
            isSaved
              ? `Remove ${adventure.title} from saved adventures`
              : `Save ${adventure.title} to saved adventures`
          }
          title={isSaved ? 'Saved to your adventures' : 'Save for later'}
        >
          <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>

        <span className="card-demo-tag">Sample Event</span>
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        <div className="card-location">
          <MapPin size={14} aria-hidden="true" />
          <span>{adventure.location}</span>
        </div>

        <h3 className="card-title">
          <Link to={`/adventures/${adventure.slug}`} className="card-title-link">
            {adventure.title}
          </Link>
        </h3>

        <p className="card-description">{adventure.shortDescription}</p>

        {/* Metadata Chips */}
        <div className="card-meta-grid">
          <div className="meta-item" title="Sample expedition dates">
            <Calendar size={14} aria-hidden="true" />
            <span>{adventure.displayDates}</span>
          </div>
          <div className="meta-item" title="Duration">
            <Clock size={14} aria-hidden="true" />
            <span>{adventure.duration}</span>
          </div>
          <div className="meta-item" title="Difficulty level">
            <Gauge size={14} aria-hidden="true" />
            <span>{adventure.difficulty}</span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="card-footer">
          <div className="card-price-block">
            <span className="price-label">Cost share</span>
            <span className="price-value">{adventure.displayPrice}</span>
          </div>

          <Link
            to={`/adventures/${adventure.slug}`}
            className="btn btn-secondary btn-sm card-action-btn"
            aria-label={`View details for ${adventure.title}`}
          >
            <span>View details</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};
