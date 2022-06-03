const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unlock',
  description: 'Unlock a channel for a role!',
  permissions: ['MANAGE_CHANNELS'],
  type: 1,
  options: [
    {
      name: 'role',
      description: 'Select role',
      type: 'ROLE',
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const role = interaction.options.getRole('role');

    if (role.rawPosition > interaction.guild.me.roles.highest.rawPosition) return interaction.editReply('The bot cannot unlock the channel for this role!');

    await interaction.channel.permissionOverwrites.edit(`${role.id}`, { SEND_MESSAGES: null });

    const embed = new MessageEmbed()
        .setColor('#2ECC71')
        .setDescription(`🔓 The channel has been unlocked for ${role}`);

    await interaction.editReply({ embeds: [embed] });
  },
};
