class SessionsController < ApplicationController

	def new
	end

	def create
		@user = User.find_by_email(params[:session][:user][:email])
		if @user && @user.authenticate(params[:session][:user][:password])
		  session[:user_id] = @user
		  session[:current_username] = @user[:username]
		  json = {:user_id => session[:user_id], :current_username => session[:current_username]}
		  render json: json
		else
		  redirect_to '/#/login' #pogresan password
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to '/'
	end

end
