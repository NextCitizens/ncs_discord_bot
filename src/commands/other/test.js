module.exports = {
  name: 'test',
  aliases: ['t'],
  permissions: ['SEND_MESSAGES'],
  description: '',

  run: async (client, message, args) => {
    message.channel.send('test');
  },
};
