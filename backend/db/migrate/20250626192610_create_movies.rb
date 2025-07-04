class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.string :genre
      t.integer :year
      t.text :synopsis
      t.string :poster_url
      t.decimal :average_rating, precision: 3, scale: 1

      t.timestamps
    end
  end
end