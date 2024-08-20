const { Client } = require('discord.js-selfbot-v13');
const client = new Client(); 
const express = require("express");
const app = express();
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

// إنشاء السيرفر باستخدام Express
var listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center>
  </body>`);
});

// وظيفة جاهزية البوت
client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
  connectToVoiceChannel();
});

// مستمع لأحداث الصوت لمعرفة متى يخرج البوت من القناة
client.on('voiceStateUpdate', (oldState, newState) => {
  if (oldState.member.id === client.user.id && !newState.channelId) {
    console.log("Bot left the voice channel. Reconnecting...");
    connectToVoiceChannel();
  }
});

// دالة للاتصال بالقناة الصوتية
async function connectToVoiceChannel() {
  const channel = await client.channels.fetch(process.env.channel);
  const connection = getVoiceConnection(channel.guild.id);
  
  if (!connection || connection.channel.id !== channel.id) {
    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      selfMute: true,
      selfDeaf: true,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
    console.log(`Connected to voice channel: ${channel.name}`);
  }
}

// تسجيل الدخول إلى حساب Discord
client.login(process.env.token);
