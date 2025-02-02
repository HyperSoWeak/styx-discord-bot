import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<any>;
  cooldown?: number;
  ownerOnly?: boolean;
}
