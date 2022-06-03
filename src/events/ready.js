const client = require('..');

client.on('ready', () => {
  console.log(`\x1b[32m[BOT ON]\x1b[33m ${client.user.username} `);

  client.user.setActivity(`at the devs.`, {
    type: 'WATCHING',
  });
});
