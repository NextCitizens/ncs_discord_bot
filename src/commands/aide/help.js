const { MessageEmbed } = require('discord.js');
const config = require('../../settings/config.json');
const { readdirSync } = require('fs');

module.exports = {
  name: 'help',
  aliases: ['h'],
  permissions: ['SEND_MESSAGES'],
  description: 'A command to guide you.',

  run: async (client, message, args, prefix) => {
    try {
      if (!args[0]) {
        const categories = [];

        const ignored = ['owner'];

        const emo = {
          aide: '❓',
          other: '🔰',
        };

        readdirSync('./commands/').forEach((dir) => {
          if (ignored.includes(dir.toLowerCase())) return;
          const name = `${
            emo[dir.toLowerCase()]
          } ${dir.toUpperCase()}`;
          let cats = {};

          cats = {
            name: name,
            value: `\`-> ${prefix}help ${dir.toLowerCase()}\``,
            inline: true,
          };

          categories.push(cats);
        });

        const embed = new MessageEmbed()
            .setTitle(`Help Menu - Prefix: \`${prefix}\``)
            .addFields(categories)
            .setFooter(
                `Asked by ${message.author.tag}`,
                message.author.displayAvatarURL({
                  dynamic: true,
                }),
            )
            .setTimestamp()
            .setThumbnail(
                client.user.displayAvatarURL({
                  dynamic: true,
                }),
            )
            .setColor(config.embed.color);

        return message.channel.send({ embeds: [embed] });
      } else {
        const cots = [];
        const catts = [];

        readdirSync('./commands/').forEach((dir) => {
          if (dir.toLowerCase() !== args[0].toLowerCase()) return;
          const commands = readdirSync(
              `./commands/${dir}/`,
          ).filter((file) => file.endsWith('.js'));

          const cmds = commands.map((command) => {
            const file = require(`../../commands/${dir}/${command}`);

            if (!file.name) return 'No name for this command.';

            const name = file.name.replace('.js', '');

            const des = `${client.commands.get(name).description}`;

            const obj = {
              cname: `\`${name}\``,
              des,
            };

            return obj;
          });

          let dota = {};

          cmds.map((co) => {
            dota = {
              name: `${
                                cmds.length === 0 ?
                                    'Currently in development' :
                                    co.cname
              }`,
              value: co.des ? co.des : 'No description.',
              inline: true,
            };
            catts.push(dota);
          });

          cots.push(dir.toLowerCase());
        });

        const command =
                    client.commands.get(args[0].toLowerCase()) ||
                    client.commands.find(
                        (c) =>
                          c.aliases &&
                            c.aliases.includes(args[0].toLowerCase()),
                    );

        if (cots.includes(args[0].toLowerCase())) {
          const combed = new MessageEmbed()
              .setTitle(
                  `Help command - **${
                    args[0].charAt(0).toUpperCase() +
                                args[0].slice(1)
                  }**`,
              )
              .setDescription(
                  `Use \`${prefix}help\` to have more informations about the command. \n For example: \`${prefix}help ping\`.\n\n`,
              )
              .addFields(catts)
              .setColor(config.embed.color);

          return message.channel.send({ embeds: [combed] });
        }

        if (!command) {
          const embed = new MessageEmbed()
              .setTitle(
                  `Command not found ! \`${prefix}help\` to have the list of all the commands.`,
              )
              .setColor('RED');
          return message.channel.send({ embeds: [embed] });
        }

        const embed = new MessageEmbed()
            .setTitle('Help commands:')
            .addField(
                'Command:',
                        command.name ?
                            `\`${command.name}\`` :
                            'No name for this command.',
            )
            .addField(
                'Aliases:',
                        command.aliases ?
                            `\`${command.aliases.join('` `')}\`` :
                            'No alias.',
            )
            .addField(
                'Usage:',
                        command.usage ?
                            `\`${prefix}${command.name} ${command.usage}\`` :
                            `\`${prefix}${command.name}\``,
            )
            .addField(
                'Description:',
                        command.description ?
                            command.description :
                            'No description.',
            )
            .setFooter(
                `Asked by ${message.author.tag}`,
                message.author.displayAvatarURL({
                  dynamic: true,
                }),
            )
            .setTimestamp()
            .setColor(config.embed.color);
        return message.channel.send({ embeds: [embed] });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
