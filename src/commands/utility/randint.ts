import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('randint')
  .setDescription('Generates a random integer between two specified numbers.')
  .addIntegerOption((option) => option.setName('min').setDescription('The minimum number.').setRequired(true))
  .addIntegerOption((option) => option.setName('max').setDescription('The maximum number.').setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const min = interaction.options.getInteger('min') || 1;
  const max = interaction.options.getInteger('max')!;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  const emojiRandomNumber = randomNumber
    .toString()
    .split('')
    .map((num) => (num === '-' ? ':heavy_minus_sign:' : `:number_${num}:`))
    .join('');

  await interaction.reply(emojiRandomNumber);
}
