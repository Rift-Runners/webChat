var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  login: String,
  password: String
});

mongoose.model('User', userSchema);

module.exports = User;