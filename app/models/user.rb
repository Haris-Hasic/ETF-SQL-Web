class User < ActiveRecord::Base
  before_create :confirmation_token

  has_secure_password
  has_one :preference
  has_many :user_histories
  
  def email_activate
    self.email_confirmed = true
    self.confirm_token = nil
    save!(:validate => false)
  end
  
  private
  def confirmation_token
	if self.confirm_token.blank?
		self.confirm_token = SecureRandom.urlsafe_base64.to_s
	end
  end
end
