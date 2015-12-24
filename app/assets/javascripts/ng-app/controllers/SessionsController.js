app.controller('SessionsController', ['$rootScope', '$scope','$location', '$http', '$cookieStore', function($rootScope,$scope, $location, $http, $cookieStore) { 
	  
	$scope.init = function(){	
		if($cookieStore.get('userCookie'))
		{
			successLogin($cookieStore.get('userCookie'));
			toastr.info("Vaša sesija je vraćena");
		}
	}
	
	$scope.logout = function(){
		$rootScope.session = undefined;
		$scope.session = undefined;
		$cookieStore.remove('userCookie');
		
		$location.path("/");
	}
	
	$scope.login = function(){
		var data = {
      email: $scope.username,
      password: $scope.password,
		};

		$http.post('/login.json', data).then(successLoginWithNotification, errorLogin);
	}
	
	var successLoginWithNotification = function(response){
		successLogin(response);
		if(response.data.user_id != undefined)
			toastr.success("Dobrodošli, " + response.data.user_id.username);
	}
	
	var successLogin = function(response) {
		
		if(response.data.error != undefined)
		{
			toastr.error("Pogrešan username i/ili password");
		}
		else
		{
			$scope.success = "Success";
			$rootScope.session = {};
			$rootScope.session.current_user = response.data.user_id;
			$scope.session.current_user = response.data.user_id; //ovo se koristi
			
			$cookieStore.put('userCookie', response);
			$location.path("/console");
		}
	}
	
	var errorLogin = function(response) {
		//Greska u http protokolu
		$scope.success = "Error";
	}

}]);

/*
class SessionsController < ApplicationController

	def new
	end

	def create
		@user = User.find_by_email(params[:session][:email])
		if @user && @user.authenticate(params[:session][:password])
		  session[:user_id] = @user
		  session[:current_username] = @user[:username]
		  redirect_to '/'
		else
		  redirect_to '/login' #pogresan password
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to '/'
	end

end
*/