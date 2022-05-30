const { Message, Client, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");




module.exports = {
    name: "info",
    aliases: ["i"],
    permissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
    description: "",

    run: async (client, message, args) => {
        const row = new MessageActionRow()

        .addComponents(
            new MessageSelectMenu()
                .setCustomId('option')
                .setPlaceholder('Choisis une option')
                .addOptions([
                    {
                        label: 'Documentation',
                        description: 'La documentation du ncs core',
                        value: 'first_option',
                    },
                    {
                        label: 'Download',
                        description: 'Vous permet de télécharger le ncs core',
                        value: 'second_option',
                    },
                    {
                        label: 'NCS EXAMPLE SERVER',
                        description: 'Vous permet de télécharger le ncs core',
                        value: 'tr_option',
                    },
                ]),
        );



    await message.channel.send({ content: `Voici différentes informartion du ncs core` , components: [row] });

    },

};

