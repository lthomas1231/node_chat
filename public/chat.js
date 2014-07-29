window.onload = function() {
 
    var messages = [];
    var socket = io.connect(location.origin);
    var field = $("#field");
    var sendButton = $("#send");
    var content = $("#content");

    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username || 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }

            content.html(html);
            content.scrollTop(content[0].scrollHeight);
        } else {
            console.log("There is a problem:", data);
        }
    });

    socket.on('user_joined', function (data) {
        console.log(data, 'HEIHEIFHE');
        $('#chat-box-thing').append(data.username);
    });

    var sendMessage = function() {
        var text = field.val();
        socket.emit('send', { message: text, token: getToken() });
        field.val("");
    };

    var joinRoom = function () {
        socket.emit('join', { token: getToken() });
    };

    var getToken = function () {
        return document.cookie.match(/loginToken=(.*);?/)[1];
    };
 
    sendButton.click(sendMessage);
    
    $(function() {
        $("#field").keyup(function(e) {
            if(e.keyCode == 13) {
                sendMessage();
            }
        });

        joinRoom();
    });
}