const {
    Client,
    CommandInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Message,
} = require('discord.js');

const wait = require('util').promisify(setTimeout);

module.exports = {
    name: 'kick',
    description: 'Kick a user based on a reason!',
    permissions: ['KICK_MEMBERS'],
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
        }
    ],

    run: async (client, interaction, args) => {
        // let count = args;
        // if (!count || isNaN(args) || !Number.isInteger(Number(args)) ||  args > 99 || args < 2 )
        //     return interaction.followUp('Le nombre est invalide');
        // let channel = await interaction.channel  .bulkDelete(Number(args) + 1) .catch((err) => {});
        // if (!channel) return;
        // let msg = await interaction.channel.send( `✅ J'ai supprimer ${count} messages.` );


        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');

        if (!target.kickable) return interaction.reply('Cette utilisateur ne peut pas etre kick!');
        target.kick(reason);
        await interaction.editReply(`User ${target} successfully kicked for: ${reason}`);
        // await interaction.reply(`User ${target} successfully kicked for: ${reason}`);
        //await interaction.deferReply({ content:`User ${target} successfully kicked for: ${reason}`, ephemeral: false });
        //let msg = await interaction.reply( `User ${target} successfully kicked for: ${reason}` );
    },
};