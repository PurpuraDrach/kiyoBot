//todo improve the help command 

module.exports.helpCommand = function(arguments, receivedMessage) {
  if (arguments.length > 0) {
      receivedMessage.channel.send("It looks like you might need help with " + arguments)
  } else {
      receivedMessage.channel.send("```help - this command \n\nmultiply - multiply 2 or more numbers together```")
  }
}

