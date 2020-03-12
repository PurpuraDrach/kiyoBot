const botData = require('../bot.ts')
require("dotenv").config()

// checks if users in database (TBD: add a cache to avoid having to access the database)
module.exports.checkUser = function(receivedMessage) {
  var database = new botData.dbClient.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  database.connect();

  // TBD add experience Timeout column to identify exp cooldown
  var text = 'INSERT INTO "Users" (id, name, level, experience, sins) VALUES ($1, $2, 1, 0, 0) ON CONFLICT DO NOTHING RETURNING *;'
  var values = [receivedMessage.author.id, receivedMessage.author.username]

  database.query(text, values, (err, res) => {
      if (err) {
          console.log(err)
          receivedMessage.channel.send("there has been an error, contact Master Khuro for help if thats the case <:SHWink:607346841964511264>")
      }
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      database.end();
  });
}

//increaseExp Function (cooldown 2 minutes?)
// idea - record last time of increased exp, then whenever this function is called, check if enough time has 
//        past to increase exp. If so, increase exp and update time (TBD)
module.exports.updateExp = function(receivedMessage, expIncrease) {
  var database = new botData.dbClient.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  database.connect();

  var text = 'UPDATE "Users" SET experience = experience + $2 WHERE id = $1;'
  var values = [receivedMessage.author.id, expIncrease]

  database.query(text, values, (err, res) => {
      if (err) {
          console.log(err)
          receivedMessage.channel.send("there has been an error, contact Master Khuro for help if thats the case <:SHWink:607346841964511264>")
      }
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      database.end();
  });
}