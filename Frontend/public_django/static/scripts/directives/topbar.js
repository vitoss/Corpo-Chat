angular.module('corpoApp')
  .directive('topbar', function() {
	
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/static/views/topbar.html'
    };
  }).controller("topbarCtrl", ['$scope', 'user', function($scope, user) {
      $.getJSON("/userIsLogged/")
    	 .done(function(data) {
    		if (data[0].isLogged){
                user.username = data[0].username;
                user.email = data[0].email;
                user.avatar = data[0].avatar;
    			$scope.$apply();		
    		};	
    	});

    $scope.user = user;

    $scope.login = function() { 
  
	OAuth.popup('google', function(err, res) {
		    res.get('/oauth2/v1/userinfo?alt=json').done(function(me) {

			$.ajax({
				url: "/login/",
				data: "username="+me.name+'&email=' + me.email + '&avatar=' + me.picture 
				}).done(function() {
				    
				});

            user.username = me.name;
            user.email = me.email;
            user.avatar = me.picture;
            $scope.$apply();
		});
	});
		
      };

      $scope.logout = function() {
	  $.ajax("/logout/" )
		.done(function() {
			user.email = '';
            user.username = '';
            user.avatar = '';
			$scope.$apply();
          })
      }; 
  }]);

