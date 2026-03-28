import * as fs from 'fs';

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
