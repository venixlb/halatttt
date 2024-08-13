const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});
//environment
require('dotenv').config()

function formatTime() { 
  const date = new Date();
  const options = {
    timeZone: 'America/New_York', 
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
const express = require("express")
const app = express();
var listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});
client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1265825059692609587')
    .setType('PLAYING')
    .setURL('https://discord.gg/kaPpCNMhyP') 
    .setState('Hey Sau is here')
    .setName('sau')
    .setDetails(`Sau is here`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1256945067935924245/1272871297864433738/IMG_8628.png?ex=66bc8d46&is=66bb3bc6&hm=8df735fd9fae80f30c8c75ef4d18008926dfca13760d2b5535d9f22438e88266&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Sau') 
    .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1256945067935924245/1272871297864433738/IMG_8628.png?ex=66bc8d46&is=66bb3bc6&hm=8df735fd9fae80f30c8c75ef4d18008926dfca13760d2b5535d9f22438e88266&') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Sau On Top') 
    .addButton('Google', 'https://google.com');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
