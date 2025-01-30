import { Events, ActivityType } from 'discord.js';
import { connectDB } from '../utils/database.js';

export const name = Events.ClientReady;
export const once = true;

export function execute(client) {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  connectDB();

  client.user.setPresence({
    activities: [{ name: '你媽', type: ActivityType.Playing }],
    status: 'online',
  });
}
