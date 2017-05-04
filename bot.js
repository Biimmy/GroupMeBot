const math = require('mathjs');
const reddit = require('./reddit.js');
const gif = require('./gif.js');
const server = require ('./server.js');

function parseCmd(user, message)
{
    console.log(user);
    console.log(message);
    
    message = message.toLowerCase();
    

	if (user != 'bot' && message.charAt(0) == '!') 
	{
		if (message == '!meme')
		{
			console.log("!meme req");
			reddit.srPull('dankmemes');
		}
		
		else if (message.charAt(1) == 's' && message.charAt(2) == 'r')
		{
			console.log('sr command test');
			var subreddit = message.split(" ").pop();
			reddit.srPull(subreddit);
		}
		else if (message.charAt(1) == 'g' 
			&& message.charAt(2) == 'i' 
			&& message.charAt(3) == 'f')
		{
			console.log('gif command');
			gif.gifSearch(message);
		}
		else
		{
			console.log('invalid command please type !help for assistance');
		}
	}
}

function randImg(images)
{	
	if(images.length != 0)
	{
	var randI = math.randomInt(images.length);
	//post random image
	server.post(images[randI]);
	}
	else
	{
		server.post("no images detected.")
	}
}

exports.randImg = randImg
exports.parseCmd = parseCmd;