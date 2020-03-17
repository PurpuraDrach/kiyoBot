// profile command
var Main = require("../bot.ts")
const profCreate = require('../utils/profileCreate.ts')
require("dotenv").config()

module.exports.profileCommand = function(receivedMessage, arguments) {

  var searchID = receivedMessage.author.id
  if (arguments.length > 0) {
    
    // profile create command 
    if (arguments[0] == 'create') {
      profCreate.createuser(receivedMessage);
      receivedMessage.channel.send("Your profile has been created. You have been inducted.")
      return
    }
    // extracting ID from ping if present
    if (arguments[0].length == 22 && arguments[0].slice(0,3) == '<@!' && Number(arguments[0].slice(3,21))) {
      searchID = arguments[0].slice(3,21)
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
      receivedMessage.channel.send("there has been an error, contact Master Khuro for help if thats the case")
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
        receivedMessage.channel.send("Your profile doesnt exist yet. Use 'profile create' to create a profile.")
      }
    }
    database.end();
  });
}