// daily command
var Main = require("../bot.ts")
require("dotenv").config()

module.exports.dailyCommand = function(receivedMessage) {

  // add a time limit to this thing

  var searchID = receivedMessage.author.id
  // database connection
  var database = new Main.dbClient.Client ({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  database.connect();

  // query 
  var text = 'UPDATE "Users" SET sins = sins + 100 WHERE id = $1;' 
  var values = [searchID]
  database.query(text, values, (err, res) => {
    if (err) {
      console.log(err)
      receivedMessage.channel.send("there has been an error, contact Master Khuro for help if thats the case <:SHWink:607346841964511264>")
    } 
    
    else {
      receivedMessage.channel.send("```you have collected 100 daily sins```")
    }
    database.end();
  });
}