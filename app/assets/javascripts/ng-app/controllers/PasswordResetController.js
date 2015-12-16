app.controller('PasswordResetController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) { 
	
	$scope.initRestart = function(){
		
	}
	
	$scope.resetPassword = function(){
	    
	}
	
	$scope.sendEmail = function(){
	    var data = {
			user: {
				email: $scope.email
			}
		};
		
		$http.get('/forgotten_password', {params: {email: $scope.email}}).then(successCallback, errorCallback);
		//$http.get('/users/1/edit', {params: {email: $scope.email}}).then(successCallback, errorCallback);
		//$http.get('/users/'+$scope.email+'/edit', data).then(successCallback, errorCallback)
	}
	
	var successCallback = function(response) {
		$scope.success = "Mail je dostavljen";
	}
	
	var errorCallback = function(response) {
		$scope.success = "Greška u slanju maila";
	}
	
}]);
