app.controller('PasswordResetController', ['$rootScope', '$scope', '$routeParams', '$location', '$http', function($rootScope, $scope, $routeParams, $location, $http) { 
	
	$scope.initRestart = function(){
		
		$http.get('/resetPassword', {params: {token: $routeParams.token}}).then(successCallbackRestartInit, errorCallbackRestartInit)
		
	}
	
	//inicijalizacija restart forme - na kojoj izmedju ostalog pise email
	var successCallbackRestartInit = function(response) {
		$scope.email = response.data.email
		$scope.user_id = response.data.user_id
	}
	
	var errorCallbackRestartInit = function(response) {
	}
	
	$scope.resetPassword = function(){
		$http.post("/resetPassword", {params: {id: $scope.user_id, password: $scope.password, password_confirmation
			:$scope.password_confirmation}}).then(successCallbackRestart, errorCallbackRestart);
	}
	
	var successCallbackRestart = function(response) {
		if(response.data.error)
		{
			toastr.error("Passwordi moraju biti jednaki.");
		}
		else
		{
			toastr.success("Vaš password je uspješno promjenjen");
			$location.path("/login");
		}
	}
	
	var errorCallbackRestart = function(response) {
		//Greska u http protokolu
	}
	
	
	$scope.sendEmail = function(){
	    var data = {
			user: {
				email: $scope.email
			}
		};
		
		$http.get('/forgotten_password', {params: {email: $scope.email}}).then(successCallbackForgot, errorCallbackForgot);
	}
	
	var successCallbackForgot = function(response) {
		if(response.data.error)
		{
			toastr.error("Korisnički email nije registrovan")
			//$scope.success = "Greška u slanju maila";
		}
		else
		{
			toastr.info("Provjerite vaš mejl")
			//$scope.success = "Mail je dostavljen";
		}
	}
	
	var errorCallbackForgot = function(response) {
		//Greska u http protokolu
	}
	
}]);
