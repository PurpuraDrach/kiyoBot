
// requires permission to delete texts, else it will repeat without deleting the texts
// maybe have a setting to set if she can delete texts

module.exports.echoCommand = function(inArguments: string[], receivedMessage: any) {
  if (inArguments.length == 0) {
      receivedMessage.channel.send("There is nothing to echo.")
  } else {
      // reconstruct message
      var reconMessage = ""
      for (var i = 0; i<inArguments.length; i++) {
        reconMessage += (inArguments[i] + " ")
      }

      receivedMessage.delete()
        .catch(console.error)
      receivedMessage.channel.send(reconMessage)
  }
}

