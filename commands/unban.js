exports.run = async (client, message, args) => {

  const member = args[0];

  if (!member) {
    return message.channel.send(`Please enter a id!`)
  }

  try {
    message.guild.fetchBans().then(bans => {
      message.guild.members.unban(member)
    })
    await message.channel.send(`${member} has been unbanned!`)
    await message.channel.send({
      embed: {
        color: `GREEN`,
        description: `${member} has been unbanned!`
      }
    })
  } catch (e) {
    return message.channel.send(`An error occured: ` + err)
  }

}
