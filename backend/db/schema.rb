
ActiveRecord::Schema[8.0].define(version: 2025_06_27_030202) do

  enable_extension "pg_catalog.plpgsql"

  create_table "movies", force: :cascade do |t|
    t.string "title"
    t.string "genre"
    t.integer "year"
    t.text "synopsis"
    t.string "poster_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "average_rating", precision: 3, scale: 1
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.string "reviewer"
    t.integer "rating"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["movie_id"], name: "index_reviews_on_movie_id"
  end

  add_foreign_key "reviews", "movies"
end
