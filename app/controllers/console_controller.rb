class ConsoleController < ApplicationController

  @@conn = nil

  def index
  	rows = []
  	columns = []
    sc = params[:scriptContent]
    
    begin
      query = @@conn.exec(sc)
      query.column_metadata.each do |r|
          columns.push(r.name)
      end
	  
	    while r = query.fetch()
	      rows.push(r)
	    end
	    query.close
	  
	    json = {:columns => columns, :rows => rows}.to_json
      puts json
	  
	    respond_to do |format|
        format.json { render json: json }
        format.html { render html: json }
      end
	  
    rescue
      if @@conn.nil?
        json = { :error => "No Connection",
                 :parse_error_offset => 0 }.to_json
      else
        json = { :error => @@conn.last_error.message, 
                 :parse_error_offset => @@conn.last_error.parse_error_offset}.to_json
      end

      respond_to do |format|
        format.json { render json: json }
        format.html { render html: json }
      end
	  end

  end

  def new
  end
  
  def create
    puts 'dbconnect, reporting to duty!'
    constring = '//' + params[:databaselocation].to_s + ':' + params[:port].to_s + '/' + params[:sid].to_s
    database = params[:databaseusername].to_s
    dbpass = params[:databasepassword_digest].to_s

    begin
      @@conn = OCI8.new(database, dbpass, constring)

      render json: { :status => "OK" }.to_json
    rescue
      render json: { :status => "ERROR" }.to_json
    end
  end

  def destroy
    if @@conn.nil?
      render json: { :status => "ERROR" }.to_json
    else
      @@conn = nil
      render json: { :status => "OK" }.to_json
    end
  end

end
