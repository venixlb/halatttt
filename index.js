const { Client } = require('discord.js-selfbot-v13');
const client = new Client(); 
const express = require("express");
const app = express();
const { joinVoiceChannel } = require('@discordjs/voice');

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

  // جلب القناة الصوتية من السيرفر
  const channel = await client.channels.fetch(process.env.channel);
  
  // التحقق من إذا كنت موجودًا بالفعل في القناة الصوتية
  if (!channel.members.has(client.user.id)) {
    const VoiceConnection = joinVoiceChannel({
      channelId: channel.id, 
      guildId: process.env.guild, 
      selfMute: true,
      selfDeaf: true,
      adapterCreator: channel.guild.voiceAdapterCreator 
    });
  }
});

// تسجيل الدخول إلى حساب Discord
client.login(process.env.token);
