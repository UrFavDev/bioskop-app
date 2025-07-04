class Review < ApplicationRecord
  belongs_to :movie

  validates :reviewer, presence: true
  validates :rating, presence: true, inclusion: { in: 0..10 }
  validates :comment, presence: true, length: { minimum: 5 }
end
