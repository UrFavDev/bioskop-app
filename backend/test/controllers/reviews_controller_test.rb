require "test_helper"

class ReviewsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @review = reviews(:one)
  end

  test "should get index" do
    get reviews_url, as: :json
    assert_response :success
  end

  test "should create review" do
    assert_difference("Review.count") do
      post reviews_url, params: { review: { comment: @review.comment, movie_id: @review.movie_id, rating: @review.rating, reviewer: @review.reviewer } }, as: :json
    end

    assert_response :created
  end

  test "should show review" do
    get review_url(@review), as: :json
    assert_response :success
  end

  test "should update review" do
    patch review_url(@review), params: { review: { comment: @review.comment, movie_id: @review.movie_id, rating: @review.rating, reviewer: @review.reviewer } }, as: :json
    assert_response :success
  end

  test "should destroy review" do
    assert_difference("Review.count", -1) do
      delete review_url(@review), as: :json
    end

    assert_response :no_content
  end
end
