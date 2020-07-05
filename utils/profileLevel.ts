const botDataL = require('../bot')
require("dotenv").config()

//increaseExp Function (cooldown 2 minutes?)
// idea - record last time of increased exp, then whenever this function is called, check if enough time has 
//        past to increase exp. If so, increase exp and update time (TBD)
// new idea - find a different method to increase exp besides talking 
module.exports.updateExp = function(receivedMessage: any, expIncrease: string) {
  var database = new botDataL.dbClient.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  database.connect();

  var text = 'UPDATE "Users" SET experience = experience + $2 WHERE id = $1;'
  var values = [receivedMessage.author.id, expIncrease]

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