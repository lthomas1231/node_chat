window.onload = function() {
 
    var blinkIntervalId;
    var messages = [];
    var socket = io.connect(location.origin);
    var field = $("#field");
    var sendButton = $("#send");
    var content = $("#content");
 
    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data);
            var html = '';
            for (var i = 0; i < messages.length; i++) {
            	if (messages[i].imgurl) {
            		html += '<img src="' + messages[i].imgurl + '" style="height:30px"/>'
            	}
                html += '<b>' + (messages[i].username || 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }

            content.html(html);
            content.scrollTop(content[0].scrollHeight);

            blinkIntervalId = setInterval(blinkTitleBar(), 3000);
        } else {
            console.log("There is a problem:", data);
        }
    });

    var sendMessage = function() {
        var text = field.val();
        socket.emit('send', { message: text, token: document.cookie.match(/loginToken=(.*);?/)[1] });
        field.val("");
    };
 
    sendButton.click(sendMessage);
    
    $(function() {
        $("#field").keyup(function(e) {
            if(e.keyCode == 13) {
                sendMessage();
            }
        });

        $(window).focus(function() {
            console.log('Clearing blink', blinkIntervalId);
            clearInterval(blinkIntervalId);
            window.document.title = "Default Title";
        })
    });
}

var blinkTitleBar = function() {
    var blinking = true;

    return function() {
        if (blinking) {
            window.document.title = '~~~~~~~~';
        } else {
            window.document.title = '';
        }

        blinking = !blinking;
    }
}