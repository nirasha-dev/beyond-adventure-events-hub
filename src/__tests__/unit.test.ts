import { describe, it, expect } from 'vitest';
import { ADVENTURES_DATA } from '../data/adventures';
import { filterAndSortAdventures } from '../utils/filterAndSort';
import { calculateProgress } from '../utils/checklistMath';
import { validateRegistrationForm, validateCustomChecklistItem } from '../utils/validation';
import { buildInitialChecklists, loadStoredKitData } from '../utils/storage';
import { ChecklistItem } from '../types';

describe('Adventures Filtering and Sorting', () => {
  it('performs case-insensitive search by title, location, or keyword', () => {
    const resultsKnuckles = filterAndSortAdventures(
      ADVENTURES_DATA,
      {
        searchQuery: 'knuckles',
        category: 'All',
        difficulty: 'All',
        savedOnly: false,
        sortBy: 'date-asc',
      },
      []
    );
    expect(resultsKnuckles.length).toBe(1);
    expect(resultsKnuckles[0].slug).toBe('beyond-the-mist');

    const resultsUppercase = filterAndSortAdventures(
      ADVENTURES_DATA,
      {
        searchQuery: 'KITULGALA',
        category: 'All',
        difficulty: 'All',
        savedOnly: false,
        sortBy: 'date-asc',
      },
      []
    );
    expect(resultsUppercase.length).toBe(1);
    expect(resultsUppercase[0].slug).toBe('chase-the-rapids');
  });

  it('filters accurately by category and difficulty simultaneously', () => {
    const hikingModerate = filterAndSortAdventures(
      ADVENTURES_DATA,
      {
        searchQuery: '',
        category: 'Hiking',
        difficulty: 'Moderate',
        savedOnly: false,
        sortBy: 'date-asc',
      },
      []
    );
    expect(hikingModerate.length).toBe(1);
    expect(hikingModerate[0].slug).toBe('beyond-the-mist');

    const campingChallenging = filterAndSortAdventures(
      ADVENTURES_DATA,
      {
        searchQuery: '',
        category: 'Camping',
        difficulty: 'Challenging',
        savedOnly: false,
        sortBy: 'date-asc',
      },
      []
    );
    expect(campingChallenging.length).toBe(0);
  });

  it('filters by saved adventures list correctly', () => {
    const savedIds = ['adv-kalpitiya-02'];
    const results = filterAndSortAdventures(
      ADVENTURES_DATA,
      {
        searchQuery: '',
        category: 'All',
        difficulty: 'All',
        savedOnly: true,
        sortBy: 'date-asc',
      },
      savedIds
    );
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('adv-kalpitiya-02');
  });

  it('sorts by price without mutating the original adventure dataset', () => {
    const originalFirstId = ADVENTURES_DATA[0].id;
    const originalLength = ADVENTURES_DATA.length;

    const sortedByPriceAsc = filterAndSortAdventures(
      ADVENTURES_DATA,
      {
        searchQuery: '',
        category: 'All',
        difficulty: 'All',
        savedOnly: false,
        sortBy: 'price-asc',
      },
      []
    );

    // Lowest price in sample data is Kalpitiya (5800 LKR)
    expect(sortedByPriceAsc[0].priceLKR).toBe(5800);
    // Highest price in sample data is Kitulgala (8200 LKR)
    expect(sortedByPriceAsc[sortedByPriceAsc.length - 1].priceLKR).toBe(8200);

    // Verify original array was not mutated
    expect(ADVENTURES_DATA[0].id).toBe(originalFirstId);
    expect(ADVENTURES_DATA.length).toBe(originalLength);
  });
});

