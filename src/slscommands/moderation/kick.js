module.exports = {
  name: 'kick',
  category: 'moderation',
  description: 'This command is to kick people.',
  permissions: ['KICK_MEMBERS'],
  usage: '/kick [user] [reason]',
  exemples: ['/kick @user#1234 spamming'],
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
    await interaction.reply(`User ${target} successfully kicked for: ${reason}`);
  },
};
