class UserHistoriesController < ApplicationController
  before_action :set_user_history, only: [:show, :edit, :update, :destroy]

  # GET /user_histories
  # GET /user_histories.json
  def index
    @user_histories = Array.new()
    user_id = params[:user_id]
    @user_histories = UserHistory.where('user_id = ?',user_id).limit(20)
    json = @user_histories.to_json
    render json: json
  end

  # GET /user_histories/1
  # GET /user_histories/1.json
  def show
  end

  # GET /user_histories/new
  def new
    @user_history = UserHistory.new
  end

  # GET /user_histories/1/edit
  def edit
  end

  # POST /user_histories
  # POST /user_histories.json
  def create
    @user_history = UserHistory.new()
    @user_history.scriptcontent = params[:scriptContent]
    @user_history.user_id = params[:user_id]
    respond_to do |format|
      if @user_history.save
        format.html { render :new }
        format.json { render :show, status: :created, location: @user_history }
      else
        format.html { render :new }
        format.json { render json: @user_history.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /user_histories/1
  # PATCH/PUT /user_histories/1.json
  def update
    respond_to do |format|
      if @user_history.update(user_history_params)
        format.html { redirect_to @user_history, notice: 'User history was successfully updated.' }
        format.json { render :show, status: :ok, location: @user_history }
      else
        format.html { render :edit }
        format.json { render json: @user_history.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_histories/1
  # DELETE /user_histories/1.json
  def destroy
    @user_history.destroy
    respond_to do |format|
      format.html { redirect_to user_histories_url, notice: 'User history was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_history
      @user_history = UserHistory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_history_params
      params[:user_history]
    end
end
