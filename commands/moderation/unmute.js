module.exports = {
    name: 'unmute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'unmute [@cible]',
    exemples: ['unmute @user'],
    description: 'Unmute un utilisateur!',
    options: [
        {
            name: 'cible',
            description: 'L\'utilisateur à unmute',
            type: 'USER',
            required: true
        }
    ],
    async runInteration(client, interaction) {
        const cible = interaction.options.getMember('cible');

        if (!cible.isCommunicationDisabled()) return interaction.reply('Cette utilisateur ne peut pas etre unmute!');

        cible.timeout(null);
        interaction.reply(`L'utilisateur ${cible} a bien été unmute!`)
    }
};