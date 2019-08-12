const Discord = require('discord.js')
const client = new Discord.Client()

// readying the bot
client.on('ready', msg => {
  console.log("Connected as " + client.user.tag)
  client.user.setActivity("with the pet Chicken")
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
})

// splicing command and sending it to doCommand to be processed
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    doCommand(primaryCommand, receivedMessage, arguments)
}

client.login(process.env.BOT_TOKEN)