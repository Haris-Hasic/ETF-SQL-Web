class ConsoleController < ApplicationController
  def index
  	rows = []
  	columns = []
    sc = params[:scriptContent]
    constring = '//'+params[:databaselocation].to_s+':'+params[:port].to_s+'/'+params[:sid].to_s
    database = params[:databaseusername].to_s
    dbpass = params[:databasepassword_digest].to_s
  	conn = OCI8.new(database,dbpass,constring)
	begin
	  query = conn.exec(sc)
      query.column_metadata.each do |r|
        columns.push(r.name)
  end
	  
	  while r = query.fetch()
	    rows.push(r)
	  end
	  query.close
	  
	  json = {:columns => columns, :rows => rows}.to_json
	  
	  respond_to do |format|
        format.json { render json: json }
        format.html { render html: json }
      end
	  
	rescue
	  json = {:error => conn.last_error.message, 
	           :parse_error_offset => conn.last_error.parse_error_offset}.to_json

	  respond_to do |format|
        format.json { render json: json }
        format.html { render html: json }
      end
	  
	end

  end
  
  def create
  end
end
