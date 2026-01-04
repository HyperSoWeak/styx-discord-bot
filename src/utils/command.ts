import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types/command.ts';

// Helper type for the builder function
type BuilderCallback = (builder: SlashCommandBuilder) => SlashCommandBuilder;

// The simplified input options
interface SimpleCommandDefinition {
  name: string;
  description: string;
  /**
   * Callback to add options to the command.
   * @example
   * options: (cmd) => cmd.addStringOption(opt => opt.setName('text').setDescription('Input text'))
   */
  options?: (builder: SlashCommandBuilder) => unknown;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
  cooldown?: number;
  ownerOnly?: boolean;
}

// The full input options (for when you need full control or subcommands)
interface FullCommandDefinition extends Omit<Command, 'data'> {
  data: SlashCommandBuilder | BuilderCallback;
}

export type CommandDefinition = SimpleCommandDefinition | FullCommandDefinition;

/**
 * A helper function to define a command with simplified syntax.
 * Automatically handles SlashCommandBuilder creation for simple use cases.
 *
 * @param def The command definition (Simple or Full).
 * @returns The fully constructed Command object.
 */
export function defineCommand(def: CommandDefinition): Command {
  let data: Command['data'];

  if ('data' in def) {
    // Full definition with explicit data builder
    if (typeof def.data === 'function') {
      data = def.data(new SlashCommandBuilder());
    } else {
      data = def.data;
    }
    return {
      data,
      execute: def.execute,
      cooldown: def.cooldown,
      ownerOnly: def.ownerOnly,
    };
  } else {
    // Simple definition with name/description/options
    const builder = new SlashCommandBuilder().setName(def.name).setDescription(def.description);

    if (def.options) {
      def.options(builder);
    }

    return {
      data: builder,
      execute: def.execute,
      cooldown: def.cooldown,
      ownerOnly: def.ownerOnly,
    };
  }
}
