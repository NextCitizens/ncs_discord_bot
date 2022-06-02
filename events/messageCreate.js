const client = require("..");
var config = require("../settings/config.json");
const { MessageEmbed } = require("discord.js");

client.on("messageCreate", async (message) => {
    let prefix = config.prefix;
    if (!message.guild) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command =
        client.commands.get(cmd.toLowerCase()) ||
        client.commands.find(
            (cmds) => cmds.aliases && cmds.aliases.includes(cmd)
        );
    if (!command) return;
    if (command) {
        if (!message.member.permissions.has(command.permissions || [])) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed.color)
                        .setDescription(
                            `❌ You don't have the permissions **${command.permissions}** to use this command **${command.name}.** `
                        ),
                ],
            });
        }
        command.run(client, message, args, prefix);
    }
});
