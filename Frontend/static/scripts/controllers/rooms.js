
angular.module('corpoApp')
.controller('RoomsCtrl', ['$scope', '$http', 'serviceUrl',
 function($scope, $http, serviceUrl) {
  $scope.Content = "Test content from AngularJS!";

  $scope.rooms = [];

  $scope.searchPhrase = '';

  $scope.search = function() {
  	$http({ method: 'GET', url: serviceUrl }).
	  success(function(data, status, headers, config) {
	    $scope.rooms = data;
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
  };
}]);