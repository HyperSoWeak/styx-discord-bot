import { ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommandOptionsOnlyBuilder } from 'discord.js';

export interface Command {
  data: SlashCommandOptionsOnlyBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<any>;
  cooldown?: number;
  ownerOnly?: boolean;
}
