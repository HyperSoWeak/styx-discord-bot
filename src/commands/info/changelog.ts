import { createEmbed } from '../../components/embed.ts';
import { defineCommand } from '../../utils/command.ts';
import { clientConfig } from '../../config/index.ts';

export default defineCommand({
  name: 'changelog',
  description: 'Displays the changelog of the bot.',

  async execute(interaction) {
    const changelogUrl = 'https://github.com/HyperSoWeak/styx-discord-bot/blob/main/CHANGELOG.md';

    const embed = createEmbed(interaction)
      .setTitle(`📜 Changelog (v${clientConfig.version})`)
      .setDescription(
        `View the latest changes and updates on GitHub:\n\n🔗 **[Click here to view CHANGELOG.md](${changelogUrl})**`
      )
      .setFooter({ text: 'Updates are automatically documented based on pull requests.' });

    await interaction.reply({ embeds: [embed] });
  },
});
