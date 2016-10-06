/**
 * Created by guilherme on 02/10/2016.
 */
var Message = require('../model/db.js').Message;

module.exports.list = function(req, res){
    Message.find(function(err, msgs) {
        res.send(msgs);
    });
};