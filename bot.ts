
module.exports.Discord = require('discord.js')
module.exports.dbClient = require('pg')
const Discord = require('discord.js')
const client = new Discord.Client()
const dbClient = require('pg');
const commands = require('./commands/command.ts')
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
})

// splicing command and sending it to doCommand to be processed
function processCommand(receivedMessage) {
    checkUser(receivedMessage)
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    commands.doCommand(primaryCommand, receivedMessage, arguments)
}

// checks if users in database (TBD: add a cache to make it faster)
// Add function to increase exp every message (cooldown?)
function checkUser(receivedMessage) {
    var database = new dbClient.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
    database.connect();
    var text = 'INSERT INTO "Users" (id, name, level, experience, sins) VALUES ($1, $2, 1, 0, 0) ON CONFLICT DO NOTHING RETURNING *;'
    var values = [receivedMessage.author.id, receivedMessage.author.username]
    database.query(text, values, (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        database.end();
    });

    // code to fetch all rows in the user database
    // database.query('SELECT * FROM "Users";', (err, res) => {
    //     if (err) throw err;
    //     for (let row of res.rows) {
    //       console.log(JSON.stringify(row));
    //     }
    //     database.end();
    // });
}

client.login(process.env.BOT_TOKEN)