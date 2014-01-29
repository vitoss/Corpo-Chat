
angular.module('corpoApp')
.controller('RoomCtrl', ['$scope', '$routeParams', 'Restangular', 'session',
  function($scope, $routeParams, Restangular, session) {
    var roomId = $routeParams.roomId;

    Restangular.one('rooms', roomId)
      .get().then(function(room) {
        $scope.room = room;

        session.add(room);
      });
  }
]);