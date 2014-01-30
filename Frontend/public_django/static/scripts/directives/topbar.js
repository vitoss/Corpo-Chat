angular.module('corpoApp')
  .directive('topbar', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/static/views/topbar.html'
    };
  });