
angular.module('corpoApp')
.controller('RoomCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.room = $routeParams.roomName;
  }
]);