const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');

module.exports = async client => {
    (await pGlob(`${process.cwd()}/events/*/*.js`)).map(async eventFile => {
        const event = require(eventFile);

        if (!event.name) return Logger.warn(`Event non déclenché pas de nom ↓\nFichier --> ${eventFile}`);

        if (!eventList.includes(event.name)) return Logger.syntax(`Event non déclenché erreur de syntax ↓\nFichier --> ${eventFile}`);
        
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }
    
        Logger.event(`- ${event.name}`);
    });
};

const eventList = ['apiRequest', 'apiResponse', 'applicationCommandCreate', 'applicationCommandDelete', 'applicationCommandUpdate', 'channelCreate', 'channelDelete', 'channelPinsUpdate', 'channelUpdate', 'debug', 'emojiCreate', 'emojiDelete', 'emojiUpdate', 'error', 'guildBanAdd', 'guildBanRemove', 'guildCreate', 'guildDelete', 'guildIntegrationsUpdate', 'guildMemberAdd', 'guildMemberAvailable', 'guildMemberRemove', 'guildMembersChunk', 'guildMemberUpdate', 'guildScheduledEventCreate', 'guildScheduledEventDelete', 'guildScheduledEventUpdate', 'guildScheduledEventUserAdd', 'guildScheduledEventUserRemove', 'guildUnavailable', 'guildUpdate', 'interaction', 'interactionCreate', 'invalidated', 'invalidRequestWarning', 'inviteCreate', 'inviteDelete', 'message', 'messageCreate', 'messageDelete', 'messageDeleteBulk', 'messageReactionAdd', 'messageReactionRemove', 'messageReactionRemoveAll', 'messageReactionRemoveEmoji', 'messageUpdate', 'presenceUpdate', 'rateLimit', 'ready', 'roleCreate', 'roleDelete', 'roleUpdate', 'shardDisconnect', 'shardError', 'shardReady', 'shardReconnecting', 'shardResume', 'stageInstanceCreate', 'stageInstanceDelete', 'stageInstanceUpdate', 'stickerCreate', 'stickerDelete', 'stickerUpdate', 'threadCreate', 'threadDelete', 'threadListSync', 'threadMembersUpdate', 'threadMemberUpdate', 'threadUpdate', 'typingStart', 'userUpdate', 'voiceStateUpdate', 'warn', 'webhookUpdate'];