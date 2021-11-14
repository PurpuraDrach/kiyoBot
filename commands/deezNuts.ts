var Main = require("../bot")
const nutImages = [
  'https://i.imgur.com/6WyjLil.jpg',
  'https://i.imgur.com/M7IPB1s.jpg',
  'https://i.imgur.com/crIGtD8.jpg'
]

// snipe someone or Kiyo snipes you

module.exports.deezNutsCommand = function(receivedMessage: any, inArguments: string[]) {
  const nutsEmbed = new Main.Discord.MessageEmbed();
  nutsEmbed.setImage(nutImages[Math.floor(Math.random() + nutImages.length)])
  nutsEmbed.setFooter("DEEZ NUTS", 'https://i.imgur.com/sl4ed8w.png')
  nutsEmbed.setImage(nutImages[Math.floor(Math.random() * nutImages.length)])

  var authorID = receivedMessage.author.id
  var targetID = ''

  // check if target exists
  if (inArguments.length > 0) {
    // extract ping
    if ((inArguments[0].length == 22 && inArguments[0].slice(0,3) == '<@!' && Number(inArguments[0].slice(3,21))) || 
        (inArguments[0].length == 21 && inArguments[0].slice(0,2) == '<@' && Number(inArguments[0].slice(2,20)))) {
      targetID = inArguments[0].slice(2,20)
    }
  }

  if (targetID == '') {
    nutsEmbed.setDescription("DEEZ NUTS")
  } else {  
    nutsEmbed.setDescription("<@"+targetID+"> DEEZ NUTS")
  }

  receivedMessage.channel.send(nutsEmbed);
}
