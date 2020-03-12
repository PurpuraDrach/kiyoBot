
module.exports.Discord = require('discord.js')
module.exports.dbClient = require('pg')
const Discord = require('discord.js')
const client = new Discord.Client()
const dbClient = require('pg');
const commands = require('./commands/command.ts')
const levelUp = require('./utils/profileLevel.ts')
require("dotenv").config()


// readying the bot
client.on('ready', msg => {
  console.log("Connected as " + client.user.tag)
  client.user.setActivity("Space bot o w o")
})

// recieveing messages
client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) { 
        return
    }
    //bot commands process messages starting with prefix '.'
    if (receivedMessage.content.startsWith(".")) {
        processCommand(receivedMessage)
    }
    // updates exp 
    // levelUp.updateExp(receivedMessage, "10")
})

// splicing command and sending it to doCommand to be processed
function processCommand(receivedMessage) {
    levelUp.checkUser(receivedMessage)
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading prefix (assuming the prefix is one character)
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the prefix is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    commands.doCommand(primaryCommand, receivedMessage, arguments)
}

client.login(process.env.BOT_TOKEN)