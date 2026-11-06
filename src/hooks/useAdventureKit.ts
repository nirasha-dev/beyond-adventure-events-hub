import { useState, useEffect, useCallback } from 'react';
import { ChecklistItem, ChecklistCategory } from '../types';
import { ADVENTURES_DATA } from '../data/adventures';
import { loadStoredKitData, persistKitData } from '../utils/storage';
import { calculateProgress, ProgressSummary } from '../utils/checklistMath';
import { validateCustomChecklistItem } from '../utils/validation';

export function useAdventureKit(initialAdventureId?: string) {
  const [checklistsByEvent, setChecklistsByEvent] = useState<Record<string, ChecklistItem[]>>(
    () => loadStoredKitData(ADVENTURES_DATA)
  );

  const defaultId = initialAdventureId || ADVENTURES_DATA[0].id;
  const [activeAdventureId, setActiveAdventureId] = useState<string>(defaultId);

  // Sync to localStorage whenever checklists change
  useEffect(() => {
    persistKitData(checklistsByEvent);
  }, [checklistsByEvent]);

  // Retrieve current active adventure's checklist
  const currentChecklist: ChecklistItem[] =
    checklistsByEvent[activeAdventureId] ||
    ADVENTURES_DATA.find((a) => a.id === activeAdventureId)?.defaultChecklist ||
    [];

  const currentProgress: ProgressSummary = calculateProgress(currentChecklist);

  // Toggle packed state of an item
  const toggleItem = useCallback(
    (adventureId: string, itemId: string) => {
      setChecklistsByEvent((prev) => {
        const list = prev[adventureId] || [];
        const updated = list.map((item) =>
          item.id === itemId ? { ...item, isPacked: !item.isPacked } : item
        );
        return { ...prev, [adventureId]: updated };
      });
    },
    []
  );

  // Add custom item
  const addCustomItem = useCallback(
    (
      adventureId: string,
      category: ChecklistCategory,
      rawName: string
    ): { success: boolean; error?: string } => {
      const currentList = checklistsByEvent[adventureId] || [];
      const validation = validateCustomChecklistItem(rawName, currentList);

      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      // Generate a stable unique ID
      const newItem: ChecklistItem = {
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: validation.sanitizedName,
        category,
        isPacked: false,
        isCustom: true,
      };

      setChecklistsByEvent((prev) => {
        const list = prev[adventureId] || [];
        return {
          ...prev,
          [adventureId]: [...list, newItem],
        };
      });

      return { success: true };
    },
    [checklistsByEvent]
  );

  // Rename a custom item
  const renameCustomItem = useCallback(
    (
      adventureId: string,
      itemId: string,
      newName: string
    ): { success: boolean; error?: string } => {
      const currentList = checklistsByEvent[adventureId] || [];
      // Exclude this item itself during duplicate check
      const otherItems = currentList.filter((item) => item.id !== itemId);
      const validation = validateCustomChecklistItem(newName, otherItems);

      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      setChecklistsByEvent((prev) => {
        const list = prev[adventureId] || [];
        const updated = list.map((item) =>
          item.id === itemId ? { ...item, name: validation.sanitizedName } : item
        );
        return { ...prev, [adventureId]: updated };
      });

      return { success: true };
    },
    [checklistsByEvent]
  );

  // Remove a custom item
  const removeCustomItem = useCallback((adventureId: string, itemId: string) => {
    setChecklistsByEvent((prev) => {
      const list = prev[adventureId] || [];
      const updated = list.filter((item) => item.id !== itemId);
      return { ...prev, [adventureId]: updated };
    });
  }, []);

  // Reset packed status only (preserves custom items and list structure)
  const resetPackedStatus = useCallback((adventureId: string) => {
    setChecklistsByEvent((prev) => {
      const list = prev[adventureId] || [];
      const updated = list.map((item) => ({ ...item, isPacked: false }));
      return { ...prev, [adventureId]: updated };
    });
  }, []);

  return {
    activeAdventureId,
    setActiveAdventureId,
    currentChecklist,
    currentProgress,
    toggleItem,
    addCustomItem,
    renameCustomItem,
    removeCustomItem,
    resetPackedStatus,
    checklistsByEvent,
  };
}

