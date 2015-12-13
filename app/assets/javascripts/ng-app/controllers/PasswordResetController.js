app.controller('PasswordResetController', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) { 
	
	$scope.initRestart = function(){
	    
	}
	
	$scope.resetPassword = function(){
	    
	}
	
	$scope.sendEmail = function(){
	    
	}
	
	var successCallback = function(response) {
		$scope.success = "Success";
	}
	
	var errorCallback = function(response) {
		$scope.success = "Error";
	}
	
}]);
