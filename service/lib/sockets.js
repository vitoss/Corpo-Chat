//sockets

exports.bootstrap = function(io, db) {

	var Messages = require('./socket/Messages.js');
	Messages.init(db);

    io.sockets.on('connection', function (socket) {
        socket.emit('welcome', { status: 'ok' });

        socket.on('history', function(data, callback) {
        	Messages.getList(data.room).then(function(docs) {
	        	socket.emit('history', {
	        		room: data.room,
	        		messages: docs
	        	});
	        })
        });

        socket.on('subscribe', function (data, callback) {
           
        });

        socket.on('unsubscribe', function (data, callback) {
            
        });
    });
};