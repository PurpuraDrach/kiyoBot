// do the command
const multiply = require('./multiply')
const help = require('./help')
const profile = require('./profile')
const chicken = require('./chicken')
const snipe = require('./snipe')
const daily = require('./daily')
const echo = require('./echo')

const databaseManagement = require('../utils/databaseManagement')

module.exports.doCommand = function(primaryCommand: string, receivedMessage: any, inArguments: string[]){
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

module.exports.doAdminCommand = function(primaryCommand: string, receivedMessage: any, inArguments: string[]) {
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