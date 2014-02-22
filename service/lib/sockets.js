//sockets
var connectionCounters = {};

var changeCounter = function(room, mod) {
    if(typeof(connectionCounters[room]) === 'undefined') {
        connectionCounters[room] = mod;
    } else {
        connectionCounters[room] += mod;
    }
};

var increaseCounter = function(room) {
    changeCounter(room, 1);
};

var decreaseCounter = function(room) {
    changeCounter(room, -1);
};

var getCounter = function(room) {
    if(typeof(connectionCounters[room]) === 'undefined') {
        return 0;
    } else {
        return connectionCounters[room];
    }
};

exports.bootstrap = function(io, db) {

    var Messages = require('./socket/Messages.js'),
        Rooms = require('./socket/Rooms.js'),
        Users = require('./socket/Users.js');

    Messages.init(db);
    Rooms.init(db);
    Users.init(db);

    var updateRoomCounter = function(room) {
        Rooms.findOne(room).then(function(doc) {
            doc.counter = getCounter(room);
            doc.save(function(err) {
                if(err) {
                    console.log('Error during saving room with new counter. ' + err);
                    return;
                }
            });
        }, function(reason) {
            socket.emit('error', reason);
        });
    };

    io.sockets.on('connection', function (socket) {
        var subscribedRooms = [];

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
            increaseCounter(data.room);
            subscribedRooms.push(data.room);

            Rooms.findOne(data.room).then(function(doc) {
                doc.counter = getCounter(data.room);
                doc.save(function(err) {
                    if(err) {
                        console.log('Error during saving room with new counter. ' + err);
                        return;
                    }

                    socket.join(data.room);
                    socket.emit('greetings', {room: data.room, status:0, msg: 'Welcome in room ' + data.room});
                });
            }, function(reason) {
                socket.emit('error', reason);
            });
        });

        socket.on('unsubscribe', function (data, callback) {
            decreaseCounter(data.room);
            subscribedRooms.splice(subscribedRooms.indexOf(data.room), 1);

            updateRoomCounter(data.room);

            socket.leave(data.room);
        });

        socket.on('msg', function(data, callback) {
            //here message creation logic
            var message = {
                           "room": data.room,
                           "content": data.content,
                           "author": data.author,
                           "date": new Date()
                          };

            Messages.post(message).then(function() {
                //broadcast
                socket.broadcast.to(data.room).emit('msg', message);

                //confirmation
                socket.emit('msg', message);
            }, function(reason) {
                socket.emit('error', reason);
            });
        });

        socket.on('room_counter', function getRoomCounter(data, callback) {
            socket.emit('room_counter', {room: data, counter: getCounter(data)});
        });

        socket.on('disconnect', function() {
            for(var i=0, l=subscribedRooms.length; i<l; i++) {
                var room = subscribedRooms[i];

                decreaseCounter(room);
                updateRoomCounter(room);
            }

            subscribedRooms.length = 0;
        });
    });
};