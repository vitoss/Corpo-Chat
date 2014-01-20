
angular.module('corpoApp')
.controller('RoomCtrl', ['$scope', '$routeParams', 'Restangular',
  function($scope, $routeParams, Restangular) {
    var roomId = $routeParams.roomId;

    $scope.room = Restangular.one('rooms', roomId).get().$object;
  }
]);