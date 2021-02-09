//Repl it not die function
const keepAlive = require("./server.js");
keepAlive();

const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
const figlet = require("figlet");
require("dotenv").config();
const fs = require("fs");
const db = require("quick.db");

let commandlist = [];

fs.readdir("./commands/", async (err, files) => {
  if (err) {
    return console.log(
      chalk.red(
        "An error occured when checking the commands folder for commands to load: " +
          err
      )
    );
  }
  files.forEach(async (file) => {
    if (!file.endsWith(".js")) return;
    let commandFile = require(`./commands/${file}`);
    commandlist.push({
      file: commandFile,
      name: file.split(".")[0],
    });
  });
});

client.on("ready", async () => {
  console.log(
    chalk.yellow(figlet.textSync("BETA BOT", { horizontalLayout: "full" }))
  );
  console.log(
    chalk.red(
      `Bot started!\n---\n` +
        `+ Users: ${client.users.cache.size}\n` +
        `+ Channels: ${client.channels.cache.size}`
    )
  );
  let botstatus = fs.readFileSync("./bot-status.json");
  botstatus = JSON.parse(botstatus);
  if (botstatus.activity == "false") return;
  if (botstatus.activitytype == "STREAMING") {
    client.user.setActivity(botstatus.activitytext, {
      type: botstatus.activitytype,
      url: botstatus.activityurl,
    });
  } else {
    client.user.setActivity(botstatus.activitytext, {
      type: botstatus.activitytype,
    });
  }
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.prefix)) return;
  const args = message.content.slice(process.env.prefix.length).split(" ");
  const commandName = args[0].toLowerCase();
  args.shift();
  const command = commandlist.findIndex((cmd) => cmd.name === commandName);
  if (command == -1) return;
  commandlist[command].file.run(client, message, args);
});

client.login(process.env.token);
