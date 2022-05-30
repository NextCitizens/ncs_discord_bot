const {  MessageActionRow, MessageEmbed, MessageButton } = require("discord.js");
const client = require("..");
var config = require("../settings/config.json");

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({
                content: "Une erreur est survenue.",
            });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(
            interaction.user.id
        );

        if (cmd) {
            if (!interaction.member.permissions.has(cmd.permissions || [])) {
                return interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                            .setColor(config.embed.color)
                            .setDescription(
                                `❌ Tu n'as pas la permission **${cmd.permissions}** d'utiliser la commande **${cmd.name}.** `
                            ),
                    ],
                });
            }
            cmd.run(client, interaction, args);
        }
    }

    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    if (interaction.isSelectMenu()) {
        let choice = interaction.values[0] 

        if(choice == 'first_option'){
            
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setURL('https://nextcitizens.github.io/ncs_documentation/')
                .setLabel('documentation')
                .setStyle('LINK')
            );

            await interaction.reply({ content: 'Voici la documentation du NCS CORE!', components: [row] });
        } else if(choice == 'second_option'){
            const row = new MessageActionRow()

            .addComponents(
                new MessageButton()
                .setURL('https://github.com/NextCitizens/ncs_core')
                .setLabel('Download')
                .setStyle('LINK')
            );
            await interaction.reply({ content: 'Voici Le lien pour pouvoir Telecharger Le NCS CORE!', components: [row] });

        } else if(choice == 'tr_option'){
            const row = new MessageActionRow()
    
            .addComponents(
                new MessageButton()
                .setURL('https://github.com/NextCitizens/ncs_example_server')
                .setLabel('Example Server')
                .setStyle('LINK')
            );
            await interaction.reply({ content: 'Voici Le lien pour pouvoir Telecharger Le NCS EXAMPLE SERVER!', components: [row] });
        }

	}   
});
