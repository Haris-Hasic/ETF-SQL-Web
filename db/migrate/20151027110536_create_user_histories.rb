class CreateUserHistories < ActiveRecord::Migration
  def change
  	create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.integer :usertype
      t.timestamps null: false
    end
    create_table :preferences do |t|
      t.belongs_to :user, index: true
      t.string :color
      t.timestamps null: false
    end
    create_table :connections do |t|
      t.belongs_to :preference, index: true
      t.string :databasetype
      t.string :databaseusername
      t.string :databasepassword_digest
      t.string :databaselocation
      t.string :sid
      t.integer :port
      t.timestamps null: false
    end
    create_table :user_histories do |t|
    	t.belongs_to :user, index: true
     	t.string :scriptcontent
     	t.timestamps null: false
     end
  end
end
