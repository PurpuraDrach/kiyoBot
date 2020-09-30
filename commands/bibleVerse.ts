
var Main = require("../bot")
import { BibleGatewayAPI } from "bible-gateway-api";

module.exports.bibleVerseCommand = function(receivedMessage: any) {

  const bgw = new BibleGatewayAPI();
  bgw.search("John 3.16")
    .then((response: any) =>  {
      console.log(response)
      const verseEmbed = new Main.Discord.MessageEmbed();
      verseEmbed.setTitle(response.verse)
      verseEmbed.setDescription(response.content[response.content.length - 1])
      
      receivedMessage.channel.send(verseEmbed);
    })
    .catch((err: any) => {
      console.log(err)
    })
}
