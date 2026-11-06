import React from 'react';
import { Search, X, SlidersHorizontal, Bookmark, RotateCcw } from 'lucide-react';
import { AdventureCategory, AdventureDifficulty, AdventureFiltersState, SortOption } from '../types';
import './EventFilters.css';

interface EventFiltersProps {
  filters: AdventureFiltersState;
  onChange: (updater: (prev: AdventureFiltersState) => AdventureFiltersState) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
  savedCount: number;
}

const CATEGORIES: ('All' | AdventureCategory)[] = [
  'All',
  'Hiking',
  'Camping',
  'Water activities',
];

const DIFFICULTIES: ('All' | AdventureDifficulty)[] = [
  'All',
  'Easy',
  'Moderate',
  'Challenging',
];

export const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
  filteredCount,
  savedCount,
}) => {
  const hasActiveFilters =
    filters.searchQuery.trim().length > 0 ||
    filters.category !== 'All' ||
    filters.difficulty !== 'All' ||
    filters.savedOnly ||
    filters.sortBy !== 'date-asc';

  return (
    <section className="event-filters-wrapper" aria-label="Filter and search adventures">
      <div className="filters-top-bar">
        {/* Search Input */}
        <div className="search-input-wrapper">
          <label htmlFor="adventure-search-input" className="sr-only">
            Search adventures by title, location or keywords
          </label>
          <Search size={18} className="search-icon" aria-hidden="true" />
          <input
            id="adventure-search-input"
            type="search"
            value={filters.searchQuery}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            placeholder="Search by title, location, or keyword..."
            className="search-input"
          />
          {filters.searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onChange((prev) => ({ ...prev, searchQuery: '' }))}
              aria-label="Clear search text"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Saved Only Filter Toggle */}
        <button
          type="button"
          className={`filter-toggle-btn ${filters.savedOnly ? 'active' : ''}`}
          onClick={() => onChange((prev) => ({ ...prev, savedOnly: !prev.savedOnly }))}
          aria-pressed={filters.savedOnly}
          aria-label={
            filters.savedOnly ? 'Show all adventures' : 'Show only saved adventures'
          }
        >
          <Bookmark size={16} fill={filters.savedOnly ? 'currentColor' : 'none'} aria-hidden="true" />
          <span>Saved only</span>
          {savedCount > 0 && <span className="toggle-count-badge">{savedCount}</span>}
        </button>

        {/* Sort Select */}
        <div className="sort-select-wrapper">
          <label htmlFor="adventure-sort-select" className="sort-label">
            Sort by:
          </label>
          <select
            id="adventure-sort-select"
            value={filters.sortBy}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, sortBy: e.target.value as SortOption }))
            }
            className="sort-select"
          >
            <option value="date-asc">Date: Soonest first</option>
            <option value="date-desc">Date: Furthest first</option>
            <option value="price-asc">Price: Lowest first</option>
            <option value="price-desc">Price: Highest first</option>
          </select>
        </div>
      </div>

      {/* Filter Row 2: Categories and Difficulty */}
      <div className="filters-secondary-row">
        {/* Category Pills */}
        <fieldset className="category-pills-group">
          <legend className="filter-legend">Activity Category:</legend>
          <div className="pills-container" role="radiogroup" aria-label="Activity Category">
            {CATEGORIES.map((cat) => {
              const isSelected = filters.category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`pill-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => onChange((prev) => ({ ...prev, category: cat }))}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Difficulty Selector */}
        <div className="difficulty-filter-group">
          <label htmlFor="difficulty-select" className="filter-legend">
            Difficulty:
          </label>
          <select
            id="difficulty-select"
            value={filters.difficulty}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                difficulty: e.target.value as 'All' | AdventureDifficulty,
              }))
            }
            className="filter-select"
          >
            {DIFFICULTIES.map((diff) => (
              <option key={diff} value={diff}>
                {diff === 'All' ? 'All Difficulties' : diff}
              </option>
            ))}
          </select>
        </div>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <button
            type="button"
            className="clear-filters-btn"
            onClick={onReset}
            aria-label="Clear all active filters and reset view"
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Results Count & Active Status */}
      <div className="filters-status-bar" aria-live="polite">
        <div className="result-count">
          <SlidersHorizontal size={14} aria-hidden="true" />
          <span>
            Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> adventures
          </span>
        </div>
        {filters.savedOnly && (
          <span className="active-mode-notice">
            Viewing saved bookmarks only
          </span>
        )}
      </div>
    </section>
  );
};

