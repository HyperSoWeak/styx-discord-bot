import chalk from 'chalk';
import { REST, Routes, APIApplicationCommand } from 'discord.js';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Config } from './types/config.ts';
import type { Token } from './types/token.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: Config = JSON.parse(readFileSync(join(__dirname, 'config.json'), 'utf-8'));
const token: Token = JSON.parse(readFileSync(join(__dirname, 'token.json'), 'utf-8'));

const args = process.argv.slice(2);
const deployToGuild = args[0] === 'guild';
const isTest = args[1] === 'test';

if (isTest) {
  token.client = token.testClient;
  config.client.id = config.client.testId;
  console.log(chalk.cyan('Deploying to test client.'));
}

const commands: APIApplicationCommand[] = [];

const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = join(foldersPath, folder);
  const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = await import(filePath);

    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

const rest = new REST({ version: '10' }).setToken(token.client);

async function deployCommands(deployToGuild = false) {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    let data: APIApplicationCommand[];

    if (deployToGuild) {
      data = (await rest.put(Routes.applicationGuildCommands(config.client.id, config.testGuildId), {
        body: commands,
      })) as APIApplicationCommand[];
      console.log(`Successfully reloaded ${data.length} application (/) commands to guild.`);
    } else {
      data = (await rest.put(Routes.applicationCommands(config.client.id), {
        body: commands,
      })) as APIApplicationCommand[];
      console.log(`Successfully reloaded ${data.length} application (/) commands globally.`);
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteCommands(deployToGuild = false) {
  try {
    console.log(`Started deleting application (/) commands.`);

    if (deployToGuild) {
      await rest.put(Routes.applicationGuildCommands(config.client.id, config.testGuildId), { body: [] });
      console.log(`Successfully deleted application (/) commands from guild.`);
    } else {
      await rest.put(Routes.applicationCommands(config.client.id), { body: [] });
      console.log(`Successfully deleted application (/) commands globally.`);
    }
  } catch (error) {
    console.error(error);
  }
}

deployCommands(deployToGuild);
// deleteCommands(deployToGuild);
