// do the command
const multiply = require('./multiply.ts')
const help = require('./help.ts')
const profile = require('./profile.ts');

module.exports.doCommand = function(primaryCommand, receivedMessage, arguments){
    if (primaryCommand == "help") {
      help.helpCommand(arguments, receivedMessage)
  } else if (primaryCommand == "multiply") {
      multiply.multiplyCommand(arguments, receivedMessage)
  } else if (primaryCommand == "ping"){
      receivedMessage.channel.send("pong")
  } else if (primaryCommand == "profile"){
      profile.profileCommand(receivedMessage)
  } else{
      receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
  }
}
