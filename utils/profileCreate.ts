const botDataC = require('../bot.ts')
require("dotenv").config()

// TODO: Auto-update profile function when username changes?
// maybe check when a command is used?

// creates User 
module.exports.createUser = function(receivedMessage) {
  var database = new botDataC.dbClient.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  database.connect();

  var text = 'INSERT INTO "Users" (id, name, level, experience, sins) VALUES ($1, $2, 1, 0, 0) ON CONFLICT DO NOTHING RETURNING *;'
  var values = [receivedMessage.author.id, receivedMessage.author.username]

  database.query(text, values, (err, res) => {
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