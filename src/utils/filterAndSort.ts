import { Adventure, AdventureFiltersState } from '../types';

/**
 * Pure function to filter and sort adventures based on user filter criteria.
 * Always creates a shallow clone before sorting to guarantee no mutation of the original array.
 */
export function filterAndSortAdventures(
  adventures: Adventure[],
  filters: AdventureFiltersState,
  savedIds: string[]
): Adventure[] {
  const query = filters.searchQuery.trim().toLowerCase();

  const filtered = adventures.filter((adv) => {
    // 1. Search filter (title, location, short description, category)
    if (query.length > 0) {
      const matchTitle = adv.title.toLowerCase().includes(query);
      const matchLocation = adv.location.toLowerCase().includes(query);
      const matchCategory = adv.category.toLowerCase().includes(query);
      const matchDesc = adv.shortDescription.toLowerCase().includes(query);

      if (!matchTitle && !matchLocation && !matchCategory && !matchDesc) {
        return false;
      }
    }

    // 2. Category filter
    if (filters.category !== 'All' && adv.category !== filters.category) {
      return false;
    }

    // 3. Difficulty filter
    if (filters.difficulty !== 'All' && adv.difficulty !== filters.difficulty) {
      return false;
    }

    // 4. Saved only filter
    if (filters.savedOnly && !savedIds.includes(adv.id)) {
      return false;
    }

    return true;
  });

  // Sort a cloned array so original array remains unmodified
  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'date-asc':
        return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
      case 'date-desc':
        return new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime();
      case 'price-asc':
        return a.priceLKR - b.priceLKR;
      case 'price-desc':
        return b.priceLKR - a.priceLKR;
      default:
        return 0;
    }
  });
}
