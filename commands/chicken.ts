var Main = require("../bot.ts")

module.exports.chickenCommand = function(receivedMessage) {
  const chickenEmbed = new Main.Discord.MessageEmbed();
  chickenEmbed.setImage("https://i.imgur.com/YJ278ld.jpg")
  chickenEmbed.setTitle("Chicken tastes delicious")
  receivedMessage.channel.send(chickenEmbed);
}

