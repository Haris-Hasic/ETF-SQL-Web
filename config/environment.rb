# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

# I recommend using this line to show error
ActionMailer::Base.raise_delivery_errors = true

ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
    :address        => 'smtp.gmail.com',
    :domain         => 'localhost:3000',
    :port           => 587,
    :user_name      => 'etfsql@gmail.com',
    :password       => 'etfsql11',
    :authentication => :login,
	:enable_starttls_auto => true
}