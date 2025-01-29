import { Events } from 'discord.js';
import { connectDB } from '../utils/database.js';

export const name = Events.ClientReady;
export const once = true;

export function execute(client) {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  connectDB();
}
