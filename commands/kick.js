exports.run = async (client, message, args) => {
  if (message.member.hasPermission("KICK_MEMBERS")) {
    const mention =
      (await message.mentions.members.first()) ||
      (await message.guild.members.cache.get(args[0]));
    if (mention) {
      if (message.member.roles.highest.position > mention.roles.highest.position) {
        if (mention.kickable) {
          if (message.guild.me.hasPermission("KICK_MEMBERS")) {
            if (mention.id != message.author.id) {
              if (args[1]) {
                mention.kick({ reason: `Kicked by ${message.author.tag} with reason: ${args.slice(1).join(" ")}` })
              } else {
                mention.kick({ reason: `Kicked by ${message.author.tag}, no reason given.` })
              }
              message.channel.send({
                embed: {
                  color: `GREEN`,
                  description: `Successfully kicked <@${mention.id}>!`,
                  author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                  }
                }
              })
            } else return message.channel.send({
              embed: {
                color: `RED`,
                description: `You cannot kick yourself!`,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            })
          } else return message.channel.send({
            embed: {
              color: `RED`,
              description: `I need the \`KICK_MEMBERS\` permission!`,
              author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
              }
            }
          })
        } else return message.channel.send({
          embed: {
            color: `RED`,
            description: `My role is not high enough to kick this person!`,
            author: {
              name: message.author.tag,
              icon_url: message.author.displayAvatarURL()
            }
          }
        })
      } else return message.channel.send({
        embed: {
          color: `RED`,
          description: `Your highest role is too low to kick this person!`,
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
          }
        }
      })
    } else {
      let findname = await message.guild.members.fetch({ query: args[0], limit: 1 });
      if (findname.first()) {
        let filter = (msg) => msg.author.id === message.author.id;
        const msg = await message.channel.send({
          embed: {
            color: `YELLOW`,
            description: `Do you want to kick <@${findname.first().id}> (${findname.first().user.tag})?`,
            author: {
              name: message.author.tag,
              icon_url: message.author.displayAvatarURL()
            },
            footer: {
              text: `Options: yes | no`
            }
          }
        });
        message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
          if (collected.size === 0) {
            message.channel.send({
              embed: {
                description: `You took to long.`,
                color: `RED`,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            });
          } else {
            let answer = collected.first().content.toLowerCase();
            if (answer === "yes") {
              if (message.member.roles.highest.position > findname.first().roles.highest.position) {
                if (findname.first().kickable) {
                  if (message.guild.me.hasPermission("KICK_MEMBERS")) {
                    if (findname.first().id != message.author.id) {
                      findname.first().kick(args.slice(1).join(" "))
                      message.channel.send({
                        embed: {
                          color: `GREEN`,
                          description: `Successfully kicked <@${findname.first().id}>!`,
                          author: {
                            name: message.author.tag,
                            icon_url: message.author.displayAvatarURL()
                          }
                        }
                      })
                    } else return message.channel.send({
                      embed: {
                        color: `RED`,
                        description: `You cannot kick yourself!`,
                        author: {
                          name: message.author.tag,
                          icon_url: message.author.displayAvatarURL()
                        }
                      }
                    })
                  } else return message.channel.send({
                    embed: {
                      color: `RED`,
                      description: `I need the \`KICK_MEMBERS\` permission!`,
                      author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL(),
                      }
                    }
                  })
                } else return message.channel.send({
                  embed: {
                    color: `RED`,
                    description: `My role is not high enough to kick this person!`,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }
                })
              } else return message.channel.send({
                embed: {
                  color: `RED`,
                  description: `Your highest role is too low to kick this person!`,
                  author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                  }
                }
              })
            } else if (answer === "no") {
              return message.channel.send({
                embed: {
                  description: `This has been cancelled.`,
                  color: `RANDOM`,
                  author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                  }
                }
              })
            } else return message.channel.send({
              embed: {
                description: `That is not a valid option!`,
                color: `YELLOW`,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            })
          }
        })
      } else return message.channel.send({
        embed: {
          description: `Please mention or say a user's name!`
        }
      })
    }
  } else return message.channel.send({
    embed: {
      description: "You need the `KICK_MEMBERS` permission to use this command.",
      color: `RED`,
      author: {
        name: message.author.tag,
        icon_url: message.author.displayAvatarURL()
      }
    }
  })
}
