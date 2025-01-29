import { DisTube } from 'distube';
import { YouTubePlugin } from '@distube/youtube';

class MusicManager {
  init(client) {
    this.youtubePlugin = new YouTubePlugin();
    this.distube = new DisTube(client, {
      plugins: [this.youtubePlugin],
    });

    this.distube.on('playSong', (queue, song) => {
      queue.textChannel.send(`Now playing: **${song.name}**`);
    });

    this.distube.on('addSong', (queue, song) => {
      queue.textChannel.send(`Added **${song.name}** to the queue`);
    });

    this.distube.on('playList', (queue, playlist) => {
      queue.textChannel.send(`Playing playlist: **${playlist.name}**`);
    });
  }

  async play(interaction) {
    const query = interaction.options.getString('query');
    const channel = interaction.member.voice.channel;
    const member = interaction.member;
    const textChannel = interaction.channel;

    if (!channel) return interaction.reply('You need to join a voice channel first!');

    await interaction.deferReply();

    await this.distube.play(channel, query, {
      member,
      textChannel,
    });

    await interaction.deleteReply();
  }

  async stop(interaction) {
    const channel = interaction.member.voice.channel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const queue = this.distube.getQueue(channel);
    if (!queue || !queue.playing) return interaction.reply('There is no song playing to stop.');

    await this.distube.stop(channel);
    await interaction.guild.members.me.voice.disconnect();

    interaction.reply('Music has been stopped and the queue has been cleared.');
  }

  pause(interaction) {
    const channel = interaction.member.voice.channel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const queue = this.distube.getQueue(channel);
    if (!queue || !queue.playing) return interaction.reply('There is no song playing to pause.');

    this.distube.pause(channel);
    interaction.reply('The song has been paused.');
  }

  resume(interaction) {
    const channel = interaction.member.voice.channel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const queue = this.distube.getQueue(channel);
    if (!queue || !queue.playing) return interaction.reply('There is no song playing to resume.');

    this.distube.resume(channel);
    interaction.reply('The song has been resumed.');
  }

  nowPlaying(interaction) {
    const channel = interaction.member.voice.channel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const queue = this.distube.getQueue(channel);
    if (!queue || !queue.playing) return interaction.reply('No song is currently playing.');

    interaction.reply(`Now playing: **${queue.songs[0].name}**`);
  }

  queue(interaction) {
    const channel = interaction.member.voice.channel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const queue = this.distube.getQueue(channel);
    if (!queue || !queue.songs.length) return interaction.reply('There is no song in the queue.');

    const queueMessage = queue.songs
      .map((song, index) => `${index + 1}. **${song.name}** - ${song.formattedDuration}`)
      .join('\n');

    interaction.reply(`Queue:\n${queueMessage}`);
  }

  volume(interaction) {
    const channel = interaction.member.voice.channel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const volume = interaction.options.getInteger('level');
    if (volume < 0 || volume > 100) return interaction.reply('Please provide a volume between 0 and 100.');

    this.distube.setVolume(channel, volume);
    interaction.reply(`Volume has been set to **${volume}**.`);
  }
}

const musicManager = new MusicManager();
export default musicManager;
