const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')
module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member) {
        const embed = new MessageEmbed()
        .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
        .setColor('GREEN')
        .setDescription(`Nom d'utilisateur : ${member}
        Créé le : <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
        Rejoin le : <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
        `)
        .setTimestamp()
        .setFooter({ text: 'L\'utilisateur a rejoint!' })

      const logChannel = client.channels.cache.get(config.logs)
      logChannel.send({ embeds : [embed] });
    },
};