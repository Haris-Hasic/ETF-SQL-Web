class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    #@users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
    #render json
  end

  # GET /users/new
  def new
    @user = User.new
  end
  
  # GET /forgotten_password
  def forgotten_password
    @user = User.find_by_email(params[:email])
    
    if(@user.blank?)
      render json: {:error => "greska"}.to_json
      return
    end
        
    params[:id] = @user[:i]
    
    #random value
    value = ""; 20.times{value << ((rand(2)==1?65:97) + rand(25)).chr}
    @token = value
    
    #mail the user his token in a link
    UserMailer.forgotten_password(@user, @token).deliver_now
    
    #insert token into database
    @user_reset_password = UserResetPassword.new()
    @user_reset_password.users_id = @user.id
    @user_reset_password.token = @token
    
    respond_to do |format|
      if @user_reset_password.save
        format.html { render :new }
        format.json { render :show, status: :created, location: @user_reset_password }
      else
        format.html { render :new }
        format.json { render json: @user_reset_password.errors, status: :unprocessable_entity }
      end
    end
    
  end

  # GET /users/1/edit
  def edit
  end

  #def forgotten_password()
  #  @user = User.find_by_email(:params[])
  #  @user = User.find(:params[:id])
  #  UserMailer.forgotten_password(@user).deliver_now
  #end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    if @user.save
      UserMailer.registration_confirmation(@user).deliver_now
      #flash[:success] = "Please confirm your email address to continue"
      redirect_to root_url
    else
      flash[:error] = "Ooooppss, something went wrong!"
      render 'new'
    end
	
    #respond_to do |format|
    #  if @user.save
    #    format.html { redirect_to @user, notice: 'User was successfully created.' }
    #    format.json { render :show, status: :created, location: @user }
    #  else
    #    format.html { render :new }
    #    format.json { render json: @user.errors, status: :unprocessable_entity }
    #  end
    #end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
  
  def confirm_email
    user = User.find_by_confirm_token(params[:id])
    if user
      user.email_activate
      #flash[:success] = "Welcome to ETF-SQL! Your email has been confirmed.
      #Please sign in to continue."
      redirect_to '/login'
    else
      flash[:error] = "Sorry. User does not exist"
      redirect_to root_url
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end
end
