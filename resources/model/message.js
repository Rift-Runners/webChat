var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
   content: String,
   date: { type: Date, default: Date.now },
   authorUser: String,
   onlineUsers: [String]
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;