var exec = require('child_process').execFile;

exec('NadekoBot.exe', function(err, data) {  
	console.log(err)
	console.log(data.toString());
});	