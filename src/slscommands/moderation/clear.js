module.exports = {
  name: 'clear',
  category: 'moderation',
  description: 'To delete some messages in channels.',
  permissions: ['MANAGE_MESSAGES'],
  usage: '/clear [number] <@user#1234>',
  exemples: ['/clear 10 @user#1234', 'clear 10'],
  type: 1,
  options: [
    {
      name: 'number',
      description: 'Give the number of message deleted.',
      required: true,
      type: 'NUMBER',
      min_value: 1,
      max_value: 100,
    },
    {
      name: 'target',
      description: 'Select a specific user.',
      type: 'USER',
      required: false,
    },
  ],

  run: async (client, interaction, args) => {
    const number = interaction.options.getNumber('number');
    const target = interaction.options.getMember('target');

    const messageToDelet = await interaction.channel.messages.fetch();

    if (target) {
      let i = 0;
      const filterCibleMessages = [];
      (await messageToDelet).filter((msg) => {
        if (msg.author.id == target.id && number > i) {
          filterCibleMessages.push(msg); i++;
        }
      });
      interaction.channel.bulkDelete(number, filterCibleMessages, true).then((messages) => {
        interaction.reply(`${messages.size} message from ${target}, has been deleted!`);
      });
    } else {
      interaction.channel.bulkDelete(number, true).then((messages) => {
        interaction.reply(`${messages.size} messages have been successfully deleted!`);
      });
    }
  },
};
