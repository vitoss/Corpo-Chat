angular.module('corpoApp')
  .controller('SessionCtrl', ['$scope', 'session', 'user', function($scope, session, user) {
    $scope.activeRooms = session.list();

    session.onChange(function handleRoomListChange(newList) {
      $scope.activeRooms = newList;
    });

    $scope.userLoggedIn = function() {
      return typeof(user.email) !== 'undefined' && user.email.length > 0;
    }
  }]);