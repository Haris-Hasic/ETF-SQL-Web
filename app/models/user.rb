class User < ActiveRecord::Base
  has_secure_password
  has_one :preference
  has_many :user_histories
end
