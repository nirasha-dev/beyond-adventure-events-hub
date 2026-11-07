import React, { useState, useMemo } from 'react';
import { Compass, Bookmark, AlertCircle } from 'lucide-react';
import { ADVENTURES_DATA } from '../data/adventures';
import { AdventureFiltersState } from '../types';
import { filterAndSortAdventures } from '../utils/filterAndSort';
import { EventCard } from '../components/EventCard';
import { EventFilters } from '../components/EventFilters';
import { EmptyState } from '../components/EmptyState';
import './AdventuresPage.css';

interface AdventuresPageProps {
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
  savedIds: string[];
}

const DEFAULT_FILTERS: AdventureFiltersState = {
  searchQuery: '',
  category: 'All',
  difficulty: 'All',
  savedOnly: false,
  sortBy: 'date-asc',
};

const sectionId = (title: string) => title.toLowerCase().replace(/ /g, '-');

export const AdventuresPage: React.FC<AdventuresPageProps> = ({
  isSaved,
  onToggleSave,
  savedIds,
}) => {
  const [filters, setFilters] = useState<AdventureFiltersState>(DEFAULT_FILTERS);

  const filteredAdventures = useMemo(() => {
    return filterAndSortAdventures(ADVENTURES_DATA, filters, savedIds);
  }, [filters, savedIds]);
  const upcomingAdventures = filteredAdventures.filter((adventure) => adventure.eventStatus === 'Upcoming');
  const pastAdventures = filteredAdventures
    .filter((adventure) => adventure.eventStatus === 'Completed')
    .sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime());

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="adventures-page">
      {/* Header Banner */}
      <section className="adventures-header-section">
        <div className="container">
          <div className="header-meta-eyebrow">
            <Compass size={16} aria-hidden="true" />
            <span>Adventure Club • University of Kelaniya</span>
          </div>
          <h1 className="adventures-page-title">Adventures</h1>
          <p className="adventures-page-lead lead">
            Find an activity that fits your crew, see what to expect, and get ready for the next Adventure Club experience.
          </p>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="container adventures-listing-container">
        {/* Filter Controls */}
        <EventFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          totalCount={ADVENTURES_DATA.length}
          filteredCount={filteredAdventures.length}
          savedCount={savedIds.length}
        />
        <div className="first-adventure-guide" id="first-adventure-guide">
          <div>
            <span className="section-eyebrow">First Adventure Guide</span>
            <h2>Start with the right trip</h2>
            <p>Choose a difficulty that matches your comfort, check the eligibility and fee details, register on the trip page, then use its packing checklist to prepare.</p>
          </div>
          <ol>
            <li>Compare activity, difficulty and beginner suitability.</li>
            <li>Read the trip update, deadline and meeting point.</li>
            <li>Register, check what the club provides, and pack your own essentials.</li>
          </ol>
        </div>

        <AdventureSection
          title="Upcoming Adventures"
          description="Plan your next club experience, from first briefing to final trail."
          adventures={upcomingAdventures}
          isSaved={isSaved}
          onToggleSave={onToggleSave}
          emptyTitle={filters.savedOnly ? 'No saved upcoming adventures' : 'No upcoming adventures match this filter'}
          onReset={filters.savedOnly ? () => setFilters((prev) => ({ ...prev, savedOnly: false })) : handleResetFilters}
          emptyAction={filters.savedOnly ? 'Show all adventures' : 'Reset all filters'}
          icon={filters.savedOnly ? <Bookmark size={36} aria-hidden="true" /> : <AlertCircle size={36} aria-hidden="true" />}
        />
        <AdventureSection
          title="Past Adventures"
          description="Explore completed trips, recaps, photos, and participant stories."
          adventures={pastAdventures}
          isSaved={isSaved}
          onToggleSave={onToggleSave}
          emptyTitle="No past adventures match this filter"
          onReset={handleResetFilters}
          emptyAction="Reset all filters"
          icon={<AlertCircle size={36} aria-hidden="true" />}
        />
      </section>
    </div>
  );
};

interface AdventureSectionProps {
  title: string;
  description: string;
  adventures: typeof ADVENTURES_DATA;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
  emptyTitle: string;
  emptyAction: string;
  onReset: () => void;
  icon: React.ReactNode;
}

const AdventureSection: React.FC<AdventureSectionProps> = ({
  title,
  description,
  adventures,
  isSaved,
  onToggleSave,
  emptyTitle,
  emptyAction,
  onReset,
  icon,
}) => (
  <section className="adventure-list-section" aria-labelledby={`${sectionId(title)}-heading`}>
    <div className="adventure-section-heading">
      <div>
        <h2 id={`${sectionId(title)}-heading`}>{title}</h2>
        <p>{description}</p>
      </div>
      <span className="section-count">{adventures.length} {adventures.length === 1 ? 'trip' : 'trips'}</span>
    </div>
    {adventures.length > 0 ? (
      <div className="adventures-grid" role="region" aria-label={title}>
        {adventures.map((adventure) => (
          <EventCard key={adventure.id} adventure={adventure} isSaved={isSaved(adventure.id)} onToggleSave={onToggleSave} />
        ))}
      </div>
    ) : (
      <EmptyState
        title={emptyTitle}
        description="Try another activity category or reset the filters to see more club trips."
        actionLabel={emptyAction}
        onAction={onReset}
        icon={icon}
      />
    )}
  </section>
);
