class UserResetPasswordController < ApplicationController
   
    # POST /resetPassword
    def restart
        @user = User.find(params[:params][:id])
        
        @user.password = params[:params][:password]
        @user.password_confirmation = params[:params][:password_confirmation]
        if @user.save
            UserResetPassword.where(users_id: @user.id).destroy_all
            
		    session[:user_id] = @user
		    session[:current_username] = @user[:username]
		    json = {:user_id => session[:user_id], :current_username => session[:current_username]}.to_json
		    render json: json
		else
		    render json: {:error => "greska"}.to_json
		    #render.status(500)
		    #render json: {}.to_json
		end
        
    end

    # GET /resetPassword
    def activate
        
        @user_res_pass = UserResetPassword.find_by_token(params[:token])
        @user = User.find(@user_res_pass.users_id)
        
        puts(@user.id)
        
		if @user
		  json = {:user_id => @user.id, :email => @user.email}.to_json
		  render json: json
		else
		  #user_res_pass ne postoji
		  render json: {:error => "greska"}.to_json
		  #render.status(400)
		  #render json: {}.to_json
		end
    end
        
    def destroy
    end
end
