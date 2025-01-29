import { REST, Routes } from 'discord.js';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import config from './config.json' with { 'type': 'json' };
import token from './token.json' with { 'type': 'json' };

const commands = [];
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const rest = new REST().setToken(token.token);

async function deployCommands(deployToGuild = false) {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    let data;

    if (deployToGuild) {
      data = await rest.put(
        Routes.applicationGuildCommands(config.client.id, config.testGuildId),
        { body: commands }
      );
      console.log(`Successfully reloaded ${data.length} application (/) commands to guild.`);
    } else {
      data = await rest.put(
        Routes.applicationCommands(config.client.id),
        { body: commands }
      );
      console.log(`Successfully reloaded ${data.length} application (/) commands globally.`);
    }
  } catch (error) {
    console.error(error);
  }
}

const args = process.argv.slice(2);
const deployToGuild = args[0] === 'guild';

deployCommands(deployToGuild);