const { MessageAttachment } = require('discord.js');
const client = require('../index');
const config = require('../../config.json');
const Canvas = require('canvas');

client.on('guildMemberRemove', async (member) => {
  if (!member.guild) return;

  const canvas = Canvas.createCanvas(1772, 633);
  const context = canvas.getContext('2d');
  const background = await Canvas.loadImage(`../img/welcome.png`);

  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#f2f2f2';
  context.strokeRect(0, 0, canvas.width, canvas.height);

  const textString3 = `${member.user.username}`;

  if (textString3.length >= 14) {
    context.font = 'bold 100px "Arial"';
    context.fillStyle = '#f2f2f2';
    context.fillText(textString3, 720, canvas.height / 2 + 20);
  } else {
    context.font = 'bold 150px "Arial"';
    context.fillStyle = '#f2f2f2';
    context.fillText(textString3, 720, canvas.height / 2 + 20);
  }

  context.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
  context.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
  context.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
  const attachmentLeave = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

  member.guild.channels.fetch(config.channelMessageleave)
      .then((channel) => channel.send({ content: `Goodbye ${member.user}!`, files: [attachmentLeave] }) )
      .catch(console.error);
});
