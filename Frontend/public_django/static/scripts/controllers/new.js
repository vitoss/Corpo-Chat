angular.module('corpoApp')
.controller('NewCtrl', ['$scope', 'Restangular', '$location',
  function($scope, Restangular, $location) {
    $scope.name = '';
    $scope.error = false;

    $scope.create = function() {
      if($scope.name.length === 0) return;
      //check if name is free
      Restangular.all('rooms?q=' + $scope.name)
        .getList().then(function(rooms) {
          $scope.error = false;
          
          if(rooms.length > 0) {
            $scope.error = true;
          } else {
            var room = {
              name: $scope.name,
              status: 1,
              owner: '52bf3f4d1c28bea0ee723f63' //TODO
            };

            Restangular.all('rooms').post(room)
              .then(function(room) {
                $location.path('/'+room._id);
              }, function(err) {
                alert('Something went horribly wrong...')
              });
          }
        });
    };
  }
]);