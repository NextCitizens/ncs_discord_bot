module.exports = {
  name: 'clear',
  description: 'To delete some messages in channels.',
  permissions: [''],
  type: 1,
  options: [
    {
      name: 'number',
      description: 'Give the number of message deleted',
      required: true,
      type: 3,
    },
  ],

  run: async (client, interaction, args) => {
    const count = args;
    if (
      !count ||
            isNaN(args) ||
            !Number.isInteger(Number(args)) ||
            args > 99 ||
            args < 2
    ) {
      return interaction.followUp('The number is incorect !');
    }
    const channel = await interaction.channel
        .bulkDelete(Number(args) + 1)
        .catch((err) => {});
    if (!channel) return;
    await interaction.channel.send(
        `✅ I have deleted ${count} messages.`,
    );
  },
};
