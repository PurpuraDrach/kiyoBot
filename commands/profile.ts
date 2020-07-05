// profile command
var Main = require("../bot")
const profCreate = require('../utils/profileCreate')
require("dotenv").config()

module.exports.profileCommand = function(receivedMessage: any, inArguments: string[]) {

  var searchID = receivedMessage.author.id
  if (inArguments.length > 0) {
    
    // profile create command 
    if (inArguments[0] == 'create') {
      profCreate.createuser(receivedMessage)
      receivedMessage.channel.send("Your profile has been created. You have been inducted.")
      return
    }
    // extracting ID from ping if present
    if (inArguments[0].length == 22 && inArguments[0].slice(0,3) == '<@!' && Number(inArguments[0].slice(3,21))) {
      searchID = inArguments[0].slice(3,21)
    }
  }

  // database connection
  var database = new Main.dbClient.Client ({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    })
  database.connect()

  // query 
  var text = 'SELECT * from "Users" u WHERE u.id = $1;'
  var values = [searchID]
  database.query(text, values, (err: Error, res: any) => {
    if (err) {
      console.log(err)
      receivedMessage.channel.send("there has been an error, contact Master Khuro for help if thats the case")
    } 
    
    else {
      if (res.rows[0]) {
        createProfileEmbed(receivedMessage, searchID, res)
      } else {
        // profile not found
        receivedMessage.channel.send("Your profile doesnt exist yet. Use 'profile create' to create a profile.")
      }
    }
    database.end()
  });
}




async function createProfileEmbed(receivedMessage: any, searchID: string, res: any) {
  const profileEmbed = new Main.Discord.MessageEmbed()
  const expBar = String(Number(res.rows[0].experience)%1000) + "/1000"

  profileEmbed.setTitle(res.rows[0].name)
  profileEmbed.setColor('#0099ff')
  profileEmbed.setDescription("One day you shall be able to set a title here. Just not today.")
  profileEmbed.addFields(
    { name: "Level", value: res.rows[0].level + "  (" + expBar + ")"},
    { name: "Quartz", value: res.rows[0].quartz},
    { name: "\u200B", value: "One day you can describe yourself here. Unfortunately not this time around, blame your E rank Luck"},
  )
  profileEmbed.setTimestamp()
  profileEmbed.setFooter("I'll be here watching you, Anchin.", 'https://i.imgur.com/L2AX0X4.jpg')
  profileEmbed.setImage('https://i.imgur.com/uUnVWDt.jpg') // image not showing, is this a problem with discord itself?

  await receivedMessage.guild.members.fetch(searchID)
    .then((value: any) => {profileEmbed.setThumbnail(value.user.avatarURL())})
    .catch(console.error)
    //.then(function() {receivedMessage.channel.send(profileEmbed)})
  receivedMessage.channel.send(profileEmbed)
}