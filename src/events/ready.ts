import { Events, ActivityType } from 'discord.js';
import { connectDB } from '../utils/database.ts';
import type { CustomClient } from '../types/customClient.ts';
import scheduleBirthdayCelebration from '../utils/scheduleBirthdayCelebration.ts';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: CustomClient) {
  console.log(`Ready! Logged in as ${client.user?.tag}`);
  connectDB();

  client.user?.setPresence({
    activities: [{ name: '你媽', type: ActivityType.Playing }],
    status: 'online',
  });

  scheduleBirthdayCelebration(client);
}
