/**
 * Shared types for UI test automation
 */

/**
 * Test user role types
 */
export type UserRole = 'qa' | 'admin';

/**
 * Supported route suffixes under /form-controls
 */
export type FormControlsRoute =
  | 'text-input'
  | 'nested-checkboxes'
  | 'radio-selection'
  | 'data-table'
  | 'button-interactions'
  | 'link-navigation'
  | 'media-validation'
  | 'file-operations'
  | 'dynamic-elements';

/**
 * Payload for Form Controls review submission.
 */
export interface ReviewFormData {
  readonly movieTitle: string;
  readonly reviewerEmail: string;
  readonly reviewText: string;
  readonly rating?: string;
  readonly releaseYear?: string;
}
