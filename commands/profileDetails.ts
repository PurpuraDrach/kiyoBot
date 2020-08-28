var Main = require("../bot")
require("dotenv").config()


module.exports.profDetailsCommand = function(receivedMessage: any, detailType: string, inArguments: string[]) {
  var searchID = receivedMessage.author.id
  var queryText: string = ""
  var reconMessage: string = ""

  if (inArguments.length <= 0) {
    receivedMessage.channel.send("Ummm, you need to write something to set it too anchin.")
    return
  }

  // setting the query
  if (detailType == "title") {
    queryText = 'UPDATE "Users" SET title = $2 WHERE id = $1;'
  } else if (detailType == "summary") {
    queryText = 'UPDATE "Users" SET summary = $2 WHERE id = $1;'
  } else {
    receivedMessage.channel.send("There's been an error, please contact the admin.")
  }
  // reconstructing message
  for (var i = 0; i<inArguments.length; i++) {
    reconMessage += (inArguments[i] + " ")
  }

  // database connection
  var database = new Main.dbClient.Client ({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  })
  database.connect()

  // new title/summary SET
  database.query(queryText, [searchID, reconMessage], (err: Error, res: any) => {
    if (err) {
      console.log(err)
      receivedMessage.channel.send("there has been an error, contact an Admin for help.")
    } else {
      receivedMessage.channel.send("your "+ detailType +" has been successfully set.")
    }
    database.end()
  });
}
