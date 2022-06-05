const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('src/slscommands');

module.exports = {
  name: 'help',
  category: 'info',
  description: 'A command to guide you.',
  permissions: ['SEND_MESSAGES'],
  usage: '/help <command>',
  exemples: ['/help ping'],
  options: [
    {
      name: 'command',
      description: 'specify command',
      required: false,
      type: 'STRING',
    },
  ],

  run: async (client, interaction, args) => {
    const pullName = interaction.options.getString('command');
    if (!pullName) {
      const noArgsEmbed = new MessageEmbed()
          .setColor('RED')
          .setTitle(`Help commands`)
          .addField('List of commands', `For more information about a command, type: \`/help <command>\``)
          .setImage(`https://cdn.discordapp.com/banners/979505357091135498/a_d3a92a04ae19dcd73d1f44cc9fb076d1.gif`);
      for (const category of commandFolder) {
        noArgsEmbed.addField(
            `${category.replace(/(^\W|\S\W)/g, (firstLetter) => firstLetter.toUpperCase())}`,
            `\`${client.slashCommands.filter((pull) => pull.category == category.toLocaleLowerCase()).map((pull) => pull.name).join(', ')}\``,
        );
      }
      return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true });
    }

    const pull = client.slashCommands.get(pullName);
    if (!pull) return interaction.reply({ content: 'This command doesn\'t exist!', ephemeral: true });
    const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`Help command: ${pull.name}`)
        .addFields(
            { name: 'Category:', value: `${pull.category}`, inline: true },
            { name: 'Description:', value: `${pull.description ? pull.description : contextDescription[`${pull.name}`]}`, inline: true },
            { name: 'Permissions:', value: `${pull.permissions.join(', ')}`, inline: true },
            { name: 'Usage:', value: `\`${pull.usage}\``, inline: true },
            { name: 'Exemple:', value: `\`${pull.exemples.join(', ')}\``, inline: true },
        )
        .addField('\ninformation: ', '[] = required option | <> = optional option\nDon\'t include these characters -> [] dand <> in your commands.');
    return interaction.reply({ embeds: [embed] });
  },
};
