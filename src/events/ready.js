const client = require('..');
const config = require('../settings/config.json');

client.on('ready', () => {
  console.log(`\x1b[32m[BOT ON]\x1b[33m ${client.user.username} `);

  client.user.setActivity(config.botStatusMessage, {
    type: 'WATCHING',
  });
});
