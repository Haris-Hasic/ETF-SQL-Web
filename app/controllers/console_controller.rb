class ConsoleController < ApplicationController
  def index
  	sc = params[:scriptContent]
  	@rows = []
  	@columns = []
    @conn = OCI8.new('hh16098', 'Ctilv7Ef', '//80.65.65.66:1521/ETFLAB.DB.LAB.ETF.UNSA.BA')
    
	begin
	  @query = @conn.exec(sc)
      @query.column_metadata.each do |r|
        @columns.push(r.name)
      end
	  
      #@conn.exec(sc) do |r|
      #  @rows.push(r)
      #end
	  
	  while r = @query.fetch()
	    @rows.push(r)
	  end
	  @query.close
	  
	rescue
	  puts "Error: " + @conn.last_error.message
	  puts "Code: " + @conn.last_error.code.to_s
	  puts "Offset: " + @conn.last_error.parse_error_offset.to_s
	  puts "SQL: " + @conn.last_error.sql
	end

    @json = {:columns => @columns, :rows => @rows}.to_json
    
	respond_to do |format|
      format.json { render json: @json }
      format.html { render html: @json }
    end
  end
  def create
  	
  end
end
