class AddTableResetPassword < ActiveRecord::Migration
  def change
  	create_table :user_reset_passwords do |t|
	t.belongs_to :users, index: true
    t.string :token
  	end
  end
end
