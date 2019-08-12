// multiply command

module.exports.multiplyCommand = function(arguments, receivedMessage) {
  if (arguments.length < 2) {
      receivedMessage.channel.send("Not enough values to multiply. Try `.multiply 2 4 10` or `!multiply 5.2 7`")
      return
  }
  let product = 1 
  arguments.forEach((value) => {
      product = product * parseFloat(value)
  })
  receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}