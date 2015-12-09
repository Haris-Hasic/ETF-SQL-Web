app.controller('SignupController', ['$scope', '$location', '$http', function($scope, $location, $http) { 
	  
	$scope.signUp = function(){
		var data = {
			user: {
				username: $scope.username,
				email: $scope.email,
				password: $scope.password,
				password_confirmation: $scope.password_confirmation
			}
		};

		$http.post('/users', data).then(successCallback, errorCallback);
	}
	
	var successCallback = function(response) {
		$scope.success = "Success";
	}
	
	var errorCallback = function(response) {
		$scope.success = "Error";
	}
	
}]);