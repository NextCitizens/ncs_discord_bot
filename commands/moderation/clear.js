module.exports = {
    name: 'clear',
    category: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clear [nombre] <@cible>',
    exemples: ['clear 20', 'clear 99 @user'],
    description: 'Clear un certain nombre de message!',
    options: [
        {
            name: 'nombre',
            description: 'Le nombre de message a supprimer',
            type: 'NUMBER',
            required: true,
        },
        {
            name: 'cible',
            description: 'Selectionner un utilisateur spécifique',
            type: 'USER',
            required: false,
        }
    ],
    async runInteration(client, interaction) {
        const nombreDelet = interaction.options.getNumber('nombre');
        if (nombreDelet > 100 || nombreDelet < 0) return interaction.reply('Le nombre ne doit pas dépasser 100 et doit etre supérieur à 0!');
        const cibleDelet = interaction.options.getMember('cible');

        const messageToDelet = await interaction.channel.messages.fetch();

        if (cibleDelet) {
            let i = 0;
            const filterCibleMessages = [];
            (await messageToDelet).filter(msg => {
                if (msg.author.id == cibleDelet.id && nombreDelet > i) {
                    filterCibleMessages.push(msg); i++;
                }
            });
            await interaction.channel.bulkDelete(filterCibleMessages, true).then(messages => {
                interaction.reply(`J'ai bien supprimé ${messages.size} messages sur l'utilisateur ${cibleDelet}`)
            })
        } else {
            await interaction.channel.bulkDelete(nombreDelet, true).then(messages => {
                interaction.reply(`J'ai bien supprimé ${messages.size} messages dans ce channel.`)
            })
        }
    }
};