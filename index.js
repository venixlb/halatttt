const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Tinatix.aternos.me', // server IP
    port: 30806,            // server port (default 25565)
    username: '24bot'     // cracked: any name, premium: use email
    // password: 'PASSWORD' // only if premium
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
