//Begin server config
var mongoose = require('mongoose');
var express = require('express');
var User = require('./resources/model/user');
var Message = require('./resources/model/message');

//Conecta ao local que o Mongo está disponibilizado 
mongoose.connect('mongodb://localhost:27017/webChat');

//Express config
var app = express();
app.set('port', process.env.PORT || 8080);
app.set('ip', process.env.IP || "127.0.0.1");

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/resources'));
app.use(express.static(__dirname + '/node_modules/socket.io/lib'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var server = require('http').createServer(app);

server.listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('ip') + ':' + app.get('port'));
});
//End server config

var io = require('socket.io').listen(server);
var numUsers = 0;

io.on('connection', function(socket) {
	var addedUser = false;
        
	//quando o client envia uma 'new message' esse listener executa
	socket.on('new message', function(msg){
		var message = new Message({
		   content: msg,
		   authorUser: socket.username,
		   onlineUsers: ["test1", "test2"]
		});
		message.save(function(err) {
		  if (err) throw err;
		  console.log('Message saved!');
		});

		socket.broadcast.emit('new message', {
			username : socket.username,
			message : msg
		});
	});

	socket.on('add user', function(username) {
		if(addedUser) return;
		//registrando nome do usuario
                ++numUsers;
		addedUser = true;
		socket.username = username;
		socket.emit('login', {
			numUsers: numUsers
		});

		socket.broadcast.emit('user joined', {
			username : socket.username,
			numUsers : numUsers
		});
	});

	//quando client emite 'typing', isso é compartilhado com os outros
	socket.on('typing', function() {
		socket.broadcast.emit('typing', {
			username : socket.username
		});
	});

	//quando client emite 'stop typing' isso é compartilhado
	socket.on('stop typing', function() {
		socket.broadcast.emit('stop typing', {
			username : socket.username
		});
	});

	//quando user disconecta...
	socket.on('disconnect', function() {
		if(addedUser) {
			--numUsers;

			//avisa a todos que o client saiu
			socket.broadcast.emit('user left', {
				username : socket.username,
				numUsers : numUsers
			});
		}
	});
});