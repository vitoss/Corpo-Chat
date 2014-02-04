angular.module('corpoApp')
  .controller('SessionCtrl', ['$scope', 'session', function($scope, session) {
    $scope.activeRooms = session.list();

    session.onChange(function handleRoomListChange(newList) {
      $scope.activeRooms = newList;
    });
  }]);