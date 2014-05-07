window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = $("#field");
    var sendButton = $("#send");
    var content = $("#content");
    var name = $("#name");
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<img src="https://teksyndicate.com/sites/teksyndicate.com/files/profiles/not%20yet%20assigned/9323a93a0b591c8643e444acf8ea5aea.jpg" style="width:20px; height:20px;" />';
                html += '<b>' + (messages[i].username || 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }

            content.html(html);
            content.scrollTop(content[0].scrollHeight);
        } else {
            console.log("There is a problem:", data);
        }
    });

    var sendMessage = function() {
        var text = field.val();
        socket.emit('send', { message: text, username: name.val() });
        field.val("");
    };
 
    sendButton.click(sendMessage);
    
    $(function() {
        $("#field").keyup(function(e) {
            if(e.keyCode == 13) {
                sendMessage();
            }
        });
    });
}