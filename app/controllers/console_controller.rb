class ConsoleController < ApplicationController
  def index
    I18n.locale = :bs
  	@queryresult = 'The result of your query will be here!'
  end
end
