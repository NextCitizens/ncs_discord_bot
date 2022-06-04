const fs = require('fs');

module.exports = (client) => {
  try {
    fs.readdirSync('src/events/').forEach((file) => {
      const events = fs
          .readdirSync('src/events/')
          .filter((file) => file.endsWith('.js'));
      for (const file of events) {
        const pull = require(`../events/${file}`);
        if (pull.name) {
          client.events.set(pull.name, pull);
        }
      }
      console.log(`\x1b[32m[HANDLERS]\x1b[33m ${file} loaded !`);
    });
  } catch (e) {
    console.log(e.message);
  }
};
