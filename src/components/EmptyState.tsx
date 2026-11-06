import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';
import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="empty-state-card" role="region" aria-label={title}>
      <div className="empty-state-icon">
        {icon || <Compass size={36} aria-hidden="true" />}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          className="btn btn-secondary btn-sm empty-state-btn"
          onClick={onAction}
        >
          <RotateCcw size={14} aria-hidden="true" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
