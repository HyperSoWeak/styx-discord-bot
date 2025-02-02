import { ChatInputCommandInteraction, GuildMember, VoiceChannel, TextChannel } from 'discord.js';
import { DisTube, Queue, Events } from 'distube';
import { YouTubePlugin } from '@distube/youtube';

class MusicManager {
  private distube!: DisTube;
  private youtubePlugin!: YouTubePlugin;

  init(client: any) {
    this.youtubePlugin = new YouTubePlugin();
    this.distube = new DisTube(client, {
      plugins: [this.youtubePlugin],
    });

    this.distube.on(Events.PLAY_SONG, (queue: Queue, song: any) => {
      (queue.textChannel as TextChannel).send(`Now playing: **${song.name}**`);
    });

    this.distube.on(Events.ADD_SONG, (queue: Queue, song: any) => {
      (queue.textChannel as TextChannel).send(`Added **${song.name}** to the queue`);
    });

    this.distube.on(Events.ADD_LIST, (queue: Queue, playlist: any) => {
      (queue.textChannel as TextChannel).send(`Added playlist: **${playlist.name}** to the queue`);
    });
  }

  async play(interaction: ChatInputCommandInteraction) {
    const query = interaction.options.getString('query');
    const channel = (interaction.member as GuildMember).voice.channel as VoiceChannel;
    const member = interaction.member as GuildMember;
    const textChannel = interaction.channel as TextChannel;

    if (!channel) return interaction.reply('You need to join a voice channel first!');

    await interaction.deferReply();

    await this.distube.play(channel, query!, {
      member,
      textChannel,
    });

    await interaction.editReply('Successfully played the song.');
  }

  async stop(interaction: ChatInputCommandInteraction) {
    const channel = (interaction.member as GuildMember).voice.channel as VoiceChannel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const queue = this.distube.getQueue(channel);
    if (!queue || !queue.playing) return interaction.reply('There is no song playing to stop.');

    await this.distube.stop(channel);
    await interaction.guild?.members.me?.voice.disconnect();

    interaction.reply('Music has been stopped and the queue has been cleared.');
  }

  pause(interaction: ChatInputCommandInteraction) {
    const channel = (interaction.member as GuildMember).voice.channel as VoiceChannel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const queue = this.distube.getQueue(channel);
    if (!queue || !queue.playing) return interaction.reply('There is no song playing to pause.');

    this.distube.pause(channel);
    interaction.reply('The song has been paused.');
  }

  resume(interaction: ChatInputCommandInteraction) {
    const channel = (interaction.member as GuildMember).voice.channel as VoiceChannel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const queue = this.distube.getQueue(channel);
    if (!queue || !queue.playing) return interaction.reply('There is no song playing to resume.');

    this.distube.resume(channel);
    interaction.reply('The song has been resumed.');
  }

  nowPlaying(interaction: ChatInputCommandInteraction) {
    const channel = (interaction.member as GuildMember).voice.channel as VoiceChannel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const queue = this.distube.getQueue(channel);
    if (!queue || !queue.playing) return interaction.reply('No song is currently playing.');

    interaction.reply(`Now playing: **${queue.songs[0].name}**`);
  }

  queue(interaction: ChatInputCommandInteraction) {
    const channel = (interaction.member as GuildMember).voice.channel as VoiceChannel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const queue = this.distube.getQueue(channel);
    if (!queue || !queue.songs.length) return interaction.reply('There is no song in the queue.');

    const queueMessage = queue.songs
      .map((song, index) => `${index + 1}. **${song.name}** - ${song.formattedDuration}`)
      .join('\n');

    interaction.reply(`Queue:\n${queueMessage}`);
  }

  volume(interaction: ChatInputCommandInteraction) {
    const channel = (interaction.member as GuildMember).voice.channel as VoiceChannel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const volume = interaction.options.getInteger('level');
    if (volume === null || volume < 0 || volume > 100)
      return interaction.reply('Please provide a volume between 0 and 100.');

    this.distube.setVolume(channel, volume);
    interaction.reply(`Volume has been set to **${volume}**.`);
  }

  shuffle(interaction: ChatInputCommandInteraction) {
    const channel = (interaction.member as GuildMember).voice.channel as VoiceChannel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    this.distube.shuffle(channel);
    interaction.reply('The queue has been shuffled.');
  }

  skip(interaction: ChatInputCommandInteraction) {
    const channel = (interaction.member as GuildMember).voice.channel as VoiceChannel;
    if (!channel) return interaction.reply('You need to join a voice channel first!');

    const queue = this.distube.getQueue(channel);
    if (!queue || !queue.playing) return interaction.reply('There is no song playing to skip.');

    this.distube.skip(channel);
    interaction.reply('The song has been skipped.');
  }
}

const musicManager = new MusicManager();
export default musicManager;
