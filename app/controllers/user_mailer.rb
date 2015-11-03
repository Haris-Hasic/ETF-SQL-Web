class UserMailer < ActionMailer::Base
	default :from => "dazinovic1@etf.unsa.ba"
	
	def registration_confirmation(user)
		@user = user
		mail(:to => "#{user.username} <#{user.email}>", :subject => "Registration Confirmation")
	end
end