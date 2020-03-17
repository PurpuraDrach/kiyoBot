// do the command
const multiply = require('./multiply.ts')
const help = require('./help.ts')
const profile = require('./profile.ts')
const chicken = require('./chicken.ts')
const daily = require('./daily.ts')

module.exports.doCommand = function(primaryCommand, receivedMessage, inArguments){
    if (primaryCommand == "help") {
      help.helpCommand(inArguments, receivedMessage)
  } else if (primaryCommand == "multiply") {
      multiply.multiplyCommand(inArguments, receivedMessage)
  } else if (primaryCommand == "ping"){
      receivedMessage.channel.send("pong")
  } else if (primaryCommand == "profile"){
      profile.profileCommand(receivedMessage, inArguments)
  } else if (primaryCommand == "chicken"){
      chicken.chickenCommand(receivedMessage)
  } else if (primaryCommand == "daily"){
      daily.dailyCommand(receivedMessage)
  } else{
      receivedMessage.channel.send("I don't understand the command. Try `.help`")
  }
}
