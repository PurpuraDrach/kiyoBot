// do the command
const multiply = require('./multiply.ts')
const help = require('./help.ts')

module.exports.doCommand = function(primaryCommand, receivedMessage, arguments){
    if (primaryCommand == "help") {
      help.helpCommand(arguments, receivedMessage)
  } else if (primaryCommand == "multiply") {
      multiply.multiplyCommand(arguments, receivedMessage)
  } else if (primaryCommand == "ping"){
      receivedMessage.channel.send("pong")
  } else{
      receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
  }
}
