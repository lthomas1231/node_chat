var express = require("express");
var bodyParser = require('body-parser');
var client = require('mongodb').MongoClient;
var app = express();
var port = 3700;
 
app.set('views', __dirname + '/tpl');
app.engine('html', require('ejs').renderFile);
app.set('view engine', "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.post("/user", function(req, res) {
	client.connect("mongodb://localhost:27017/test", function(err, db) {
		db.createCollection("user", function(err, users){
			//TODO save cookies, get fat/username.
    		users.insert({ "username": req.body.name, token: "lacy's cookie goes here." }, function(err) {
    		});
		});
	});

	res.render("chat.html");
});

app.get("/", function(req,res) {
	res.render("index.html");
});

app.get("/chat", function(req, res){
    res.render("chat.html");
});

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
	socket.emit('message', {message: 'Lacy\'s Amazing Chat'});
	socket.on('send', function (data) {
		io.sockets.emit('message', data);
	});
});

console.log("Listening on port " + port);