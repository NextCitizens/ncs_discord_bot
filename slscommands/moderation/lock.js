const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "lock",
    description: "Lock a channel for a role!",
    permissions: ["MANAGE_CHANNELS"],
    type: 1,
    options: [
        {
            name: 'role',
            description: 'Select role',
            type: 'ROLE',
            required: true
        }
    ],
    run: async (client, interaction, args) => {
        const role = interaction.options.getRole('role');

        await interaction.channel.permissionOverwrites.edit(`${role.id}`, { SEND_MESSAGES: false });

        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setDescription(`🔒 The channel has been locked for ${role}`);
    
        await interaction.editReply({ embeds: [embed], ephemeral: false });
        // await interaction.editReply({ content: `Channel lock for : ${role}`, ephemeral: false });
    },
};