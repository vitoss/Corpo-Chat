// declare a module
var app = angular.module('corpoApp', ['ngRoute', 'restangular']);

app.constant('serviceUrl', 'http://localhost:8080/');

app.config(['$routeProvider', '$locationProvider', 'RestangularProvider', 'serviceUrl', 
  function($routeProvider, $locationProvider, RestangularProvider, serviceUrl) {
  
  RestangularProvider.setBaseUrl(serviceUrl);

  $routeProvider
    .when('/', {
      templateUrl: 'static/views/rooms.html',
      controller: 'RoomsCtrl'
    })
    .when('/:roomName', {
      templateUrl: 'static/views/room.html',
      controller: 'RoomCtrl'
    });

  $locationProvider.html5Mode(true);
}]);
