class SessionsController < ApplicationController

	def new
	end

	def create
		@user = User.find_by_email(params[:session][:email])
		if @user && @user.authenticate(params[:session][:password])
		  session[:user_id] = @user
		  session[:current_username] = @user[:username]
		  json = {:user_id => session[:user_id], :current_username => session[:current_username]}.to_json
		  render json: json
		else
		  response.status(400)
		  response json: {}.to_json
		  
		  #render json: {}.to_json.status(400)
		  #redirect_to '/#/login' #pogresan password
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to '/'
	end

end
