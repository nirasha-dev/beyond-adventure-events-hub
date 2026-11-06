export type AdventureCategory = 'Hiking' | 'Camping' | 'Water activities';

export type AdventureDifficulty = 'Easy' | 'Moderate' | 'Challenging';

export type RegistrationStatus = 'Open' | 'Waitlist' | 'Closed';

export type ChecklistCategory =
  | 'Clothing'
  | 'Food and water'
  | 'Equipment'
  | 'Personal essentials';

export interface ChecklistItem {
  id: string;
  name: string;
  category: ChecklistCategory;
  isPacked: boolean;
  isCustom: boolean;
  note?: string;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  day?: string;
}

export interface ImageCredit {
  photographer: string;
  source: string;
  url: string;
  license: string;
}

export interface Adventure {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: AdventureCategory;
  location: string;
  shortDescription: string;
  detailedDescription: string;
  startDateTime: string;
  endDateTime: string;
  displayDates: string;
  timezone: string;
  duration: string;
  difficulty: AdventureDifficulty;
  priceLKR: number;
  displayPrice: string;
  image: string;
  imageAlt: string;
  imageCredit: ImageCredit;
  registrationStatus: RegistrationStatus;
  registrationNote: string;
  meetingPoint: string;
  itinerary: ItineraryItem[];
  included: string[];
  excluded: string[];
  preparationNotes: string[];
  safetyDisclosure: string;
  defaultChecklist: ChecklistItem[];
  isDemo: boolean;
}

export type SortOption =
  | 'date-asc'
  | 'date-desc'
  | 'price-asc'
  | 'price-desc';

export interface AdventureFiltersState {
  searchQuery: string;
  category: 'All' | AdventureCategory;
  difficulty: 'All' | AdventureDifficulty;
  savedOnly: boolean;
  sortBy: SortOption;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  faculty: string;
  acknowledgedDemo: boolean;
}

export interface RegistrationFormErrors {
  fullName?: string;
  email?: string;
  faculty?: string;
  acknowledgedDemo?: string;
}

export interface StoredKitData {
  version: number;
  lastUpdated: string;
  checklistsByEvent: Record<string, ChecklistItem[]>;
}

export interface StoredSavedAdventures {
  version: number;
  savedIds: string[];
}

