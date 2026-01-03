import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'node:path';

const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'development') {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.development') });
} else if (nodeEnv === 'production') {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.production') });
}

dotenv.config();

const envSchema = z.object({
  DISCORD_TOKEN: z.string().min(1, 'DISCORD_TOKEN is required'),
  CLIENT_ID: z.string().min(1, 'CLIENT_ID is required'),
  MONGODB_URI: z.string().url('Invalid MongoDB URI'),
  TEST_GUILD_ID: z.string().optional(),
  DEVELOPER_IDS: z.string().transform((str) => str.split(',').map((id) => id.trim())),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const env = envSchema.parse(process.env);
