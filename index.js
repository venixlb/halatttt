const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Tinatix.aternos.me', // IP السيرفر
    port: 30806,                // البورت (25565 الافتراضي)
    username: '24h',            // اسم البوت (لو السيرفر cracked حط أي اسم)
    version: '1.21.8'           // نسخة السيرفر
  })

  // ✅ لما يشتغل البوت
  bot.on('spawn', () => {
    console.log('✅ Bot is online!')

    // 🛡️ Anti-AFK (ينط كل دقيقة)
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 250)
    }, 60000) // كل 60 ثانية
  })

  // 🛠️ لو البوت اتركل (سيرفر طرده)
  bot.on('kicked', (reason) => {
    console.log('⛔ Kicked:', reason)
  })

  // 🐛 لو فيه error
  bot.on('error', (err) => {
    console.log('⚠️ Error:', err)
  })

  // 🔄 اعادة الاتصال بعد 10 ثواني
  bot.on('end', () => {
    console.log('❌ Bot disconnected, reconnecting in 10s...')
    setTimeout(createBot, 10000)
  })
}

createBot()
