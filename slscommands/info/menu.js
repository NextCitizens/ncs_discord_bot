const { CommandInteraction, Client, Message } = require("discord.js");
const wait = require("util").promisify(setTimeout);

module.exports = {
    name: "menu2",
    description: "ee",
    permissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],

    run: async (client, interaction, args, config) => {
        const {
            MessageActionRow,
            MessageSelectMenu,
            MessageEmbed,
        } = require("discord.js");

        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Choose a category.")
                .setMinValues(1)
                .setMaxValues(config.roles.length)
                .addOptions(config.roles)
        );

        const embed = new MessageEmbed()
            .setDescription(
                `This is the description of the menu, this is a system to give some roles.`
            )
            .setColor("36393F");

        await interaction.followUp({
            emebeds: [embed],
            components: [row],
        });
    },
};
