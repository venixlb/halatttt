const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'YOUR.SERVER.IP', // server IP
    port: 25565,            // server port (default 25565)
    username: 'BotName'     // cracked: any name, premium: use email
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
