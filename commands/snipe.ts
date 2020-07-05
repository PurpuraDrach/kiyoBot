var Main = require("../bot")
const snipeImages = [
  'https://i.imgur.com/f856FLU.gif',
  'https://i.imgur.com/UcINxLl.gif',
  'https://i.imgur.com/Ntv70kB.gif',
  'https://i.imgur.com/zD384AN.gif'
]

// snipe someone or Kiyo snipes you

module.exports.snipeCommand = function(receivedMessage: any, inArguments: string[]) {
  const snipeEmbed = new Main.Discord.MessageEmbed();
  snipeEmbed.setImage(snipeImages[Math.floor(Math.random() + snipeImages.length)])
  snipeEmbed.setFooter("I'll be here watching you, Anchin.", 'https://i.imgur.com/L2AX0X4.jpg')
  snipeEmbed.setImage(snipeImages[Math.floor(Math.random() * snipeImages.length)])

  var authorID = receivedMessage.author.id
  var targetID = ''

  // check if target exists
  if (inArguments.length > 0) {
    // extract ping
    if (inArguments[0].length == 22 && inArguments[0].slice(0,3) == '<@!' && Number(inArguments[0].slice(3,21))) {
      targetID = inArguments[0].slice(3,21)
    }
  }

  if (targetID == '') {
    snipeEmbed.setDescription("<@"+ authorID +'> scored was headshot by Kiyohime. "Anchin, are you cheating on me?"')
  } else {  
    snipeEmbed.setDescription("<@"+ authorID +"> scored a headshot on <@"+targetID+">")
  }

  receivedMessage.channel.send(snipeEmbed);
}

