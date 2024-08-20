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

  // جلب القناة الصوتية من السيرفر
  const channel = await client.channels.fetch(process.env.channel);
  
  // الاتصال بالقناة الصوتية إذا لم يكن البوت موجودًا فيها
  connectToChannel(channel);
});

// مستمع لأحداث الصوت لمعرفة متى يخرج البوت من القناة
client.on('voiceStateUpdate', (oldState, newState) => {
  // التحقق من أن المستخدم هو البوت نفسه
  if (oldState.member.id === client.user.id) {
    const channel = oldState.guild.channels.cache.get(process.env.channel);
    
    // إذا خرج البوت من القناة الصوتية
    if (!newState.channelId) {
      console.log("Bot left the voice channel. Reconnecting...");
      connectToChannel(channel);
    }
  }
});

// دالة للاتصال بالقناة الصوتية
function connectToChannel(channel) {
  const connection = getVoiceConnection(channel.guild.id);
  
  if (!connection) {
    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      selfMute: true,
      selfDeaf: true,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
  }
}

// تسجيل الدخول إلى حساب Discord
client.login(process.env.token);
