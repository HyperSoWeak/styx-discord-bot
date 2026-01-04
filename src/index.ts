import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import chalk from 'chalk';
import { AppConfig, clientConfig } from './config/index.ts';
import type { CustomClient } from './types/customClient.ts';
import { loadCommands } from './utils/loader.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the client instance
const client = new Client({
  intents: Object.values(GatewayIntentBits) as number[],
}) as CustomClient;

client.isTest = AppConfig.isTest;
client.commands = new Collection();
client.cooldowns = new Collection();
client.config = clientConfig;

// Function to load events dynamically
async function loadEvents() {
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    try {
      const event = await import(filePath);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    } catch (err) {
      console.log(chalk.red(`[ERROR] Failed to import event at ${filePath}: ${err}`));
    }
  }
}

import { loadAchievements } from './utils/achievementLoader.ts';

// Log in to Discord and start the bot
async function startBot() {
  try {
    // Load Commands using the shared loader
    const commands = await loadCommands(path.join(__dirname, 'commands'));
    for (const command of commands) {
      client.commands.set(command.data.name, command);
    }

    await loadAchievements();
    await loadEvents();
    await client.login(AppConfig.DISCORD_TOKEN);
    console.log(chalk.green('Bot logged in successfully!'));
  } catch (err) {
    console.log(chalk.red(`[ERROR] Failed to initialize bot: ${err}`));
  }
}

// Start the bot only if this file is the main entry point
if (process.argv[1] === __filename) {
  startBot().catch(console.error);
}

export { client };
