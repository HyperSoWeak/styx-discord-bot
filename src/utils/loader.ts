import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import chalk from 'chalk';
import type { Command } from '../types/command.ts';

/**
 * Recursively loads all commands from the commands directory.
 * @param commandsDir The absolute path to the commands directory.
 * @returns An array of loaded Command objects.
 */
export async function loadCommands(commandsDir: string): Promise<Command[]> {
  const commands: Command[] = [];
  const commandFolders = readdirSync(commandsDir);

  for (const folder of commandFolders) {
    const commandsPath = join(commandsDir, folder);
    const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));

    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      try {
        const commandModule = await import(filePath);
        // Handle both default export and named export, though we prefer default
        const command: Command = commandModule.default || commandModule;

        if ('data' in command && 'execute' in command) {
          commands.push(command);
        } else {
          console.log(
            chalk.yellow(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
          );
        }
      } catch (error) {
        console.log(chalk.red(`[ERROR] Failed to import command at ${filePath}: ${error}`));
      }
    }
  }

  return commands;
}
