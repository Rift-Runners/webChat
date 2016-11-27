var $ = require('jquery');
var dt = require('datatables.net-bs')(window, $);

var messagesUrl = function getMessagesUrl() {
    var url;

    if ((window.location.href).includes("localhost")) {
        url = "http://localhost:8080/messages";
    } else {
        url = "https://ads-webchat.herokuapp.com/messages";
    }

    return url;
}

$(function () {
    if (tempVerifyPass()) {
        getMessages();
    }
});

function tempVerifyPass() {
    var pass = prompt("Type in your password", "");

    if (pass === 'batata') {
        return true;
    }

    var body = $('body');
    body.empty();
    body.append('<h1>Wrong pass! Try again...</h1>');

    return false;
}

function getMessages() {
    var loadedUrl = messagesUrl();

    $.ajax({
        type: 'GET',
        url: loadedUrl,
        success: function (response) {
            console.log(response);

            $('#console-info').DataTable({
                data: response,
                "columns": [
                    {
                        "data": "authorEmail",
                        title: "Email"
                    },
                    {
                        "data": "authorUser",
                        title: "User"
                    },
                    {
                        "data": "content",
                        title: "Message content"
                    },
                    {
                        "data": "date",
                        title: "Date"
                    }
                ]
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error: ' + jqXHR + ': ' + textStatus + ': ' + errorThrown);
        }
    });
}