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

export const AdventuresPage: React.FC<AdventuresPageProps> = ({
  isSaved,
  onToggleSave,
  savedIds,
}) => {
  const [filters, setFilters] = useState<AdventureFiltersState>(DEFAULT_FILTERS);

  const filteredAdventures = useMemo(() => {
    return filterAndSortAdventures(ADVENTURES_DATA, filters, savedIds);
  }, [filters, savedIds]);

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
            <span>Illustrative Expeditions Directory</span>
          </div>
          <h1 className="adventures-page-title">Explore Adventures</h1>
          <p className="adventures-page-lead lead">
            Browse upcoming student expeditions, compare terrain requirements, and check illustrative cost allocations before preparing your kit.
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

        {/* Content Grid or Empty States */}
        {filteredAdventures.length > 0 ? (
          <div className="adventures-grid" role="region" aria-label="Adventures list">
            {filteredAdventures.map((adventure) => (
              <EventCard
                key={adventure.id}
                adventure={adventure}
                isSaved={isSaved(adventure.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        ) : filters.savedOnly ? (
          <EmptyState
            title="No saved adventures yet"
            description="You haven't bookmarked any expeditions yet. Click the bookmark icon on any adventure card to save it for quick review."
            actionLabel="Show all adventures"
            onAction={() => setFilters((prev) => ({ ...prev, savedOnly: false }))}
            icon={<Bookmark size={36} aria-hidden="true" />}
          />
        ) : (
          <EmptyState
            title="No matching adventures found"
            description={`We couldn't find any expeditions matching your current search or filter criteria. Try adjusting your query or resetting all filters.`}
            actionLabel="Reset all filters"
            onAction={handleResetFilters}
            icon={<AlertCircle size={36} aria-hidden="true" />}
          />
        )}
      </section>
    </div>
  );
};
