const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "unlock",
    description: "Unlock a channel for a role!",
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

        await interaction.channel.permissionOverwrites.edit(`${role.id}`, { SEND_MESSAGES: null });

        const embed = new MessageEmbed()
            .setColor('#2ECC71')
            .setDescription(`🔓 The channel has been unlocked for ${role}`);
    
        await interaction.editReply({ embeds: [embed], ephemeral: false });
        //await interaction.editReply({ content: `Channel unlock for : ${role}`, ephemeral: false });
    },
};