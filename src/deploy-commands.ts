import chalk from 'chalk';
import { REST, Routes } from 'discord.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { APIApplicationCommand, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { AppConfig } from './config/index.ts';
import { loadCommands } from './utils/loader.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const deployToGuild = args.includes('guild') || (AppConfig.isDevelopment && !args.includes('global'));

console.log(chalk.cyan(`Environment: ${AppConfig.isDevelopment ? 'Development' : 'Production'}`));
console.log(chalk.cyan(`Deploy target: ${deployToGuild ? 'Guild (' + AppConfig.TEST_GUILD_ID + ')' : 'Global'}`));

const rest = new REST({ version: '10' }).setToken(AppConfig.DISCORD_TOKEN);

async function deployCommands() {
  try {
    const commandsPath = join(__dirname, 'commands');
    const loadedCommands = await loadCommands(commandsPath);
    const commandsData: RESTPostAPIChatInputApplicationCommandsJSONBody[] = loadedCommands.map((cmd) =>
      cmd.data.toJSON()
    );

    console.log(`Started refreshing ${commandsData.length} application (/) commands.`);

    let data: APIApplicationCommand[];

    if (deployToGuild) {
      if (!AppConfig.TEST_GUILD_ID) {
        throw new Error('TEST_GUILD_ID is not defined in environment variables.');
      }
      data = (await rest.put(Routes.applicationGuildCommands(AppConfig.CLIENT_ID, AppConfig.TEST_GUILD_ID), {
        body: commandsData,
      })) as APIApplicationCommand[];
      console.log(chalk.green(`Successfully reloaded ${data.length} application (/) commands to guild.`));
    } else {
      data = (await rest.put(Routes.applicationCommands(AppConfig.CLIENT_ID), {
        body: commandsData,
      })) as APIApplicationCommand[];
      console.log(chalk.green(`Successfully reloaded ${data.length} application (/) commands globally.`));
    }
  } catch (error) {
    console.error(error);
  }
}

deployCommands().catch(console.error);
