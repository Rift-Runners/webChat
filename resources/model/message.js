var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
   content: String,
   date: { type: Date, default: Date.now },
   authorUser: String,
   onlineUsers: [String]
});

mongoose.model('Message', Message);