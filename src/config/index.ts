import { env } from './env.ts';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Config } from '../types/config.ts';

const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));

export const AppConfig = {
  ...env,
  isDevelopment: env.NODE_ENV === 'development',
  isTest: env.NODE_ENV === 'test' || env.NODE_ENV === 'development',
};

export const clientConfig: Config = {
  version: packageJson.version as string,
  developers: env.DEVELOPER_IDS.map((id) => ({ name: 'Developer', id })),
  testGuildId: env.TEST_GUILD_ID,
  clientId: env.CLIENT_ID,
};
