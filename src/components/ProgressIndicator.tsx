import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { ProgressSummary } from '../utils/checklistMath';
import './ProgressIndicator.css';

interface ProgressIndicatorProps {
  progress: ProgressSummary;
  eventName?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  eventName,
}) => {
  const { total, packed, percentage, isComplete } = progress;

  const valueText = `${packed} of ${total} items packed (${percentage}% ready)`;

  return (
    <div className={`progress-card ${isComplete ? 'complete' : ''}`}>
      <div className="progress-header">
        <div className="progress-title-block">
          <span className="progress-eyebrow">Packing Readiness</span>
          <h4 className="progress-count-text">
            <strong>{packed}</strong> of <strong>{total}</strong> items packed
            <span className="percentage-pill">{percentage}% ready</span>
          </h4>
        </div>

        {isComplete && (
          <div className="complete-badge" aria-live="polite">
            <Sparkles size={16} aria-hidden="true" />
            <span>Ready for the Trail!</span>
          </div>
        )}
      </div>

      {/* Accessible Progress Bar */}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={valueText}
        aria-label={`Packing readiness progress${eventName ? ` for ${eventName}` : ''}`}
      >
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Status note */}
      <div className="progress-footer-note">
        {isComplete ? (
          <p className="complete-message">
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>
              All set! Your essentials for <strong>{eventName || 'this adventure'}</strong> are ticked off. Double-check your pack weight before departure!
            </span>
          </p>
        ) : (
          <p className="pending-message">
            {total - packed} {total - packed === 1 ? 'item' : 'items'} left to pack. Ticking items persists locally to your browser automatically.
          </p>
        )}
      </div>
    </div>
  );
};

