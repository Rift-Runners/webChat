//Variáveis da aplicação
var mongoose = require('mongoose');
var express = require('express');
var models = require('./public/resources/model/db');
var messageController = require('./public/resources/controller/messages');

//region Server-config
//Conecta no DataService MongoLab em que o MongoDb está hospedado
MONGOLAB_URI = 'mongodb://kleber:bambam@ds049446.mlab.com:49446/webchat';
mongoose.connect(MONGOLAB_URI);

//Configuração do app para o servidor Heroku
var app = express();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

app.set('port', process.env.PORT || 8080);

//Importação do diretório de arquivos estáticos
app.use(express.static(__dirname + '/public/'));

//Request e response do caminho da página principal
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//Request e response do caminho do console
app.get('/console', function (req, res) {
    res.sendFile(__dirname + '/public/console.html');
});

//Mensagens persistidas no MongoDb
app.get('/messages', messageController.list);

//Criação do server tanto para o Heroku como local
var server = require('http').createServer(app);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port :' + app.get('port'));
});

//Setando a váriavel io para escutar o server da aplicação
var io = require('socket.io').listen(server);
//endregion

//region Socketio-config

//Váriavel que controla o número de usuários conectados
var numUsers = 0;

io.on('connection', function (socket) {
    var addedUser = false;

    //Salva uma mensagem que um user escreveu, junto com a data (por default ela é Date.now)
    socket.on('new message', function (msg) {
        var message = new models.Message({
            content: msg,
            authorUser: socket.username,
            authorEmail: socket.email
        });

        message.save(function (err) {
            if (err) throw err;
            console.log(socket.username + ' message saved!');
        });

        socket.broadcast.emit('new message', {
            username: socket.username,
            message: msg
        });

        console.log(message);
    });

    //Adiciona um user e compartilha que o mesmo se conectou ao chat
    socket.on('add user', function (username) {
        if (addedUser) return;

        addedUser = true;
        socket.username = username.substr(0, username.indexOf('@'));
        socket.email = username;
        socket.emit('login', {
            numUsers: ++numUsers
        });

        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });

        console.log(socket.username);
    });

    //Compartilha que o user está escrevendo
    socket.on('typing', function () {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    //Compartilha que o user parou de escrever
    socket.on('stop typing', function () {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    //Momento em que o user desconecta e avisa ao chat do acontecimento
    socket.on('disconnect', function () {
        if (addedUser) {
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: --numUsers
            });
        }
    });
});
//endregion