//todo improve the help command, add a text file to draw the help data from?

module.exports.helpCommand = function(inArguments: string[], receivedMessage: any) {
  if (inArguments.length > 0) {
      receivedMessage.channel.send("It looks like you might need help with " + inArguments)
  } else {
      receivedMessage.channel.send("```help - this command \n\nmultiply - multiply 2 or more numbers together\n\nprofile - fetches profile from database```")
  }
}

