const fs = require('fs');

module.exports = (client) => {
  try {
    let command = 0;
    fs.readdirSync('../commands').forEach((cmd) => {
      const commands = fs
          .readdirSync(`../commands/${cmd}/`)
          .filter((file) => file.endsWith('.js'));
      for (cmds of commands) {
        const pull = require(`../commands/${cmd}/${cmds}`);
        if (pull.name) {
          client.commands.set(pull.name, pull);
          command++;
        } else {
          console.log(`${cmds} This command isn't ready !`);
          continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases)) {
          pull.aliases.forEach((alias) =>
            client.aliases.set(alias, pull.name),
          );
        }
      }
    });
    console.log(`\x1b[32m[COMMANDS]\x1b[33m ${command} commands loaded !`);
  } catch (e) {
    console.log(e.message);
  }
};
