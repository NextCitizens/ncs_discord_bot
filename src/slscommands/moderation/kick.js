module.exports = {
  name: 'kick',
  description: 'This command is to kick people.',
  permissions: ['KICK_MEMBERS'],
  type: 1,
  options: [
    {
      name: 'target',
      description: 'specify user',
      required: true,
      type: 'USER',
    },
    {
      name: 'reason',
      description: 'specify reason',
      required: true,
      type: 'STRING',
    },
  ],

  run: async (client, interaction, args) => {

    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason');


    if (!target.kickable) return interaction.followUp('This user can\'t be kick !');
    target.kick( reason );
    await interaction.channel.send(
        `User ${target} successfully kicked for: ${reason}`,
    );
  },
};
