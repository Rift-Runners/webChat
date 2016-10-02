var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema de mensagem
var messageSchema = new Schema({
   content: String,
   date: { type: Date, default: Date.now },
   authorUser: String
   // onlineUsers: [String]
});

var message = mongoose.model('Message', messageSchema);
module.exports.Message = message;

//Schema de user
var userSchema = new Schema({
   name: String
   // email: String,
   // login: String,
   // password: String
});

var user = mongoose.model('User', userSchema);
module.exports.User = user;