# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151027110536) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "connections", force: :cascade do |t|
    t.integer  "preference_id"
    t.string   "databasetype"
    t.string   "databaseusername"
    t.string   "databasepassword_digest"
    t.string   "databaselocation"
    t.string   "sid"
    t.integer  "port"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "connections", ["preference_id"], name: "index_connections_on_preference_id", using: :btree

  create_table "preferences", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "preferences", ["user_id"], name: "index_preferences_on_user_id", using: :btree

  create_table "user_histories", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "scriptcontent"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "user_histories", ["user_id"], name: "index_user_histories_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "password_digest"
    t.integer  "usertype"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
