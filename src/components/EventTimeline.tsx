import React from 'react';
import { Clock } from 'lucide-react';
import { ItineraryItem } from '../types';
import './EventTimeline.css';

interface EventTimelineProps {
  items: ItineraryItem[];
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ items }) => {
  // Group itinerary items by day if days are present
  const groupedByDay: { [day: string]: ItineraryItem[] } = {};

  items.forEach((item) => {
    const dayKey = item.day || 'Schedule';
    if (!groupedByDay[dayKey]) {
      groupedByDay[dayKey] = [];
    }
    groupedByDay[dayKey].push(item);
  });

  return (
    <div className="timeline-container">
      {Object.entries(groupedByDay).map(([dayTitle, dayItems]) => (
        <div key={dayTitle} className="timeline-day-block">
          <div className="day-badge-header">
            <span className="day-pill">{dayTitle}</span>
          </div>

          <ol className="timeline-list">
            {dayItems.map((item, index) => (
              <li key={`${dayTitle}-${index}`} className="timeline-item">
                <div className="timeline-marker" aria-hidden="true">
                  <div className="timeline-dot" />
                  {index < dayItems.length - 1 && <div className="timeline-line" />}
                </div>

                <div className="timeline-content">
                  <div className="timeline-time">
                    <Clock size={13} aria-hidden="true" />
                    <span>{item.time}</span>
                  </div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

