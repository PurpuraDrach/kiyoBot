// daily command
var Main = require("../bot.ts")
require("dotenv").config()

module.exports.dailyCommand = function(receivedMessage) {

  // add a true/false value for this that resets every day at 12 am melbourne time hehh

  var searchID = receivedMessage.author.id
  // database connection
  var database = new Main.dbClient.Client ({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  database.connect();

  // var databasePool = new Main.dbClient.Pool ({
  //   connectionString: process.env.DATABASE_URL
  // })

  // fetching if daily is available
  var queryText = 'SELECT DailyAvailable FROM "Users" WHERE id = $1;'
  var updateQuery = 'UPDATE "Users" SET sins = sins + 500 WHERE id = $1;'
  const values = [searchID]

  // this section is async, maybe use a promise instead of timeout
  database.query(queryText, values, (err, res) => {
    if (err) {
      console.log(err)
      receivedMessage.channel.send("There was an error in collecting dailys, please ask master Khuro for help.")
    } else {
        if (JSON.stringify(res.rows[0].dailyavailable) == "true") {
          // insert second query to increase by 500, this is async
          database.query(updateQuery, values, (err2, res2) => {
            if (err2) {
              console.log(err2)
            } else {
              receivedMessage.channel.send("you have collected 500 daily sins")
            }
          })
        } else {
          receivedMessage.channel.send("You have already recieved your dailys today.")
        }
    }
    console.log("here")
    // need timeout, else database function is killed before the second query is executed
    setTimeout(function(){database.end()}, 2000)
  })
}