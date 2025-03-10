import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import musicManager from './managers/musicManager.ts';
import chalk from 'chalk';
import type { Config } from './types/config.ts';
import type { Token } from './types/token.ts';
import type { CustomClient } from './types/customClient.ts';
import type { Command } from './types/command.ts';

const args = process.argv.slice(2);
const isTest = args[0] === 'test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: Config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
const token: Token = JSON.parse(fs.readFileSync(path.join(__dirname, 'token.json'), 'utf-8'));

// Create the client instance
const client = new Client({
  intents: Object.values(GatewayIntentBits) as number[],
}) as CustomClient;

// Set client properties for testing mode
if (isTest) {
  token.client = token.testClient;
  client.isTest = true;
}

client.commands = new Collection();
client.cooldowns = new Collection();
client.config = config;

// Function to load commands dynamically
async function loadCommands() {
  const foldersPath = path.join(__dirname, 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      try {
        const { default: command } = await import(filePath);
        if ('data' in command && 'execute' in command) {
          client.commands.set(command.data.name, command);
        } else {
          console.log(
            chalk.yellow(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
          );
        }
      } catch (err) {
        console.log(chalk.red(`[ERROR] Failed to import command at ${filePath}: ${err}`));
      }
    }
  }
}

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

// Initialize the music manager
function initializeMusicManager() {
  musicManager.init(client);
}

// Log in to Discord and start the bot
async function startBot() {
  try {
    await loadCommands();
    await loadEvents();
    initializeMusicManager();
    await client.login(token.client);
    console.log(chalk.green('Bot logged in successfully!'));
  } catch (err) {
    console.log(chalk.red(`[ERROR] Failed to initialize bot: ${err}`));
  }
}

// Start the bot
startBot();

export { client };
