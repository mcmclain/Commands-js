const chalk = require('chalk');
const inquirer = require('inquirer');
const figlet = require('figlet');
const fs = require('fs');

var configFile = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var initq = [
    {
        name: 'usage',
        type: 'list',
        message: 'What are you using this tool to do?',
        choices: ['Setup Modbot', 'Update the token']
    }
]
var updateq = [
    {
        name: 'token',
        type: 'input',
        message: 'Whats the discord bot token?',
        validate: function(value){
            if(value.length){
                return true;
            } else {
                return 'This field is required.';
            }
        }
    }
]
var setupq = [
    {
        name: 'token',
        type: 'input',
        message: 'Whats the discord bot token?',
        validate: function(value){
            if(value.length){
                return true;
            } else {
                return 'This field is required.';
            }
        }
    },
    {
        name: 'prefix',
        type: 'input',
        message: 'What do you want the Discord bot prefix to be?',
        validate: function(value){
            if(value.length){
                return true;
            } else {
                return 'This field is required.';
            }
        }
    },
    {
        name: 'activity',
        type: 'input',
        message: 'Do you want the bot to have a status? (true for yes and false for no)',
    },
    {
        name: 'type',
        type: 'input',
        message: 'What type of activity? (Options: WATCHING, PLAYING, LISTENING and STREAMING)'
    },
    {
        name: 'text',
        type: 'input',
        message: 'What do you want the status text to be?'
    },
    {
        name: 'url',
        type: 'input',
        message: 'What do you want the status url to be?',
    }
]

inquirer.prompt(initq).then(answers => {
    if(answers.usage === 'Setup Modbot'){
        inquirer.prompt(setupq).then(answers => {
            configFile.token = answers.token;
            configFile.prefix = answers.prefix;
            configFile.activity = answers.activity;
            configFile.type = answers.type;
            configFile.text = answers.text;
            configFile.url = answers.url;
            fs.writeFile('./config.json', JSON.stringify(configFile), (err) => {
                if (err) console.log(err);
            });
            console.log(chalk.green('Modbot is now configured!'));
        });
    } else {
        inquirer.prompt(updateq).then(answers => {
            configFile.token = answers.token;
            fs.writeFile('./config.json', JSON.stringify(configFile), (err) => {
                if (err) console.log(err);
            });
            console.log(chalk.green('Your qbot configuration has been successfully updated.'));
        });
    }
});