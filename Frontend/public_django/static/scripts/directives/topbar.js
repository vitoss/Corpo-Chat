angular.module('corpoApp')
  .directive('topbar', function() {
	
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/static/views/topbar.html'
    };
  }).controller("topbarCtrl",function($scope) {
      $scope.show = false;

      $.getJSON("/userIsLogged/")
	 .done(function(data) {
		if (data[0].isLogged){
			$scope.show = true;
			$scope.$apply();		
		};	
	})

      $scope.login = function() { 
  
	OAuth.popup('google', function(err, res) {
		    res.get('/oauth2/v1/userinfo?alt=json').done(function(me) {
			$.ajax("/login/" )
				.done(function() {
				    $scope.show = true;
				    $scope.$apply();
				})
		});
	});
		
      };

      $scope.logout = function() {
	  $.ajax("/logout/" )
		.done(function() {
			$scope.show = false;
			$scope.$apply();
		    alert("success");
          })
      }; 


  });

