import React from 'react';
import { Compass } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <aside className="disclaimer-banner" aria-label="Recruitment assignment disclosure">
      <Compass size={14} aria-hidden="true" />
      <span>
        <strong>Unofficial Concept:</strong> Created by Nirasha Ranasinghe for the University of Kelaniya Adventure Club recruitment assignment. All listed events are illustrative.
      </span>
    </aside>
  );
};
