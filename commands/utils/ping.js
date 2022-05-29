module.exports = {
    name: 'ping',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'ping',
    exemples: ['ping'],
    description: 'Commande ping!',
    async runInteration(client, interaction) {
        interaction.reply(`🏓Pong!`);
    }
};