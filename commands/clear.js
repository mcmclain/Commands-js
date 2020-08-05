exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(
      `You do not have correct permissions to do this action, ${message.author.tag}`
    );
  if (!args[0]) {
    return message.channel.send(`Please enter a amount 1 to 100`)
  }

  let deleteAmount;

  if (parseInt(args[0]) > 100) {
    deleteAmount = 100;
  } else {
    deleteAmount = parseInt(args[0]);
  }

  await message.channel.bulkDelete(deleteAmount, true);

  await message.channel.send({
    embed: {
      color: `GREEN`,
      description: `Successfully deleted ${deleteAmount} messages!`
    }
  })
}
