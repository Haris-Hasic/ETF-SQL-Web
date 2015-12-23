class ConnectionsController < ApplicationController
  before_action :set_connection, only: [:show, :edit, :update, :destroy]
  before_action :set_preference, only: [:show, :destroy]

  # GET /connections
  # GET /connections.json
  def index
    user_id = params[:user_id]
    preference = Preference.where('user_id = ?',user_id).limit(1)
    @connections = Array.new()
    @connections = Connection.where('preference_id = ?', preference[0][:id]).limit(20) unless preference.blank?
    json = @connections.to_json
    render json: json
  end

  # GET /connections/1
  # GET /connections/1.json
  def show
  end

  # GET /connections/new
  def new
    @connection = Connection.new
  end

  # GET /connections/1/edit
  def edit
    @connection = Connection.find(params[:id])

  end

  # POST /connections
  # POST /connections.json
  def create
    @connection = Connection.new()
    @connection[:databaseusername] = params[:databaseusername]
    @connection[:databasetype] = params[:databasetype]
    @connection[:databaselocation] = params[:databaselocation]
    @connection[:sid] = params[:sid]
    @connection[:port] = params[:port]
    @connection[:databasepassword_digest] = params[:databasepassword_digest]
    @connection[:preference_id] = params[:preference_id]
    respond_to do |format|
      if @connection.save
        format.html { render :new }
        format.json { render :show, status: :created, location: @connection }
      else
        format.html { render :new }
        format.json { render json: @connection.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /connections/1
  # PATCH/PUT /connections/1.json
  def update
    @connection[:databaseusername] = params[:databaseusername]
    @connection[:databasetype] = params[:databasetype]
    @connection[:databaselocation] = params[:databaselocation]
    @connection[:sid] = params[:sid]
    @connection[:port] = params[:port]
    @connection[:databasepassword_digest] = params[:databasepassword_digest]
    respond_to do |format|
      if @connection.update(params.permit(:id,:databaseusername,:databaselocation,:databasetype,:sid,:port,:databasepassword_digest))
        format.html { render :new }
        format.json { render :show, status: :ok, location: @connection }
      else
        format.html { render :edit }
        format.json { render json: @connection.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /connections/1
  # DELETE /connections/1.json
  def destroy
    @connection.destroy
    respond_to do |format|
      format.html { redirect_to connections_url, notice: 'Connection was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_connection
      @connection = Connection.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def connection_params
      params[:connection]
    end
end
