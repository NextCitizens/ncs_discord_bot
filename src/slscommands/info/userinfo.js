const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'Get information about a user.',
  permissions: ['SEND_MESSAGES'],
  usage: '/userinfo [user]',
  exemples: ['/userinfo @user#1234'],
  options: [
    {
      name: 'target',
      description: 'specify user',
      required: false,
      type: 'USER',
    },
  ],

  run: async (client, interaction, args) => {
    const target = interaction.options.getMember('target');
    const targetInfo = target ? interaction.options.getMember('target') : interaction.member;

    const embed = new MessageEmbed()
        .setAuthor({ name: `${targetInfo.user.username}`, iconURL: `${targetInfo.user.displayAvatarURL()}` })
        .setTitle(`Information about ${targetInfo.displayName}:`)
        .setColor('BLUE')
        .setThumbnail(`${targetInfo.user.displayAvatarURL()}`)
        .addFields(
            { name: '► Name:', value: `${targetInfo.user.tag}`, inline: true },
            { name: '► ID:', value: `${targetInfo.id}`, inline: true },
            { name: '► Nickname:', value: `${targetInfo.nickname ? targetInfo.nickname : '❌'}`, inline: true },
            { name: '► Badges', value: `${targetInfo.user.flags.bitfield > 0 ? targetInfo.user.flags.toArray().join(', ') : '❌'}`, inline: true },
            { name: '► Moderator', value: `${targetInfo.kickable ? '❌' : '✅'}`, inline: true },
            { name: '► Bot', value: `${targetInfo.user.bot ? '✅' : '❌'}`, inline: true },
            { name: '► Roles:', value: `${targetInfo.roles.cache.map((role) => role).join(', ').replace(', @everyone', ' ')}`, inline: false },
            { name: '► Created at:', value: `<t:${parseInt(targetInfo.user.createdTimestamp / 1000)}:f> (<t:${parseInt(targetInfo.user.createdTimestamp / 1000)}:R>)`, inline: true },
            { name: '► Joined at:', value: `<t:${parseInt(targetInfo.joinedTimestamp / 1000)}:f> (<t:${parseInt(targetInfo.joinedTimestamp / 1000)}:R>)`, inline: true },
        )
        .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
    await interaction.reply({ embeds: [embed] });
  },
};
