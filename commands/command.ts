// do the command

function doCommand(primaryCommand, receivedMessage, arguments) {
    if (primaryCommand == "help") {
      helpCommand(arguments, receivedMessage)
  } else if (primaryCommand == "multiply") {
      multiplyCommand(arguments, receivedMessage)
  } else if (primaryCommand == "ping"){
      receivedMessage.channel.send("pong")
  } else{
      receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
  }
}