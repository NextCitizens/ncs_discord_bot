const ms = require('ms');

module.exports = {
    name: 'mute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'mute [@cible] [temps] [raison]',
    exemples: ['mute @user 2 minutes raison'],
    description: 'Mute un utilisateur pendant un temps avec une raison!',
    options: [
        {
            name: 'cible',
            description: 'L\'utilisateur à mute',
            type: 'USER',
            required: true
        },
        {
            name: 'temps',
            description: 'Le temps du mute',
            type: 'STRING',
            required: true
        },
        {
            name: 'raison',
            description: 'La raison du mute',
            type: 'STRING',
            required: true
        }
    ],
    async runInteration(client, interaction) {
        const cible = interaction.options.getMember('cible');
        const temps = interaction.options.getString('temps');
        const convertedTime = ms(temps);
        const raison = interaction.options.getString('raison');

        if (!cible.moderatable) return interaction.reply('Cette utilisateur ne peut pas etre mute!');
        if (!convertedTime) return interaction.reply('Spécifier une durée valable!')

        cible.timeout(convertedTime, raison);
        interaction.reply(`L'utilisateur ${cible} a bien été mute, pendant ${temps}, pour : ${raison}`)
    }
};