var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  login: String,
  password: String
});
mongoose.model('User', userSchema);

var messageSchema = new Schema({
   content: String,
   date: { type: Date, default: Date.now },
   authorUser: String,
   onlineUsers: [String]
});

mongoose.model('Message', messageSchema);
mongoose.connect('mongodb://localhost/webChat');

user.save(function (err, user) {
  if (err) return console.error(err);
  console.log(user.name + " saved.")
});