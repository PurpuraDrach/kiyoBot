// do the command
const multiply = require('./multiply.ts')
const help = require('./help.ts')
const profile = require('./profile.ts')
const chicken = require('./chicken.ts')
const snipe = require('./snipe.ts')
const daily = require('./daily.ts')
const echo = require('./echo.ts')

const databaseManagement = require('../utils/databaseManagement.ts')

module.exports.doCommand = function(primaryCommand, receivedMessage, inArguments){
    if (primaryCommand == "help") {
      help.helpCommand(inArguments, receivedMessage)
  } else if (primaryCommand == "multiply") {
      multiply.multiplyCommand(inArguments, receivedMessage)
  } else if (primaryCommand == "ping"){
      receivedMessage.channel.send("pong")
  } else if (primaryCommand == "echo"){
      echo.echoCommand(inArguments, receivedMessage)
  } else if (primaryCommand == "profile"){
      profile.profileCommand(receivedMessage, inArguments)
  } else if (primaryCommand == "chicken"){
      chicken.chickenCommand(receivedMessage)
  } else if (primaryCommand == "snipe"){
      snipe.snipeCommand(receivedMessage, inArguments)
  } else if (primaryCommand == "daily"){
      daily.dailyCommand(receivedMessage)
  } else {
      receivedMessage.channel.send("I don't understand the command. Try `.help`")
  }
}

module.exports.doAdminCommand = function(primaryCommand, receivedMessage, inArguments) {
    if (primaryCommand == "fetch") {
      databaseManagement.fetchProfiles()
  } else if (primaryCommand == "delete"){
      databaseManagement.deleteProfile(inArguments[0])
  } else if (primaryCommand == "addColumn"){
      databaseManagement.addColumn()
  } else if (primaryCommand == "resetDaily"){
    databaseManagement.setDaily(receivedMessage)
  } else {
      receivedMessage.channel.send("Invalid Command.")
  }
}