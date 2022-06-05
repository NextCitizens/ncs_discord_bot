module.exports = {
  name: 'clear',
  category: 'moderation',
  description: 'To delete some messages in channels.',
  permissions: ['MANAGE_MESSAGES'],
  usage: 'clear [number] <@user#1234>',
  exemples: ['ban @user#1234 spamming'],
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
    if (number > 99 || number < 2) return interaction.editReply('Number must not exceed 100 and must not lower 0!');
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
      interaction.channel.bulkDelete(number+1, filterCibleMessages, true).then((messages) => {
        interaction.channel.send(`${messages.size-1} message from ${target}, has been deleted!`);
      });
    } else {
      interaction.channel.bulkDelete(number+1, true).then((messages) => {
        interaction.channel.send(`${messages.size-1} messages have been successfully deleted!`);
      });
    }
  },
};
