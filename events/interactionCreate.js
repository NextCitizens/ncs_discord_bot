const { MessageEmbed } = require("discord.js");
const client = require("..");
var config = require("../settings/config.json");

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({
                content: "An error has occurred.",
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
                                `❌ You don't have the permissions **${cmd.permissions}** to use this command **${cmd.name}.** `
                            ),
                    ],
                });
            }
            cmd.run(client, interaction, args, config);
        }
    }

    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    if (!interaction.isSelectMenu()) return;
    if (interaction.customId === "select") {
        await interaction.deferUpdate();
        const member = await interaction.guild.members.fetch(interaction.user.id);

        let hasAlreadyRole = false;
        for (const value of interaction.values) {
            console.log(interaction.values);
            console.log("Value " + value);
            const role = interaction.guild.roles.cache.get(value);
            console.log("Role " + role);
            if (interaction.member.roles.cache.some((role) => role.id === value)) {
                hasAlreadyRole = true;
                await member.roles.remove(role);
            } else {
                await member.roles.add(role);
            }
        }
        await interaction.followUp({
            content: hasAlreadyRole
                ? "You already have some of the roles, I've removed them. The others have been added."
                : "Roles have been successfully added",
            ephemeral: true,
        });
    }
});
