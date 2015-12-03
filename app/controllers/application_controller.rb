class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  before_action :set_locale
  helper_method :current_user
  after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
  cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end
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
  protected
  # In Rails 4.2 and above
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end
end
