import { useState, useEffect, useCallback } from 'react';
import { loadSavedAdventures, persistSavedAdventures } from '../utils/storage';

export function useSavedAdventures() {
  const [savedIds, setSavedIds] = useState<string[]>(() => loadSavedAdventures());

  useEffect(() => {
    persistSavedAdventures(savedIds);
  }, [savedIds]);

  const toggleSave = useCallback((adventureId: string) => {
    setSavedIds((prev) => {
      if (prev.includes(adventureId)) {
        return prev.filter((id) => id !== adventureId);
      }
      return [...prev, adventureId];
    });
  }, []);

  const isSaved = useCallback(
    (adventureId: string) => savedIds.includes(adventureId),
    [savedIds]
  );

  const clearAllSaved = useCallback(() => {
    setSavedIds([]);
  }, []);

  return {
    savedIds,
    toggleSave,
    isSaved,
    clearAllSaved,
    savedCount: savedIds.length,
  };
}
