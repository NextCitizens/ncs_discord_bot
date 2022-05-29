const { Interaction } = require("discord.js");

const prefix = '!';
const ownerId = '426065745374478347';

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(client, message) {
        if (message.author.bot) return; // le bot ignore ces propre message
        if (!message.content.startsWith(prefix)) return; // si il n'y a pas de prefix ignorer le message

        const args = message.content.slice(prefix.length).trim().split(/ +/g); // get les argument après le préfix
        const cmdName = args.shift().toLowerCase();
        if (cmdName.length == 0 ) return;

        let cmd = client.commands.get(cmdName);
        if (!cmd) return message.reply('Cette commande n\'existe pas!');

        if (cmd.ownerOnly) {
            if (message.author.id != ownerId) return message.reply('Seule le fondateur peut effectuer cette commande!')
        }


        if (!message.member.permissions.has([cmd.permissions])) return message.reply(`Tu n'a pas les permissions requise, (\`${cmd.permissions.join(', ')}\`) pour taper cette commande!`);

        if (cmd) cmd.run(client, message, args);
    },
};