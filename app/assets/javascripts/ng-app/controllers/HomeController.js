app.controller('HomeController', ['$rootScope', '$scope', function($rootScope, $scope) { 
	
	$scope.test = function() {
		console.log("test");
	};

	  $scope.init = function(){
	  	if($rootScope.session) {
	  	   $scope.username = $rootScope.session.current_user.username;
	  	}
	    else
	       $scope.username = '';
	  };
}]);
