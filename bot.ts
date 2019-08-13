const Discord = require('discord.js')
const client = new Discord.Client()
const commands = require('./commands/command.ts')
require("dotenv").config()
const { Client } = require('pg');


//database connection
const database = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

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
})

// splicing command and sending it to doCommand to be processed
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    commands.doCommand(primaryCommand, receivedMessage, arguments)
    // checkUser(receivedMessage)
}

function checkUser(receivedMessage) {
    database.connect();
    database.query('SELECT * FROM "Users";', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        database.end();
      });
}

client.login(process.env.BOT_TOKEN)