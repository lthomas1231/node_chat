var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var client = require('mongodb').MongoClient;
var app = express();
var port = 3700;
var crypto = require('crypto');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/test';

// var findUser = function(req, res, next) {
// 	client.connect(mongoUri, function(err, db) {
// 		db.createCollection("user", function(err, users) {
//     		users.findOne({ token: req.cookies.loginToken }, function(err, user) {
//     			if (user) {
//     				req.currentUser = user;
//     			}
//     		});
// 		});
// 	});

// 	next();
// };
 
app.set('views', __dirname + '/tpl');
app.engine('html', require('ejs').renderFile);
app.set('view engine', "ejs");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(cookieParser());
// app.use(findUser);

// app.post("/user", function(req, res) {
// 	var token = newToken();
// 	res.cookie('loginToken', token);

// 	client.connect(mongoUri, function(err, db) {
// 		db.createCollection("user", function(err, users) {
//     		users.insert({ "username": req.body.name, token: token }, function(err) {

//     		});
// 		});
// 	});

// 	res.render("chat.html");
// });

app.get("/", function(req, res) {
	res.render("index.html");
});

app.get("/chat", function(req, res){
    res.render("chat.html");
});

// var io = require('socket.io').listen(app.listen(port));

// io.sockets.on('connection', function (socket) {
// 	socket.emit('message', {message: 'Lacy\'s Amazing Chat'});

// 	socket.on('send', function (data) {
// 		client.connect(mongoUri, function(err, db) {
// 			db.createCollection("user", function(err, users) {
// 	    		users.findOne({ token: data.token }, function(err, user) {
// 	    			io.sockets.emit('message', { message: data.message, username: user ? user.username : 'Anonymouse' });
// 	    		});
// 			});
// 		});
// 	});
// });

var newToken = function() {
	return crypto.randomBytes(48).toString('hex');
};

// console.log("Listening on port " + port);