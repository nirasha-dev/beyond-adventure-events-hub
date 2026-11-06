import { RegistrationFormData, RegistrationFormErrors, ChecklistItem } from '../types';

export const FACULTY_OPTIONS = [
  'Faculty of Science',
  'Faculty of Humanities',
  'Faculty of Social Sciences',
  'Faculty of Commerce & Management Studies',
  'Faculty of Computing & Technology',
  'Faculty of Medicine',
  'Faculty of Graduate Studies',
  'Other / Alumni',
] as const;

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validates registration form inputs.
 * Returns whether the form is valid and any per-field error messages.
 */
export function validateRegistrationForm(data: RegistrationFormData): {
  isValid: boolean;
  errors: RegistrationFormErrors;
} {
  const errors: RegistrationFormErrors = {};

  const trimmedName = data.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  } else if (trimmedName.length > 80) {
    errors.fullName = 'Full name cannot exceed 80 characters.';
  }

  const trimmedEmail = data.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please provide an email address.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., student@kln.ac.lk).';
  }

  if (!data.faculty || data.faculty === '') {
    errors.faculty = 'Please select your university faculty.';
  }

  if (!data.acknowledgedDemo) {
    errors.acknowledgedDemo = 'You must acknowledge that this is a simulated recruitment demo.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates a custom checklist item name.
 */
export function validateCustomChecklistItem(
  name: string,
  existingItems: ChecklistItem[]
): { isValid: boolean; error?: string; sanitizedName: string } {
  const sanitized = name.trim();

  if (!sanitized) {
    return { isValid: false, error: 'Item name cannot be empty.', sanitizedName: '' };
  }

  if (sanitized.length < 2) {
    return { isValid: false, error: 'Item name must be at least 2 characters.', sanitizedName: sanitized };
  }

  if (sanitized.length > 60) {
    return {
      isValid: false,
      error: 'Item name cannot exceed 60 characters.',
      sanitizedName: sanitized,
    };
  }

  const isDuplicate = existingItems.some(
    (item) => item.name.toLowerCase().trim() === sanitized.toLowerCase()
  );

  if (isDuplicate) {
    return {
      isValid: false,
      error: 'An item with this name already exists in your checklist.',
      sanitizedName: sanitized,
    };
  }

  return { isValid: true, sanitizedName: sanitized };
}
