const botDataC = require('../bot')
require("dotenv").config()

// TODO: Auto-update profile function when username changes?
// maybe check when a command is used?
// send message if profile already exists?

// creates User 
module.exports.createUser = function(receivedMessage: any) {
  var database = new botDataC.dbClient.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  database.connect();

  var defaultSummary: string = "A Summary that you have not bothered to insert yet."
  var defaultTitle: string = "Some Title Here"
  var text = 'INSERT INTO "Users" (id, name, level, experience, quartz, summary, title) VALUES ($1, $2, 1, 0, 0, $3, $4) ON CONFLICT DO NOTHING RETURNING *;'
  var values = [receivedMessage.author.id, receivedMessage.author.username, defaultSummary, defaultTitle]

  database.query(text, values, (err: Error, res: any) => {
      if (err) {
          console.log(err)
          receivedMessage.channel.send("there has been an error, contact an Admin for help.")
      }
      for (let row of res.rows) {
        receivedMessage.channel.send("Your profile has been created. You have been inducted.")
        database.end();
        return
      }
      receivedMessage.channel.send("Your profile already exists.")
      database.end();
  });
}