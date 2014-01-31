angular.module('corpoApp')
  .factory('session', ['_', function(_) {
    var rooms = [],
        changeCallback;
    
    return {
      add: function addRoom(room) {
        if(!_.find(rooms, function(existingRoom) { return existingRoom._id == room._id; })) {
          rooms.push(room);
          changeCallback(rooms);
        }
      },
      remove: function removeRoom(room) {
        if(_.find(rooms, function(existingRoom) { return existingRoom._id == room._id; })) {
          rooms = _.without(rooms, room);
          changeCallback(rooms);
        }
      },
      list: function getRoomList() {
        return rooms;
      },
      onChange: function registerCallback(handler) {
        changeCallback = handler;
      }
    }
  }]);