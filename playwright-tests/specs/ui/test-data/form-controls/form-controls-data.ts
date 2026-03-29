import type { ReviewFormData } from '@utils/types.ts';

export const VALID_REVIEW_FORM_DATA: ReviewFormData = {
  movieTitle: 'Inception',
  reviewerEmail: 'nolan@example.com',
  reviewText: 'This review text is definitely longer than twenty chars.',
  rating: '8',
  releaseYear: '2010',
};

export const SHORT_REVIEW_FORM_DATA: ReviewFormData = {
  movieTitle: VALID_REVIEW_FORM_DATA.movieTitle,
  reviewerEmail: VALID_REVIEW_FORM_DATA.reviewerEmail,
  reviewText: 'Too short',
};

export const TABLE_SEARCH_TERMS = {
  match: 'John',
  noMatch: 'zzzzzz',
  clear: '',
} as const;
