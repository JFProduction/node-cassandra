var socket = io('localhost:3000');
var uname = 'jimmyfargo';

$(function() {
	var users = {};

	$('#usr-msg').on('input', function() {
		socket.emit('typing', uname);
	});

	socket.on('chat message', function(m, name, online) {
		if (!$('#usr-msg').is(':focus')) {
			alert(name + " said something!!");
		}

		$('#' + name + '-typing').css('display', 'none');
		var msgStart = '<span style="font-size: 9px;">' + 
			getMsgTime() + '</span> <b>' + name + ':</b> ';
		var msg = m;

		$('#msgs').append($('<li>').html(msgStart + msg));
		$('#msgs').scrollTop($('#msgs').height());
	});

	socket.on('typing', function(name) {
		$('#' + name + '-typing').css('display', 'inline-block');
	});
});

function sendMessage() {
    var trimmed = $('#usr-msg').val().trim()
    console.log(trimmed);
    if ("" !== trimmed) {
        var msg = removeTags($('#usr-msg').val().trim());
        
        if ("" !== msg ) {
            socket.emit('chat message', msg, uname);
        } else {
            $('#msgs').append($('<li>').html('<img src="pics/invalid.png" />')); 
        }
    } else if ("/clear" === trimmed) {
        console.log('show clear');
        $('#msgs').html('');
    }
    $('#usr-msg').val('');
    return false;
}

function addCommand(cmd, cmds) {
	var scriptSplit = cmd.split('<');
	var cmd = scriptSplit[0].split(' ')[1];
	var outcome = '<' + scriptSplit[1]

	$.get('/addCmd?cmd=' + cmd + '&outcome=' + outcome, function(data, status) {
		if (status === 'success') {
			alert(data.msg)
		}
	});

	$.get('/cmds', function(data, status) {
		if (status === 'success') {
			cmds = data;
		} else {
			console.log('there was an issue with getting the cmds', status);
		}
	})
}

function showCommands(cmds) {
	for (var cmd in cmds) {
		$('#msgs').append($('<li>').html('<b>' + cmd + ':</b> ' + cmds[cmd])); 
	}
	$('#usr-msg').val('');
}

function removeTags(html) {
	var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

	var tagOrComment = new RegExp(
	    '<(?:'
	    // Comment body.
	    + '!--(?:(?:-*[^->])*--+|-?)'
	    // Special "raw text" elements whose content should be elided.
	    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
	    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
	    // Regular name
	    + '|/?[a-z]'
	    + tagBody
	    + ')>',
	    'gi');

	var oldHtml;
	do {
		oldHtml = html;
		html = html.replace(tagOrComment, '');
	} while (html !== oldHtml);
	return html.replace(/</g, '&lt;');
}

function getMsgTime() {
    var date = new Date();
    return (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ":" 
                + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + ":" 
                + (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds());
}