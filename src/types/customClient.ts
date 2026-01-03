import { Client, Collection } from 'discord.js';
import type { Config } from '../types/config.ts';

export interface CustomClient extends Client {
  commands: Collection<string, unknown>;
  cooldowns: Collection<string, unknown>;
  config: Config;
  isTest?: boolean;
}
