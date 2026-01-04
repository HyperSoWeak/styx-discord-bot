import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'randint',
  description: 'Generates a random integer between two specified numbers.',
  options: (cmd) =>
    cmd
      .addIntegerOption((option) => option.setName('min').setDescription('The minimum number.').setRequired(true))
      .addIntegerOption((option) => option.setName('max').setDescription('The maximum number.').setRequired(true)),

  async execute(interaction) {
    const min = interaction.options.getInteger('min') ?? 1;
    const max = interaction.options.getInteger('max') ?? 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    const emojiRandomNumber = randomNumber
      .toString()
      .split('')
      .map((num) => (num === '-' ? ':heavy_minus_sign:' : `:number_${num}:`))
      .join('');

    await interaction.reply(emojiRandomNumber);
  },
});
