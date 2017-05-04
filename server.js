//NPM stuffs 
const request = require('request');
const director = require('director');
const http = require('http');

//JS FILES
const bot = require('./bot.js');
const reddit = require('./reddit.js');

const APIKEY = 'INSERT API KEY HERE';
const REPLYURL = 'https://api.groupme.com/v3/bots/post';
const port = PORT GOES HERE;

//Used for debugging
var pack = {};
pack.bot_id = APIKEY;
pack.text = 'Echo';

var router = new director.http.Router({
  '/' : {
    post: respond,
    get: ping
  }
});

var server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

server.listen(port);

function ping()
{
    this.res.writeHead(200);
    this.res.end("Echo!");
}

function respond()
{
    var data = JSON.parse(this.req.chunks[0]);    
    var user = data.sender_type;
    var message = data.text;
    console.log("request recieved");
    
    bot.parseCmd(user,message);
    
}

function post(message)
{
	var msg = {};
	msg.bot_id = APIKEY;
	msg.text = message;
	//send the image
	request({
		url: REPLYURL ,
	method: 'POST',
		body: JSON.stringify(msg)

	}, (error, response, body) => {
		console.log('image sent');
	});	
}

exports.post = post;