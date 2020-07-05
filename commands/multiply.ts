// multiply command

module.exports.multiplyCommand = function(inArguments: string[], receivedMessage: any) {
  if (inArguments.length < 2) {
      receivedMessage.channel.send("Not enough values to multiply. Try `.multiply 2 4 10` or `!multiply 5.2 7`")
      return
  }
  let product = 1 
  inArguments.forEach((value) => {
      product = product * parseFloat(value)
  })
  receivedMessage.channel.send("The product of " + inArguments + " multiplied together is: " + product.toString())
}