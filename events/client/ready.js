const Logger = require('../../utils/Logger');
const config = require('../../config.json')
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        Logger.client('Bot ON');

        client.user.setPresence({ 
            activities: [
                { 
                    name: 'foltone dev', 
                    type: 'WATCHING' 
                }
            ], 
            status: 'online' 
        })

        const devGuild = await client.guilds.cache.get(config.guild);
        devGuild.commands.set(client.commands.map(cmd => cmd));
    }, // quand le bot se lance
};