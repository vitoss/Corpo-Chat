
angular.module('corpoApp')
.controller('RoomsCtrl', ['$scope', '$http', 'Restangular',
 function($scope, $http, Restangular) {
  var rooms = Restangular.all('rooms');

  $scope.workInProgress = true;

  $scope.rooms = rooms.getList().then(function(rooms) {
    $scope.rooms = rooms;
    $scope.workInProgress = false;
  });

  $scope.searchPhrase = '';
  
  $scope.search = function() {
    $scope.workInProgress = false;
    rooms.getList({'q': $scope.searchPhrase}).then(function(rooms) {
      $scope.rooms = rooms;
      $scope.workInProgress = false;
    });
  };
}]);