// declare a module
var app = angular.module('corpoApp', ['restangular']);

app.constant('serviceUrl', 'http://localhost:8080/');

app.config(['RestangularProvider', 'serviceUrl', function(RestangularProvider, serviceUrl) {
	RestangularProvider.setBaseUrl(serviceUrl);
}]);
