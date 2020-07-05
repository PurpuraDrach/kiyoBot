// daily command
var Main = require("../bot")
require("dotenv").config()

module.exports.dailyCommand = function(receivedMessage: any) {

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
  const queryText = 'SELECT DailyAvailable FROM "Users" WHERE id = $1;'
  const updateQuery = 'UPDATE "Users" SET quartz = quartz + 500 WHERE id = $1;'
  const udpateFalse = 'UPDATE "Users" SET dailyavailable = FALSE WHERE id = $1;'
  const values = [searchID]

  // this section is async, maybe use a promise instead of timeout
  database.query(queryText, values, (err: Error, res: any) => {
    if (err) {
      console.log(err)
      receivedMessage.channel.send("There was an error in collecting dailys, please ask master Khuro for help.")
      database.end()
    } else {
        if (JSON.stringify(res.rows[0].dailyavailable) == "true") {
          // insert second query to increase by 500, this is async outside the braces
          database.query(updateQuery, values, (err2: Error, res2: any) => {
            if (err2) {
              console.log(err2)
              receivedMessage.channel.send("There was an error in collecting quartz, please ask master Khuro for help.")
              database.end()
            } else {
              receivedMessage.channel.send("you have collected 500 daily quartz anchin.")
              // insert third nested query to change daily available to false
              database.query(udpateFalse, values, (err3: Error, res3: any) => {
                if (err3) {
                  console.log(err3)
                  receivedMessage.channel.send("There was an error in collecting quartz, please ask master Khuro for help.")
                } else {
                  console.log("Daily status updated")
                }
                database.end()
              })
            }
            console.log("END")
          })
        } else {
          receivedMessage.channel.send("You have already recieved your dailys today.")
          database.end()
        }
    }
    // need timeout, else database function is killed before the second query is executed
  })
}