module.exports = {
  name: 'unmute',
  category: 'moderation',
  description: 'Unmute a user!',
  permissions: ['MODERATE_MEMBERS'],
  usage: '/unmute [user]',
  exemples: ['/unmute @user#1234'],
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

    if (!target.isCommunicationDisabled()) return interaction.reply('This user cannot be unmuted!');

    target.timeout(null);
    await interaction.reply(`User ${target} was successfully unmuted!`);

  },
};
