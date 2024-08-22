const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');
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

// التأكد من بقاء البوت في القناة الصوتية
client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

  setInterval(async () => {
    try {
      const channel = await client.channels.fetch(process.env.channel);
      if (channel && channel.isVoice()) {
        joinVoiceChannel({
          channelId: channel.id, 
          guildId: channel.guild.id, 
          selfMute: false,
          selfDeaf: false,
          adapterCreator: channel.guild.voiceAdapterCreator 
        });
      }
    } catch (error) {
      console.error('Error joining voice channel:', error);
    }
  }, 10000); // كل 10 ثواني
});

// معالجة أوامر كتم وإسكات المستخدمين
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // تجاهل رسائل البوتات الأخرى

  const args = message.content.split(' ');

  if (args[0] === '!deafen') {
    const member = message.mentions.members.first();
    if (!member) return message.reply('يرجى تحديد عضو صحيح.');

    try {
      await member.voice.setDeaf(true);
      await member.voice.setMute(true);
      message.reply(`${member.user.username} تم كتمه وإسكاته.`);
    } catch (error) {
      console.error('Failed to deafen/mute the user:', error);
      message.reply('لا يمكنني كتم أو إسكات هذا المستخدم.');
    }
  }

  if (args[0] === '!undeafen') {
    const member = message.mentions.members.first();
    if (!member) return message.reply('يرجى تحديد عضو صحيح.');

    try {
      await member.voice.setDeaf(false);
      await member.voice.setMute(false);
      message.reply(`${member.user.username} تم إلغاء كتمه وإسكاته.`);
    } catch (error) {
      console.error('Failed to undeafen/unmute the user:', error);
      message.reply('لا يمكنني إلغاء كتم أو إسكات هذا المستخدم.');
    }
  }
});

// تسجيل الدخول إلى Discord
client.login(process.env.token);
