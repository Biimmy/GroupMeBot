const math = require('mathjs');
const request = require('request');

const bot = require('./bot.js');

function gifSearch(message)
{
	var search = [];
	console.log(message);
	var terms = message.split(/[ ,]+/).filter(Boolean);
	terms.shift();
	
	if (terms.length == 0)
	{
		console.log('there is nothing here pls add input');
	}
	else
	{
		for (var i = 0; i < terms.length; i++)
		{
			console.log(terms[i]);
		}
	}
	gifPull(terms);
}

function gifPull(terms)
{
	var search = "";
	if (terms.length > 0)
	{
		for(var i = 0; i < terms.length; i++)
		{
			search += terms[i];
			if (i < terms.length - 1)
			{
				search += '+';
			}
		}
	}
	else
	{
		search = 'funny+cats'
	}
	request({
		url: 'http://api.giphy.com/v1/gifs/search?q='+ search +'&api_key=dc6zaTOxFJmzC',
		json: true
	}, (error, response, body) => {
		//console.log(body.data[0].images);
		console.log('response from giphy');
		gifParse(body.data);
	});
}

function gifParse(gifJSON)
{
	console.log('making array');
	var gifImages = [];
	console.log('made array');
	
	for (var i = 0; i < gifJSON.length; i++)
	{
		gifImages.push(gifJSON[i].images.fixed_height.url);
	}
	
	bot.randImg(gifImages);
	
}


exports.gifSearch = gifSearch;