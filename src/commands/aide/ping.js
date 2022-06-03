module.exports = {
  name: 'ping',
  aliases: ['p'],
  permissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
  description: '',

  run: async (client, message, args) => {
    message.channel.send({ content: `${client.ws.ping} ping` });
  },
};
