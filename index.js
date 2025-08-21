const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Tinatix.aternos.me', // :point_left: IP السيرفر بتاعك
    port: 30806,                // البورت (خليه 25565 إلا لو غيرته)
    username: '24h',        // اسم البوت (لو Cracked حط أي اسم)
    version: '1.21.8'           // :point_left: هنا النسخة الصح
  })

  bot.on('spawn', () => {
    console.log(':white_check_mark: Bot is online!')
  })

  bot.on('end', () => {
    console.log(':x: Bot disconnected, reconnecting...')
    setTimeout(createBot, 5000)
  })
}

createBot()
