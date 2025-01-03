// API Constants
export const API_VERSION = 'v1';
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Auth Constants
export const TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Profile Constants
export const MAX_BIO_LENGTH = 500;
export const MAX_SKILLS = 20;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// Job Constants
export const JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship'] as const;
export const EXPERIENCE_LEVELS = ['entry', 'mid', 'senior', 'lead', 'executive'] as const;
export const MAX_JOB_DESCRIPTION_LENGTH = 5000;

// Application Constants
export const APPLICATION_STATUS = [
  'draft',
  'submitted',
  'under_review',
  'shortlisted',
  'interview_scheduled',
  'interview_completed',
  'offer_pending',
  'offer_extended',
  'offer_accepted',
  'offer_declined',
  'rejected',
  'withdrawn'
] as const;

// UI Constants
export const TOAST_DURATION = 5000;
export const DEBOUNCE_DELAY = 300;
export const ANIMATION_DURATION = 200;

// Date Formats
export const DATE_FORMAT = 'MMM d, yyyy';
export const TIME_FORMAT = 'h:mm a';
export const DATETIME_FORMAT = 'MMM d, yyyy h:mm a';

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'An error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
} as const;
