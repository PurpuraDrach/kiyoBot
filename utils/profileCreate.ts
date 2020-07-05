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

  var text = 'INSERT INTO "Users" (id, name, level, experience, quartz) VALUES ($1, $2, 1, 0, 0) ON CONFLICT DO NOTHING RETURNING *;'
  var values = [receivedMessage.author.id, receivedMessage.author.username]

  database.query(text, values, (err: Error, res: any) => {
      if (err) {
          console.log(err)
          receivedMessage.channel.send("there has been an error, contact Master Khuro for help if thats the case")
      }
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      database.end();
  });
}