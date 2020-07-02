const botDataM = require('../bot.ts')
require("dotenv").config()

// change the console logs to DMs? for the ease of monitoring the admin commands of course 

module.exports.fetchProfiles = function() {
  var database = new botDataM.dbClient.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  database.connect();

  var text = 'SELECT * FROM "Users";'

  database.query(text, [], (err, res) => {
      if (err) {
          console.log(err)
      }
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      database.end();
  });
}

module.exports.deleteProfile = function(userID) {
  var database = new botDataM.dbClient.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  database.connect();

  var text = 'DELETE from "Users" u WHERE u.id = $1;'
  var values = [userID]

  database.query(text, values, (err, res) => {
      if (err) {
          console.log(err)
      } else {
        console.log("User "+userID+" has been deleted from profile")
      }
      database.end();
  });
}


// for once only queries
module.exports.addColumn = function() {
  var database = new botDataM.dbClient.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  database.connect();

  var text = 'ALTER TABLE "Users" ADD DailyAvailable BOOLEAN;'

  database.query(text, [], (err, res) => {
      if (err) {
          console.log(err)
      } else {
        console.log("Added new Column.")
      }
      database.end();
  });
}

// resets all dailys back to true
module.exports.setDaily = function(receivedMessage) {
  var database = new botDataM.dbClient.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  database.connect();

  var text = 'UPDATE "Users" SET DailyAvailable = TRUE'

  database.query(text, [], (err, res) => {
      if (err) {
          console.log(err)
      }
      else {
        console.log("Reset Dailys")
        receivedMessage.channel.send("All Dailys Reset")
      }
      database.end();
  });
}