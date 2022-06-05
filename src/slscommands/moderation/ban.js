
module.exports = {
  name: 'ban',
  category: 'moderation',
  description: 'This command is to ban people.',
  permissions: ['BAN_MEMBERS'],
  usage: '/ban [user] [reason]',
  exemples: ['/ban @user#1234 spamming'],
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


    if (!target.bannable) return interaction.followUp('This user can\'t be ban');
    target.ban({ reason });
    await interaction.reply(`User ${target} successfully banned for: ${reason}`);
  },
};
