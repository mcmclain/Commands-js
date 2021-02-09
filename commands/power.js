const Discord = require("discord.js");
const client = new Discord.Client();
const roblox = require("noblox.js");
const chalk = require("chalk");
const figlet = require("figlet");
const db = require("quick.db");
const https = require("https");

require("dotenv").config();
const fs = require("fs");
const e = require("express");

exports.run = async (client, message, args) => {
  const load = await message.channel.send({
    embed: {
      color: 9240450,
      description: `Loading... Please Wait a Couple Seconds\n This may take upto 15 seconds, please be patient.,`,
      footer: {
        icon_url: `http://www.leadershipsaratoga.org/themes/leadership-saratoga-responsive/images/spinner.png`,
        text: `Loading | The Kk Family `,
      },
      timestamp: new Date(),
      author: {
        icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
        name: `power | The Kk Family`,
      },
    },
  });
  const amt = args[2];
  if (args[0] == null) {
    let author = message.author;
    let user = message.member;
    https
      .get(`https://Verify.eryn.io/api/user/${author.id}`, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          let rblxuser = JSON.parse(data).robloxUsername;
          let userid = JSON.parse(data).robloxId;

          let powermsg = async () => {
            let power = await db.fetch(`power_${rblxuser}`);
            let rankid = await roblox.getRankInGroup(
              process.env.groupId,
              userid
            );
            let rank = await roblox.getRankNameInGroup(
              process.env.groupId,
              userid
            );
            if (power == null) power = 0;
            if (rank == "Guest") rank = "Non-Military Personnel";
            await load.edit({
              embed: {
                color: 9240450,
                fields: [
                  {
                    inline: false,
                    name: "**USERNAME**",
                    value: `${rblxuser}`,
                  },
                  {
                    inline: true,
                    name: "**power**",
                    value: `${power}`,
                  },
                  {
                    inline: true,
                    name: "**Rank**",
                    value: `${rank} (${rankid})`,
                  },
                ],
                thumbnail: {
                  url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${rblxuser}`,
                },
                footer: {
                  icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
                  text: `Success | The Kk Faction`,
                },
                timestamp: new Date(),
                author: {
                  icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
                  name: `power | The Kk Family`,
                },
              },
            });
          };
          powermsg();
        });
      })
      .on("error", (err) => {
        console.log(err);
      });
  }
  if (args[0] && args[1] == null) {
    let userid = await roblox.getIdFromUsername(`${args[0]}`);
    let rblxuser = await roblox.getUsernameFromId(`${userid}`);

    let power = db.fetch(`power_${rblxuser}`);
    let rankid = await roblox.getRankInGroup(process.env.groupId, userid);
    let rank = await roblox.getRankNameInGroup(process.env.groupId, userid);
    if (power == null) power = 0;
    if (rank == "Guest") rank = "Non-Military Personnel";
    await load.edit({
      embed: {
        color: 9240450,
        fields: [
          {
            inline: false,
            name: "**USERNAME**",
            value: `${rblxuser}`,
          },
          {
            inline: true,
            name: "**power**",
            value: `${power}`,
          },
          {
            inline: true,
            name: "**Rank**",
            value: `${rank} (${rankid})`,
          },
        ],
        thumbnail: {
          url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${rblxuser}`,
        },
        footer: {
          icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
          text: `Success | The Kk Family`,
        },
        timestamp: new Date(),
        author: {
          icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
          name: `power | The Kk Family`,
        },
      },
    });
  }
  if (args[1] == `add` && amt) {
    if (
      !message.member.roles.cache.some((role) =>
        ["Faction Officer"].includes(role.name)
      )
    ) {
      return load.edit({
        embed: {
          //Not Finding User in Database
          color: 16733013,
          description: `You are not a Commissioned Officer.`,
          footer: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            text: `Error | The Kk Family`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            name: `Power | The Kk Family`,
          },
        },
      });
    } else {
      let userid = await roblox.getIdFromUsername(`${args[0]}`);
      let rblxuser = await roblox.getUsernameFromId(`${userid}`);
      let power = db.fetch(`power_${rblxuser}`);
      if (power == null) power = 0;
      db.set(`power_${rblxuser}`, Number(power) + Number(amt));

      return load.edit({
        embed: {
          color: 9240450,
          description: `Successfully added **${amt}** power to ${rblxuser}`,
          footer: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            text: `Success | The Kk Family`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            name: `power | The Kk Family`,
          },
        },
      });
    }
  }
  if (args[1] == `remove` && amt) {
    if (
      !message.member.roles.cache.some((role) =>
        ["Faction Officer"].includes(role.name)
      )
    ) {
      return load.edit({
        embed: {
          //Not Finding User in Database
          color: 16733013,
          description: `You are not a Commissioned Officer.`,
          footer: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            text: `Error | The Kk Family`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            name: `Power | The Kk Family`,
          },
        },
      });
    } else {
      let userid = await roblox.getIdFromUsername(`${args[0]}`);
      let rblxuser = await roblox.getUsernameFromId(`${userid}`);
      let power = db.fetch(`power_${rblxuser}`);
      if (power == null) power = 0;
      db.set(`power_${rblxuser}`, Number(power) - Number(amt));

      return load.edit({
        embed: {
          color: 9240450,
          description: `Successfully removed **${amt}** power from ${rblxuser}`,
          footer: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            text: `Success | The Kk Family`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            name: `power | The Kk Family`,
          },
        },
      });
    }
  }
  if (args[1] == `change` && amt) {
    if (
      !message.member.roles.cache.some((role) =>
        ["Faction Officer"].includes(role.name)
      )
    ) {
      return load.edit({
        embed: {
          //Not Finding User in Database
          color: 16733013,
          description: `You are not a Commissioned Officer.`,
          footer: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            text: `Error | The Kk Family`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            name: `Power | The Kk Family`,
          },
        },
      });
    } else {
      let userid = await roblox.getIdFromUsername(`${args[0]}`);
      let rblxuser = await roblox.getUsernameFromId(`${userid}`);
      let power = db.fetch(`power_${rblxuser}`);
      if (power == null) power = 0;
      db.set(`power_${rblxuser}`, Number(amt));

      return load.edit({
        embed: {
          color: 9240450,
          description: `Successfully changed ${rblxuser}'s power from ${power} to ${amt}`,
          footer: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            text: `Success | The Kk Family`,
          },
          timestamp: new Date(),
          author: {
            icon_url: `https://media.discordapp.net/attachments/771729564031254539/808497914430881802/image0.jpg`,
            name: `power | The Kk Family`,
          },
        },
      });
    }
  }
};
