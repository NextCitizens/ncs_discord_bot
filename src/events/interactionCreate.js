const { MessageEmbed } = require('discord.js');
const client = require('..');
const config = require('../../config.json');

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) {
      return interaction.followUp({
        content: 'An error has occurred.',
      });
    }

    const args = [];

    for (const option of interaction.options.data) {
      if (option.type === 'SUB_COMMAND') {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
        interaction.user.id,
    );

    if (cmd) {
      if (!interaction.member.permissions.has(cmd.permissions || [])) {
        return interaction.followUp({
          embeds: [
            new MessageEmbed()
                .setColor(config.embed.color)
                .setDescription(
                    `❌ You don't have the permissions **${cmd.permissions}** to use this command **${cmd.name}.** `,
                ),
          ],
        });
      }
      cmd.run(client, interaction, args);
    }
  }

  if (interaction.isContextMenu()) {
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});
