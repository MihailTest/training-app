import * as fs from 'fs';

/**
 * Get random number within a range
 * @param max - Maximum value (exclusive)
 * @param min - Minimum value (inclusive), defaults to 0
 * @returns Random number between min and max
 */
export const getRandomNumber = (max: number, min: number = 0): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Create an empty storage state file if it doesn't exist
 * @param fileName - Name/path of the storage state file
 */
export async function createStorageStateFileIfNotExist(fileName: string): Promise<void> {
  if (!fs.existsSync(fileName)) {
    const dir = fileName.substring(0, fileName.lastIndexOf('/'));
    if (dir && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fileName, JSON.stringify({ cookies: [], origins: [] }));
  }
}

/**
 * Escape special regex characters in a string
 * @param s - String to escape
 * @returns Escaped string safe for use in regex
 */
export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Format a date to a readable string
 * @param date - Date to format
 * @param formatType - Format string (default: ISO)
 * @returns Formatted date string
 */
export function formatDate(date: Date, formatType: 'ISO' | 'US' | 'SHORT' = 'ISO'): string {
  switch (formatType) {
    case 'US':
      return date.toLocaleDateString('en-US');
    case 'SHORT':
      return date.toISOString().split('T')[0];
    case 'ISO':
    default:
      return date.toISOString();
  }
}
