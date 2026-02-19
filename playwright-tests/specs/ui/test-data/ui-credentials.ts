import 'dotenv/config';

import type { UserRole } from '@utils/types.ts';

/**
 * UI credentials interface
 */
export interface UICredentials {
  readonly username: string;
  readonly password: string;
  readonly role?: UserRole;
}

/**
 * Get UI credentials from environment variables
 * Falls back to defaults if environment variables are not set
 * @param role - User role (user, admin)
 * @returns UICredentials object
 */
export function getUICredentials(role: UserRole = 'admin'): UICredentials {
  const roleKey = role.toUpperCase();

  return {
    username: process.env[`${roleKey}_USER`] || process.env.USER || 'test@example.com',
    password: process.env[`${roleKey}_PASSWORD`] || process.env.PASSWORD || 'Test123!',
    role,
  };
}

/**
 * Qa user credentials (limited access)
 */
export const QA_USER: UICredentials = getUICredentials('qa');

/**
 * Admin user credentials (full access)
 */
export const ADMIN_USER: UICredentials = getUICredentials('admin');

/**
 * Get test user credentials based on role
 * @param role - User role
 * @returns UICredentials for the specified role
 */
export function getTestUserCredentials(role: UserRole): UICredentials {
  switch (role) {
    case 'qa':
      return QA_USER;
    case 'admin':
      return ADMIN_USER;
    default:
      return ADMIN_USER;
  }
}
