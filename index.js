const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const express = require("express");
const wrtc = require('wrtc');
const { desktopCapturer } = require('electron');

const client = new Client();
const app = express();

app.listen(process.env.PORT || 2000, () => {
  console.log('Your app is listening on port ' + (process.env.PORT || 2000));
});

app.get('/', (req, res) => {
  res.send('<center><h1>Bot 24H ON!</h1></center>');
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
        joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          selfMute: true,
          selfDeaf: true,
          adapterCreator: channel.guild.voiceAdapterCreator
        });
        message.reply(`تم انضمام Venix إلى القناة الصوتية: ${channel.name}`);
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
      message.reply('تم مغادرة Venix من القناة الصوتية.');
    } else {
      message.reply('Venix غير متصل بأي قناة صوتية.');
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

  if (args[0] === '!shareScreen') {
    try {
      const channel = message.member.voice.channel;
      if (channel) {
        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          selfMute: true,
          selfDeaf: true,
          adapterCreator: channel.guild.voiceAdapterCreator
        });

        const peerConnection = new wrtc.RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            console.log('New ICE candidate:', event.candidate);
          }
        };

        peerConnection.ontrack = (event) => {
          console.log('New track:', event.streams[0]);
        };

        desktopCapturer.getSources({ types: ['screen'] }).then(async (sources) => {
          const screenSource = sources[0];
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: screenSource.id,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720
              }
            }
          });

          stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);

          message.reply('تم بدء مشاركة الشاشة.');
        }).catch(err => {
          console.error('Failed to capture screen:', err);
          message.reply('حدث خطأ عند محاولة مشاركة الشاشة.');
        });

      } else {
        message.reply('يرجى الانضمام إلى قناة صوتية أولاً.');
      }
    } catch (error) {
      console.error('Failed to start screen share:', error);
      message.reply('حدث خطأ عند محاولة بدء مشاركة الشاشة.');
    }
  }
});

client.login(process.env.token);
