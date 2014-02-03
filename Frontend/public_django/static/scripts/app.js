// declare a module
var app = angular.module('corpoApp', ['ngRoute', 'restangular', 'btford.socket-io']);

app.constant('serviceUrl', 'http://localhost:8080/');

app.config(['$routeProvider', '$locationProvider', 'RestangularProvider', 'serviceUrl', 
  function($routeProvider, $locationProvider, RestangularProvider, serviceUrl) {
  
  RestangularProvider.setBaseUrl(serviceUrl);

  $routeProvider
    .when('/', {
      templateUrl: 'static/views/rooms.html',
      controller: 'RoomsCtrl'
    })
    .when('/new', {
      templateUrl: 'static/views/new.html',
      controller: 'NewCtrl'
    })
    .when('/:roomId', {
      templateUrl: 'static/views/room.html',
      controller: 'RoomCtrl'
    });

  $locationProvider.html5Mode(true);
}]);

//misc
app.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

app.factory('io', function() {
  return window.io; // assumes underscore has already been loaded on the page
});