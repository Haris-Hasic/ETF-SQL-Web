app.controller('SessionsController', ['$rootScope', '$scope','$location', '$http', function($rootScope,$scope, $location, $http) { 
	  
	$scope.init = function(){	
	}
	  
	$scope.login = function(){
		var data = {
			user: {
				email: $scope.username,
				password: $scope.password,
			}
		};

		$http.post('/login.json', data).then(successCallback, errorCallback);
	}
	
	var successCallback = function(response) {
		$scope.success = "Success";
		$rootScope.session = {};
		$rootScope.session.current_user = response.data.user_id;
		
		$scope.session.current_user = response.data.user_id; //ovo se koristi
	}
	
	var errorCallback = function(response) {
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