const { CommandInteraction, Client } = require("discord.js");
const wait = require("util").promisify(setTimeout);

module.exports = {
    name: "ping",
    description: "Check the ping of the bot.",
    permissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],

    run: async (client, interaction, args) => {
        await interaction.editReply(
            `🏓 The ping of the bot is at ${Math.round(client.ws.ping)}ms.`
        );
    },
};
