import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = JSON.parse(readFileSync(join(__dirname, '../config.json'), 'utf-8'));

export async function isDeveloper(userId) {
  return config.developers.some((dev) => dev.id === userId);
}
