const math = require('mathjs');
const request = require('request');

const server = require('./server.js');

function srPull (subreddit)
{
	subreddit = subreddit.replace(/\s/g,'');
	console.log('making sr request to ' + subreddit);
	request({
		url: 'https://www.reddit.com/r/' + subreddit + '/hot.json' ,
		json: true
	}, (error, response, body) => {
		console.log('response from ' + subreddit);
		srParse(body.data.children);
	});
}

function srParse(srJSON)
{
	console.log('making array');
	var srImages = [];
	console.log('made array');
	
	for (var i = 0; i < srJSON.length; i++)
	{
		//console.log(srJSON[i].data["preview"]);
		
	    if(srJSON[i].data.hasOwnProperty('preview') 
	    		&& srJSON[i].data.stickied == false)
		{
	    	if(srJSON[i].data.preview.images[0].hasOwnProperty('variants') 
	    			&& srJSON[i].data.preview.images[0].variants.hasOwnProperty('gif'))
	    	{
	    		//if(srJSON[i].data.preview.images[0].variants.hasOwnProperty('gif'))
	    		//{
	    			srImages.push(srJSON[i].data.preview.images[0].variants.gif.source.url);
	    		//}
	    	}
	    	else
	    	{
	    		srImages.push(srJSON[i].data.preview.images[0].source.url);
	    	}
			
		}
	}
	
	srRandImg(srImages);
	
}

function srRandImg(srImages)
{	
	if(srImages.length != 0)
	{
	var randI = math.randomInt(srImages.length);
	//post random image
	server.post(srImages[randI]);
	}
	else
	{
		server.post("no images detected on page.")
	}
}

exports.srPull = srPull;
exports.srParse = srParse;
exports.srRandImg = srRandImg;