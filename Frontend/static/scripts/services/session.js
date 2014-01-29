angular.module('corpoApp')
  .factory('session', ['_', function(_) {
    var rooms = [];
    
    return {
      add: function(room) {
        if(!_.find(rooms, function(existingRoom) { return existingRoom._id == room._id; })) {
          rooms.push(room);
        }
      },
      list: function() {
        return rooms;
      },
    }
  }]);