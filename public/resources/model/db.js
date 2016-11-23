var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema de mensagem
var messageSchema = new Schema({
    content: String,
    date: {type: Date, default: Date.now},
    authorUser: String,
    authorEmail: String
    // onlineUsers: [String]
});
module.exports.Message = mongoose.model('Message', messageSchema);

//Schema de user
var userSchema = new Schema({
    name: String
    // email: String,
    // login: String,
    // password: String
});

module.exports.User = mongoose.model('User', userSchema);