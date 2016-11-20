/**
 * Created by guilh on 19/11/2016.
 */
var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyCtt21Ta4XnxpQBEb8gTqUhQBCK2gli-X0",
    authDomain: "insight-webchat.firebaseapp.com",
    databaseURL: "https://insight-webchat.firebaseio.com",
    storageBucket: "insight-webchat.appspot.com",
    messagingSenderId: "847289339770"
};
firebase.initializeApp(firebaseConfig);

module.exports.firebase = firebase;