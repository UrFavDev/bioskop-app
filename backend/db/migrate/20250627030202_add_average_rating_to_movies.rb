class AddAverageRatingToMovies < ActiveRecord::Migration[8.0]
  def change
    add_column :movies, :average_rating, :decimal
  end
end
