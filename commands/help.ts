//todo improve the help command, add a text file to draw the help data from?
var Main = require("../bot")

module.exports.helpCommand = function(inArguments: string[], receivedMessage: any) {
  if (inArguments.length > 0) {
    //validate command for help
    var commandCheck: boolean = true;
    var commandIndex: number = 0;
      for (var i=0; i<helpJson.commands.length; i++) {
        if (inArguments[0] == helpJson.commands[i].command) {
          commandCheck = false
          commandIndex = i
        }
      }
      if (commandCheck){
        receivedMessage.channel.send("Invalid command, try checking .help to see a list of commands.")
        return
      }

      const helpEmbed = new Main.Discord.MessageEmbed()
      helpEmbed.setTitle(inArguments[0])
      helpEmbed.setColor('##FAB3FF')
      helpEmbed.setDescription(helpJson.commands[commandIndex].description)
      helpEmbed.addFields(
        { name: "Example", value: helpJson.commands[commandIndex].example},
        { name: "Syntax", value: helpJson.commands[commandIndex].syntax},
      )
      helpEmbed.setTimestamp()
      helpEmbed.setFooter("I'll be here watching you, Anchin.", 'https://i.imgur.com/L2AX0X4.jpg')

      receivedMessage.channel.send(helpEmbed)
  } else {
      var helpString: string = "```Commands \n\n";
      helpJson.commands.forEach((commandItem) => {
        helpString += commandItem.command + " - " + commandItem.description + "\n"
      })
      helpString += "\nUse the .help <command> for more details on the specific command."
      receivedMessage.channel.send(helpString + "```")
  }
}

var helpJson = {
  "commands": [{
      "command": "chicken",
      "description": "It gives chicken. What else is there to say?",
      "example": "Pretty self explanatory, I'm sure you don't need an example.",
      "syntax": ".chicken"
    },
    {
      "command": "daily",
      "description": "Use this command to get your daily freebies.",
      "example": "You can use .daily <ping> to steal other peoples dail- o wait sorry you can't you dirty little scumbag.",
      "syntax": ".daily"
    },
    {
      "command": "echo",
      "description": "Echo makes me say repeat what you say.",
      "example": "input: `.echo PPTenshi is my favourite tenshi` \noutput: `PPTenshi is my favourite tenshi`",
      "syntax": ".echo <sentance>"
    },
    {
      "command": "help",
      "description": "A command to get help on how to use this bot.",
      "example": ".help multiply",
      "syntax": "`.help` to recieve general description of the bots functions or\n`.help <command>` to recieve information on a certain command"
    },
    {
      "command": "multiply",
      "description": "A command to multiply 2 or more numbers together. Kiyo isn't a calculator you know.",
      "example": "input: `.multiply 1 2 3 4 5` \noutput: `120`",
      "syntax": ".multiply <numbers>"
    },
    {
      "command": "profile",
      "description": "Use this command to show your profile. Kiyo will take gooooood care of it.",
      "example": "you really need an example for this?",
      "syntax": ".profile <ping>"
    },
    {
      "command": "snipe",
      "description": "Use this command to snipe others...or yourself, either ways kiyo is happy to oblige.",
      "example": ".snipe @Bakarina",
      "syntax": "`.snipe <pings>"
  }]
}