exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_SERVER')) {
    return message.channel.send(`You are unable to use this command.`)
  }

  let user = message.mentions.users.first();
  if (!user) return message.channel.send(`Please mention a user!`);
  if (!args.slice(1).join(" "))
    return message.channel.send(`You did not specify a reason!`);

  user.send(`You have been warned at ${message.guild.name}! Reason: ${args.slice(1).join(" ")}`).catch(() => message.channel.send("That user could not be DMed!")).then(() => message.channel.send(`${user.tag} has been warned! Reason: ${args.slice(1).join(" ")}`));
}
