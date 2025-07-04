class Movie < ApplicationRecord
  validates :title, presence: true
  validates :year, numericality: { 
    only_integer: true, 
    greater_than: 1888,
    less_than_or_equal_to: Date.today.year 
  }
  validates :average_rating, numericality: {
    allow_nil: true,
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: 10
  }
end