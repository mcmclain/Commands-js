require("dotenv").config();
exports.run = async (client, message, args) => {
  return message.channel.send({
    embed: {
      color: 7948427,
      description:
        `**Here are my commands:**\n` +
        `\`${process.env.prefix}help\` - Shows this list of commands.\n` +
        `\`${process.env.prefix}power\` - Show's Someone's Power\n`,
      author: {
        icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
        name: `Help | Kk Bot`,
      },
      timestamp: new Date(),
      footer: {
        icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
        text: `Success | Kk Family!`,
      },
    },
  });
};
