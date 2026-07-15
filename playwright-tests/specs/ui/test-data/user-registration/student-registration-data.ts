import type { StudentRegistrationFormData } from '@utils/types.ts';

export const VALID_STUDENT_REGISTRATION_FORM_DATA: StudentRegistrationFormData = {
  firstName: 'Ariana',
  lastName: 'Popescu',
  email: 'ariana.popescu@example.com',
  mobile: '1234567890',
  course: 'Web Development',
  experience: 'Beginner',
};

export const STUDENT_REGISTRATION_REQUIRED_ERROR_MESSAGES = [
  'First Name is required',
  'Last Name is required',
  'Email is required',
  'Phone is required',
  'Please select a course',
  'Please select experience level',
  'You must agree to the terms',
] as const;

export const STUDENT_REGISTRATION_SUCCESS_TITLE = 'Enrollment Confirmed' as const;
