import { Adventure, ChecklistItem, StoredKitData, StoredSavedAdventures } from '../types';

export const STORAGE_KEYS = {
  KIT_DATA: 'beyond_adventure_kit_v1',
  SAVED_ADVENTURES: 'beyond_saved_adventures_v1',
} as const;

export const CURRENT_STORAGE_VERSION = 1;

/**
 * Checks whether localStorage is supported and accessible in the current browser session.
 */
export function isStorageAvailable(): boolean {
  try {
    const testKey = '__beyond_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Builds the initial default checklists map for all known adventures.
 * Uses deep copies to prevent unintentional reference mutation.
 */
export function buildInitialChecklists(adventures: Adventure[]): Record<string, ChecklistItem[]> {
  const map: Record<string, ChecklistItem[]> = {};
  for (const adv of adventures) {
    map[adv.id] = adv.defaultChecklist.map((item) => ({ ...item }));
  }
  return map;
}

/**
 * Loads the stored packing kit data from localStorage.
 * If data is missing, from an incompatible version, or corrupted, returns the default state safely.
 */
export function loadStoredKitData(adventures: Adventure[]): Record<string, ChecklistItem[]> {
  const defaults = buildInitialChecklists(adventures);

  if (!isStorageAvailable()) {
    return defaults;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.KIT_DATA);
    if (!raw) {
      return defaults;
    }

    const parsed = JSON.parse(raw) as Partial<StoredKitData>;

    // Version validation
    if (parsed.version !== CURRENT_STORAGE_VERSION || !parsed.checklistsByEvent) {
      return defaults;
    }

    // Merge each adventure's stored checklist with default items to ensure no missing defaults
    const result: Record<string, ChecklistItem[]> = { ...defaults };

    for (const adv of adventures) {
      const storedItems = parsed.checklistsByEvent[adv.id];
      if (Array.isArray(storedItems)) {
        // Sanitize stored items ensuring required fields exist
        const validItems: ChecklistItem[] = storedItems
          .filter(
            (item): item is ChecklistItem =>
              Boolean(item) &&
              typeof item.id === 'string' &&
              typeof item.name === 'string' &&
              typeof item.isPacked === 'boolean'
          )
          .map((item) => ({
            id: item.id,
            name: item.name.slice(0, 100), // Enforce length boundary
            category: item.category || 'Equipment',
            isPacked: Boolean(item.isPacked),
            isCustom: Boolean(item.isCustom),
            note: item.note ? String(item.note).slice(0, 150) : undefined,
          }));

        if (validItems.length > 0) {
          result[adv.id] = validItems;
        }
      }
    }

    return result;
  } catch (err) {
    console.warn('Could not read kit data from localStorage, falling back to defaults.', err);
    return defaults;
  }
}

/**
 * Persists the entire kit state to localStorage with version metadata.
 */
export function persistKitData(checklistsByEvent: Record<string, ChecklistItem[]>): boolean {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    const payload: StoredKitData = {
      version: CURRENT_STORAGE_VERSION,
      lastUpdated: new Date().toISOString(),
      checklistsByEvent,
    };
    window.localStorage.setItem(STORAGE_KEYS.KIT_DATA, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.warn('Failed to save kit data to localStorage (storage full or restricted):', err);
    return false;
  }
}

/**
 * Loads the list of saved adventure IDs from localStorage.
 */
export function loadSavedAdventures(): string[] {
  if (!isStorageAvailable()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.SAVED_ADVENTURES);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as Partial<StoredSavedAdventures>;
    if (parsed.version === CURRENT_STORAGE_VERSION && Array.isArray(parsed.savedIds)) {
      return parsed.savedIds.filter((id) => typeof id === 'string');
    }

    return [];
  } catch (err) {
    console.warn('Failed to read saved adventures from localStorage:', err);
    return [];
  }
}

/**
 * Persists the list of saved adventure IDs to localStorage.
 */
export function persistSavedAdventures(savedIds: string[]): boolean {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    const payload: StoredSavedAdventures = {
      version: CURRENT_STORAGE_VERSION,
      savedIds,
    };
    window.localStorage.setItem(STORAGE_KEYS.SAVED_ADVENTURES, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.warn('Failed to save adventure bookmark to localStorage:', err);
    return false;
  }
}
