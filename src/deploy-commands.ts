import chalk from 'chalk';
import { REST, Routes } from 'discord.js';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { APIApplicationCommand } from 'discord.js';
import { AppConfig } from './config/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const deployToGuild = args.includes('guild') || (AppConfig.isDevelopment && !args.includes('global'));

console.log(chalk.cyan(`Environment: ${AppConfig.isDevelopment ? 'Development' : 'Production'}`));
console.log(chalk.cyan(`Deploy target: ${deployToGuild ? 'Guild (' + AppConfig.TEST_GUILD_ID + ')' : 'Global'}`));

const commands: APIApplicationCommand[] = [];

const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = join(foldersPath, folder);
  const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const { default: command } = await import(filePath);

    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(chalk.yellow(`The command at ${filePath} is missing a required "data" or "execute" property.`));
    }
  }
}

const rest = new REST({ version: '10' }).setToken(AppConfig.DISCORD_TOKEN);

async function deployCommands() {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    let data: APIApplicationCommand[];

    if (deployToGuild) {
      if (!AppConfig.TEST_GUILD_ID) {
        throw new Error('TEST_GUILD_ID is not defined in environment variables.');
      }
      data = (await rest.put(Routes.applicationGuildCommands(AppConfig.CLIENT_ID, AppConfig.TEST_GUILD_ID), {
        body: commands,
      })) as APIApplicationCommand[];
      console.log(chalk.green(`Successfully reloaded ${data.length} application (/) commands to guild.`));
    } else {
      data = (await rest.put(Routes.applicationCommands(AppConfig.CLIENT_ID), {
        body: commands,
      })) as APIApplicationCommand[];
      console.log(chalk.green(`Successfully reloaded ${data.length} application (/) commands globally.`));
    }
  } catch (error) {
    console.error(error);
  }
}

deployCommands().catch(console.error);
