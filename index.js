const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Tinatix.aternos.me',
    port: 30806,
    username: '24h',
    version: '1.21.8' // 👈 النسخة الجديدة
  });

  bot.on('spawn', () => {
    console.log('✅ Bot is online!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 250);
    }, 60000);
  });

  bot.on('kicked', (reason) => console.log('⛔ Kicked:', reason));
  bot.on('error', (err) => console.log('⚠️ Error:', err));
  bot.on('end', () => {
    console.log('❌ Bot disconnected, reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });
}

createBot();
