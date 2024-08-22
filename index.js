const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const express = require("express");

const client = new Client();
const app = express();

// إعداد خادم Express ليبقي البوت على قيد الحياة على خدمات مثل Heroku
app.listen(process.env.PORT || 2000, () => {
  console.log('Your app is listening on port ' + (process.env.PORT || 2000));
});

app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center>
  </body>`);
});

// عندما يكون البوت جاهزًا
client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
});

// أمر للانضمام إلى قناة صوتية
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // تجاهل رسائل البوتات الأخرى

  const args = message.content.split(' ');

  if (args[0] === '!join') {
    const channel = message.member.voice.channel;
    if (channel) {
      try {
        joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          selfMute: true,
          selfDeaf: true,
          adapterCreator: channel.guild.voiceAdapterCreator
        });
        message.reply(`تم انضمام البوت إلى القناة الصوتية: ${channel.name}`);
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
      connection.destroy(); // إنهاء الاتصال بشكل كامل
      message.reply('تم مغادرة البوت من القناة الصوتية.');
    } else {
      message.reply('البوت غير متصل بأي قناة صوتية.');
    }
  }

  if (args[0] === '!unmute') {
    try {
      const connection = getVoiceConnection(message.guild.id);
      if (connection) {
        const receiver = connection.receiver;
        const stream = receiver.createStream(message.author, { mode: 'pcm' });
        stream.pause();
        message.reply('تم إزالة الكتم والإسكات عن البوت.');
      } else {
        message.reply('البوت غير متصل بأي قناة صوتية.');
      }
    } catch (error) {
      console.error('Failed to unmute the bot:', error);
      message.reply('حدث خطأ عند محاولة إزالة الكتم عن البوت.');
    }
  }
});

// تسجيل الدخول إلى Discord
client.login(process.env.token);
