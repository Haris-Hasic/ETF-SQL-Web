app.controller('SessionsController', ['$scope', '$location', function($scope, $location) { 
	  
	  $scope.foo ="bar";
	  $scope.login = function(){
	  	
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