//sockets

exports.bootstrap = function(io) {
    io.sockets.on('connection', function (socket) {
        socket.emit('welcome', { status: 'ok' });

        socket.on('subscribe', function (data, callback) {
           
        });

        socket.on('unsubscribe', function (data, callback) {
            
        });
    });
};