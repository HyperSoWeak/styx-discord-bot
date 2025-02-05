import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Config } from '../types/config.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: Config = JSON.parse(readFileSync(join(__dirname, '../config.json'), 'utf-8'));

export function isDeveloper(userId: string): boolean {
  return config.developers.some((dev) => dev.id === userId);
}
