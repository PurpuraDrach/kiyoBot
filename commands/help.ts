//todo improve the help command 

module.exports.helpCommand = function(arguments, receivedMessage) {
  if (arguments.length > 0) {
      receivedMessage.channel.send("It looks like you might need help with " + arguments)
  } else {
      receivedMessage.channel.send("I'm not sure what you need help with. Try `.help [topic]`")
  }
}

