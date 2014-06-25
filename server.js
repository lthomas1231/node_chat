var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var client = require('mongodb').MongoClient;
var app = express();
var port = 3700;
var crypto = require('crypto');

 
app.set('views', __dirname + '/tpl');
app.engine('html', require('ejs').renderFile);
app.set('view engine', "ejs");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(cookieParser());

app.post("/user", function(req, res) {
	var token = newToken();
	res.cookie('cookieName', token);

	client.connect("mongodb://localhost:27017/test", function(err, db) {
		db.createCollection("user", function(err, users) {
    		users.insert({ "username": req.body.name, token: token }, function(err) {

    		});
		});
	});

	res.render("chat.html");
});

app.get("/", function(req,res) {
	res.render("index.html");
});

app.get("/chat", function(req, res){
	console.log(req.cookies);
    res.render("chat.html");
});

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
	socket.emit('message', {message: 'Lacy\'s Amazing Chat'});
	socket.on('send', function (data) {
		io.sockets.emit('message', data);
	});
});

//TODO figure out how to make this function wait for token to be populated
var newToken = function() {
	var token;
	crypto.randomBytes(48, function(ex, buf) {
		console.log(ex, buf, buf.toString('hex'));
		token = buf.toString('hex');
	});

	return token;
};

console.log("Listening on port " + port);