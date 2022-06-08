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
    const target = interaction.options.getMember('target') ?? interaction.member;

    const embed = new MessageEmbed()
        .setAuthor({ name: `${target.user.username}`, iconURL: `${target.user.displayAvatarURL()}` })
        .setTitle(`Information about ${target.displayName}:`)
        .setColor('BLUE')
        .setThumbnail(`${target.user.displayAvatarURL()}`)
        .addFields(
            { name: '► Name:', value: `${target.user.tag}`, inline: true },
            { name: '► ID:', value: `${target.id}`, inline: true },
            { name: '► Nickname:', value: `${target.nickname ? target.nickname : '❌'}`, inline: true },
            { name: '► Badges', value: `${target.user.flags.bitfield > 0 ? target.user.flags.toArray().join(', ') : '❌'}`, inline: true },
            { name: '► Moderator', value: `${target.kickable ? '❌' : '✅'}`, inline: true },
            { name: '► Bot', value: `${target.user.bot ? '✅' : '❌'}`, inline: true },
            { name: '► Roles:', value: `${target.roles.cache.map((role) => role).join(', ').replace(', @everyone', ' ')}`, inline: false },
            { name: '► Created at:', value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:f> (<t:${parseInt(target.user.createdTimestamp / 1000)}:R>)`, inline: true },
            { name: '► Joined at:', value: `<t:${parseInt(target.joinedTimestamp / 1000)}:f> (<t:${parseInt(target.joinedTimestamp / 1000)}:R>)`, inline: true },
        )
        .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });
    await interaction.reply({ embeds: [embed] });
  },
};
