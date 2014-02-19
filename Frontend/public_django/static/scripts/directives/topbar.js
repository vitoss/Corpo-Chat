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
			$scope.username = data[0].username;
			$scope.$apply();		
		};	
	})

      $scope.login = function() { 
  
	OAuth.popup('google', function(err, res) {
		    res.get('/oauth2/v1/userinfo?alt=json').done(function(me) {
			$.ajax({
				url: "/login/",
				data: "username="+me.name
				}).done(function() {
				    $scope.show = true;
				    $scope.username= me.name;
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
          })
      }; 


  });

