const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "Get information about a user.",
    permissions: ["SEND_MESSAGES"],
    options: [
        {
            name: "target",
            description: "specify user",
            required: true,
            type: "USER",
        }
    ],
    run: async (client, interaction, args) => {
        const target = interaction.options.getMember("target");

        const embed = new MessageEmbed()
        .setTitle(`Information about ${target.displayName}:`)
        .setColor('BLUE')
        .addFields(
            { name: '► Name:', value: `${target.user.tag}\n (User ID | ${target.id})`, inline: true, },
            { name: '► Moderator', value: `${target.kickable ? '❌' : '✅'}`, inline: true, },
            { name: '► Bot', value: `${target.user.bot ? '✅' : '❌'}`, inline: true, },
            { name: '► Roles:', value: `${target.roles.cache.map(role => role).join(', ').replace(', @everyone', ' ')}`, inline: false, },
            { name: '► Account creation :', value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:f> (<t:${parseInt(target.user.createdTimestamp / 1000)}:R>)`, inline: true, },
            { name: '► Joined the server on:', value: `<t:${parseInt(target.joinedTimestamp / 1000)}:f> (<t:${parseInt(target.joinedTimestamp / 1000)}:R>)`, inline: true, },
        )
        .setImage(target.user.displayAvatarURL())
        await interaction.editReply({ embeds: [embed], ephemeral: true });
    },
};