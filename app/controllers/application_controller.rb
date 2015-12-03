class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  before_action :set_locale
  helper_method :current_user

  def index
  end
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  def require_user
    redirect_to '/login' unless current_user
  end
  
  def set_locale
    if(params[:locale] != nil )
      session["langTag"] = params[:locale]
    end
    I18n.locale = session["langTag"]
  end
end
