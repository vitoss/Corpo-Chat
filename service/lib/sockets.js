//sockets

exports.bootstrap = function(io, db) {

    var Messages = require('./socket/Messages.js'),
        Rooms = require('./socket/Rooms.js'),
        Users = require('./socket/Users.js');

    Messages.init(db);
    Rooms.init(db);
    Users.init(db);

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
            Rooms.findOne(data.room).then(function() {
                socket.join(data.room);
                socket.emit('greetings', {room: data.room, status:0, msg: 'Welcome in room ' + data.room});
            }, function(reason) {
                socket.emit('error', reason);
            });
        });

        socket.on('unsubscribe', function (data, callback) {
            socket.leave(data.room);
        });

        socket.on('msg', function(data, callback) {
            var postMessage = function(user) {
                    //here message creation logic
                    var message = {
                                   "room": data.room,
                                   "content": data.content,
                                   "author": user._id,
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
                };

            //check if user exists in database
            Users.findOneByEmail(data.author)
                .then(function userFound(user) {
                    postMessage(user);
                }, function userNotFound() {
                    //create user
                    var avatar = data.authorAvatar || '';
                    return Users.post({"email": data.author, "avatar": avatar});
                }).then(function() {
                    postMessage(user);
                });
        });
    });
};