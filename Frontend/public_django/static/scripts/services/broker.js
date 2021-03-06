angular.module('corpoApp')
  .factory('broker', ['io', 'socketFactory', 'serviceUrl', 'user', 
    function (io, socketFactory, serviceUrl, user) {

    var socket = socketFactory({
      ioSocket: io.connect(serviceUrl)
    });

    var handlers = {};

    socket.on('connect', function() {
        console.log('Socket connected');
    });

    socket.on('greetings', function interpretWarmWelcome(data) {
        if(data.status == 0) {
          handlers[data.room].connected(data);
        }
    });

    socket.on('history', function interpretHistory(data) {
        var msgs = data.messages;

        for(var i=0, l=msgs.length; i<l; i++) {
            console.log(msgs[i]);
            handlers[data.room].message(msgs[i]);
        }
    });

    socket.on('msg', function interpretMessage(data) {
        console.log(data);
        handlers[data.room].message(data);
    });

    return {
      subscribe: function createRoomSubscription(roomId, handler) {
        if(typeof(handlers[roomId]) === 'undefined' || handlers[roomId] === null) {
          socket.emit('subscribe', {room:roomId});
          handlers[roomId] = handler;
        }

        return {
          history: function() {
            socket.emit('history', {room: roomId});
          },
          send: function(msg) {
            socket.emit('msg', {room:roomId, content: msg, author: {
                email: user.email,
                username: user.username,
                avatar: user.avatar
              }
            });
          },
          unsubscribe: function() {
            socket.emit('unsubscribe', {room: roomId});
            handlers[roomId] = null;
          }
        };
      },
      unsubscribe: function removeRoomSubscription(roomId, handler) {
        //TODO
      }
    };
  }]);