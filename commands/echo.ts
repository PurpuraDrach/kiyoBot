
// requires permission to delete texts, else it will repeat without deleting the texts
// maybe have a setting to set if she can delete texts

module.exports.echoCommand = function(arguments, receivedMessage) {
  if (arguments.length == 0) {
      receivedMessage.channel.send("There is nothing to echo.")
  } else {
      // reconstruct message
      var reconMessage = ""
      for (var i = 0; i<arguments.length; i++) {
        reconMessage += (arguments[i] + " ")
      }

      receivedMessage.delete()
        .catch(console.error)
      receivedMessage.channel.send(reconMessage)
  }
}

