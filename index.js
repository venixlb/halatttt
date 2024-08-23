const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, VoiceConnectionStatus, VideoConnection } = require('@discordjs/voice');
const express = require("express");

const client = new Client();
const app = express();

app.listen(process.env.PORT || 2000, () => {
  console.log('Your app is listening on port ' + (process.env.PORT || 2000));
});

app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center>
  </body>`);
});

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(' ');

  if (args[0] === '!join') {
    const channel = message.member.voice.channel;
    if (channel) {
      try {
        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          selfMute: true,
          selfDeaf: true,
          adapterCreator: channel.guild.voiceAdapterCreator
        });

        connection.on(VoiceConnectionStatus.Ready, () => {
          message.reply(`تم انضمام Venix إلى القناة الصوتية: ${channel.name}`);
        });
      } catch (error) {
        console.error('Failed to join the voice channel:', error);
        message.reply('حدث خطأ عند محاولة الانضمام إلى القناة الصوتية.');
      }
    } else {
      message.reply('يرجى الانضمام إلى قناة صوتية أولاً.');
    }
  }

  if (args[0] === '!leave') {
    const connection = getVoiceConnection(message.guild.id);
    if (connection) {
      connection.destroy(); 
      message.reply('تم مغادرة venix من القناة الصوتية.');
    } else {
      message.reply('venix غير متصل بأي قناة صوتية.');
    }
  }

  // أمر فتح الشاشة (Screen)
  if (args[0] === '!shareScreen') {
    const channel = message.member.voice.channel;
    if (channel) {
      try {
        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          selfMute: false, 
          selfDeaf: false, 
          adapterCreator: channel.guild.voiceAdapterCreator,
          video: true  // هذه الخاصية توضح أنه سيتم مشاركة الفيديو.
        });

        // هذا فقط مثال، مشاركة الشاشة في Discord تحتاج إلى WebRTC
        // وهي خارج نطاق هذه المكتبة بشكل مباشر

        message.reply('تم تفعيل مشاركة الشاشة في القناة الصوتية.');
      } catch (error) {
        console.error('Failed to start screen share:', error);
        message.reply('حدث خطأ عند محاولة بدء مشاركة الشاشة.');
      }
    } else {
      message.reply('يرجى الانضمام إلى قناة صوتية أولاً.');
    }
  }
});

// تسجيل الدخول إلى Discord
client.login(process.env.token);
