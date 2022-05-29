const { Client, Collection } = require('discord.js');
const config = require('./config.json');
const client = new Client({ intents: 1539 });
const { MessageEmbed } = require('discord.js');
const Logger = require('./utils/Logger');

client.commands = new Collection();

['CommandUtil', 'EventUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

process.on('exit', code => { Logger.client(`le bot s'est arrété avec le code : ${code}!`) })
process.on('uncaughtException', (err, origin) => {
    Logger.error(`uncaughtException : ${err}!`);
    console.error(`Origine : ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => {
    Logger.warn(`unhandledRejection : ${reason}`);
    console.log(promise);
});

process.on('warning', (...args) => Logger.warn(...args));


client.login(config.token);