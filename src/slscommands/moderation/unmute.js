module.exports = {
  name: 'unmute',
  description: 'Unmute a user!',
  permissions: ['MODERATE_MEMBERS'],
  type: 1,
  options: [
    {
      name: 'target',
      description: 'User to unmute',
      type: 'USER',
      required: true,
    },
  ],

  run: async (client, interaction, args) => {

    const target = interaction.options.getMember('target');

    if (!target.isCommunicationDisabled()) return interaction.editReply('This user cannot be unmuted!');

    target.timeout(null);
    await interaction.editReply(`User ${target} was successfully unmuted!`);

  },
};
