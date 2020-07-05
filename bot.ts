
module.exports.Discord = require('discord.js')
module.exports.dbClient = require('pg')
const Discord = require('discord.js')
const client = new Discord.Client()
const dbClient = require('pg');
const commands = require('./commands/command')
const levelUp = require('./utils/profileLevel')
require("dotenv").config()

// TODO: add some darn lore for the fun of it
// TODO: List of stuff to add into global variables: bot prefix, bot admin user IDs  

// readying the bot
client.on('ready', () => {
  console.log("Connected as " + client.user.tag)
  client.user.setActivity("Resuming the Stalking Trio's Activities")
//   client.user.setAvatar("https://i.imgur.com/L2AX0X4.jpg")
//   client.user.setUsername("Kiyo")
})

// recieveing messages
client.on('message', (receivedMessage: any) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) { 
        return
    }
    // Admin commands
    if (receivedMessage.content.startsWith("..") && receivedMessage.author.id == process.env.OWNER_ID) {
        let commandAdminResults = processCommand(receivedMessage, "admin")
        commands.doAdminCommand(commandAdminResults[0], receivedMessage, commandAdminResults[1])
    }
    //bot commands process messages starting with prefix '.'
    // TODO: make prefix a global variable? easy to change prefix if so 
    else if (receivedMessage.content.startsWith(".")) {
        let commandResults = processCommand(receivedMessage,  "normal")
        commands.doCommand(commandResults[0], receivedMessage, commandResults[1])
    }
})

// splicing command and sending it to doCommand to be processed
function processCommand(receivedMessage: any, commandType: string) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading prefix (assuming the prefix is one character)

    if (commandType == "admin") {
        fullCommand = receivedMessage.content.substr(2)
    }

    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the prefix is the command
    let commandArguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + commandArguments) // There may not be any arguments

    return [primaryCommand, commandArguments]

}

client.login(process.env.BOT_TOKEN)