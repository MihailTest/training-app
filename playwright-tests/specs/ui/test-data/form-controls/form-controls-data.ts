import type { EmployeeFormData, ReviewFormData } from '@utils/types.ts';

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

export const EMPLOYEE_DIALOG_FIELD_LABELS = ['First Name', 'Last Name', 'Department', 'Position', 'Salary', 'Status'] as const;

export const FIRST_EMPLOYEE_FORM_DATA: EmployeeFormData = {
  firstName: 'John',
  lastName: 'Doe',
  department: 'Engineering',
  position: 'Senior Dev',
  salary: '95000',
  status: 'Active',
};