describe('Checklist Math & Progress Calculation', () => {
  it('returns safe zero progress for empty checklists', () => {
    const progress = calculateProgress([]);
    expect(progress.total).toBe(0);
    expect(progress.packed).toBe(0);
    expect(progress.percentage).toBe(0);
    expect(progress.isComplete).toBe(false);
  });

  it('calculates mathematically exact percentage and completion state', () => {
    // 8 of 12 items packed = 67% (from prompt example)
    const mockItems: ChecklistItem[] = Array.from({ length: 12 }, (_, i) => ({
      id: `item-${i}`,
      name: `Gear ${i}`,
      category: 'Equipment',
      isPacked: i < 8,
      isCustom: false,
    }));

    const progress = calculateProgress(mockItems);
    expect(progress.total).toBe(12);
    expect(progress.packed).toBe(8);
    expect(progress.percentage).toBe(67);
    expect(progress.isComplete).toBe(false);

    // Mark remaining 4 as packed
    const allPacked = mockItems.map((item) => ({ ...item, isPacked: true }));
    const completeProgress = calculateProgress(allPacked);
    expect(completeProgress.percentage).toBe(100);
    expect(completeProgress.isComplete).toBe(true);
  });
});

describe('Validation Logic', () => {
  it('validates demo registration form data accurately', () => {
    // Missing all fields
    const invalidEmpty = validateRegistrationForm({
      fullName: '  ',
      email: '',
      faculty: '',
      acknowledgedDemo: false,
    });
    expect(invalidEmpty.isValid).toBe(false);
    expect(invalidEmpty.errors.fullName).toBeDefined();
    expect(invalidEmpty.errors.email).toBeDefined();
    expect(invalidEmpty.errors.faculty).toBeDefined();
    expect(invalidEmpty.errors.acknowledgedDemo).toBeDefined();

    // Invalid email format
    const invalidEmail = validateRegistrationForm({
      fullName: 'Nirasha Ranasinghe',
      email: 'not-an-email',
      faculty: 'Faculty of Science',
      acknowledgedDemo: true,
    });
    expect(invalidEmail.isValid).toBe(false);
    expect(invalidEmail.errors.email).toContain('valid email address');

    // Valid sample input
    const valid = validateRegistrationForm({
      fullName: 'Nirasha Ranasinghe',
      email: 'nirasha@kln.ac.lk',
      faculty: 'Faculty of Science',
      acknowledgedDemo: true,
    });
    expect(valid.isValid).toBe(true);
    expect(Object.keys(valid.errors).length).toBe(0);
  });

  it('validates custom checklist item creation and duplicate prevention', () => {
    const existing: ChecklistItem[] = [
      {
        id: '1',
        name: 'Rain jacket',
        category: 'Clothing',
        isPacked: false,
        isCustom: false,
      },
    ];

    // Reject empty
    const emptyResult = validateCustomChecklistItem('   ', existing);
    expect(emptyResult.isValid).toBe(false);
    expect(emptyResult.error).toContain('cannot be empty');

    // Reject duplicate case-insensitively
    const dupResult = validateCustomChecklistItem('RAIN JACKET', existing);
    expect(dupResult.isValid).toBe(false);
    expect(dupResult.error).toContain('already exists');

    // Accept valid new item and trim text
    const validResult = validateCustomChecklistItem('  Extra wool socks  ', existing);
    expect(validResult.isValid).toBe(true);
    expect(validResult.sanitizedName).toBe('Extra wool socks');
  });
});

describe('Storage & Initializer Logic', () => {
  it('builds deep copies of initial checklists preventing mutation across instances', () => {
    const initialMap = buildInitialChecklists(ADVENTURES_DATA);
    const firstAdvId = ADVENTURES_DATA[0].id;

    expect(initialMap[firstAdvId]).toBeDefined();
    expect(initialMap[firstAdvId].length).toBe(ADVENTURES_DATA[0].defaultChecklist.length);

    // Mutating the initial map item should not affect the source constant
    initialMap[firstAdvId][0].isPacked = true;
    expect(ADVENTURES_DATA[0].defaultChecklist[0].isPacked).toBe(false);
  });

  it('returns default checklists if storage is empty or unavailable', () => {
    const loaded = loadStoredKitData(ADVENTURES_DATA);
    expect(Object.keys(loaded).length).toBe(ADVENTURES_DATA.length);
  });
});
