import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../components/embed.ts';
import type { Command } from '../../types/command.ts';
import achievements, { Achievement } from '../../data/achievements.ts';

class AchievementListCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('achievement-list')
    .setDescription('Displays a list of all available achievements.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const fields = achievements.map((achievement: Achievement) => ({
      name: `${achievement.emoji} ${achievement.name}`,
      value: `✨ ${achievement.description}`,
    }));

    const achievementListEmbed = createEmbed(interaction)
      .setTitle('🏆 All Available Achievements')
      .setDescription('Here is a list of all achievements you can earn:')
      .addFields(fields);

    await interaction.reply({
      embeds: [achievementListEmbed],
    });
  }
}

export default new AchievementListCommand();
