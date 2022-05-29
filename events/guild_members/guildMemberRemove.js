const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(client, member) {
      const embed = new MessageEmbed()
        .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
        .setColor('RED')
        .setDescription(`Nom d'utilisateur : ${member}
        Créé le : <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
        Rejoin le : <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
        Quitté le : <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)
        `)
        .setTimestamp()
        .setFooter({ text: 'L\'utilisateur a quitté!' })

      const logChannel = client.channels.cache.get(config.logs)
      logChannel.send({ embeds : [embed] });
    },
};