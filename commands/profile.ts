// profile command
var Main = require("../bot.ts")
require("dotenv").config()

module.exports.profileCommand = function(receivedMessage, arguments) {

  // TODO add validation that 2nd argument is a ping
  var searchID = receivedMessage.author.id
  if (arguments.length > 0) {
    if (arguments[0].slice(2,3) == '!'){
      searchID = arguments[0].slice(3,21)
    } else {
      searchID = arguments[0].slice(2,20)
    }
  }

  // database connection
  var database = new Main.dbClient.Client ({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  database.connect();

  // query 
  var text = 'SELECT * from "Users" u WHERE u.id = $1;'
  var values = [searchID]
  database.query(text, values, (err, res) => {
    if (err) {
      console.log(err)
      receivedMessage.channel.send("there has been an error, contact Master Khuro for help if thats the case <:SHWink:607346841964511264>")
    } 
    
    else {
      if (res.rows[0]) {
        // create embed to display info
        const profileEmbed = new Main.Discord.RichEmbed();
        profileEmbed.setTitle(res.rows[0].name)
        profileEmbed.setThumbnail(receivedMessage.guild.members.get(searchID).user.avatarURL)
        profileEmbed.addField("Level",res.rows[0].level,true)
        const expBar = String(Number(res.rows[0].experience)%1000)
        profileEmbed.addField("Experience",expBar+"/1000",true)
        profileEmbed.addField("Sins",res.rows[0].sins,false)
        receivedMessage.channel.send(profileEmbed)
      } else {
        // profile not found
        receivedMessage.channel.send("Your profile doesnt exist yet.")
      }
    }
    database.end();
  });
}