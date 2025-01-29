import chalk from 'chalk';
import { Events } from 'discord.js';
import { connectDB } from '../database.js';

export const name = Events.ClientReady;
export const once = true;

export function execute(client) {
  console.log(chalk.green(`[Client] Ready! Logged in as ${client.user.tag}`));
  connectDB();
}
