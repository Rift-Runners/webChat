var $ = require('jquery');

var messagesUrl = function getMessagesUrl(){
    var url;
    if((window.location.href).includes("localhost")){
        url = "http://localhost:8080/messages";
    } else {
        url = "https://ads-webchat.herokuapp.com/messages";
    }

    return url;
}

$(function () {
	if(tempVerifyPass()){
		updateInputWithFilter();
	}
});

function tempVerifyPass() {

	var pass = prompt("Type in your password", "");
	
	if (pass === 'batata'){	
		return true;
	}
	
	var body = $('body');
	body.empty();
	body.append('<h1>Wrong pass! Try again...</h1>');
	
	return false;
};


function updateInputWithFilter(input, field){
    $.ajax({
        type: 'GET',
        url: messagesUrl,
        data: $('#messages').serialize(),
        dataType: "json",
        success: function (data) {
            if (data) {
                var len = data.length;
                var txt = '<tr><th>Author</th><th>Content</th><th>Date</th></tr>';
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        $('#console-info').empty();
                        var tableRow = "<tr><td>" + data[i].authorUser + "</td><td>" + data[i].content + "</td><td>" + new Date(data[i].date).toGMTString() + "</td></tr>";
                        switch(field) {
                            case 'username':
                                if((data[i].authorUser.toLowerCase()).includes(input.toLowerCase())){
                                    txt += tableRow;
                                }
                                break;
                            case 'content':
                                if((data[i].content.toLowerCase()).includes(input.toLowerCase())){
                                    txt += tableRow;
                                }
                                break;
                            case 'date':
                                if((data[i].date.toLowerCase()).includes(input.toLowerCase())){
                                    txt += tableRow;
                                }
                                break;
                            default:
                                txt += tableRow;
                                break;
                        }
                    }
                    if (txt != "") {
                        $("#console-info").append(txt).removeClass("hidden");
                    }
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error: ' + textStatus + ': ' + errorThrown);
        }
    });
    return false;
};

$('#input-search').on('keyup', function () {
    updateInputWithFilter($('#input-search').val(), $('input:checked').val());
});

$('#fieldUsername, #fieldContent, #fieldDate').on('click', function () {
    updateInputWithFilter($('#input-search').val(), $('input:checked').val());
});