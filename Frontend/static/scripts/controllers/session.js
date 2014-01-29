angular.module('corpoApp')
  .controller('SessionCtrl', ['$scope', function($scope) {
    $scope.activeRooms = [{'_id': 'adsf', 'name': 'RoomA', 'indicator': false}, {'_id': 'adsf', 'name': 'RoomB', 'indicator': true}];
  }]);