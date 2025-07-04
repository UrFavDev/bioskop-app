# bioskop-app/app/controllers/api/v1/movies_controller.rb

module Api
  module V1
    class MoviesController < ApplicationController
      
    
      # GET /api/v1/movies
      def index
        @movies = Movie.all
        render json: @movies
      end

      # GET /api/v1/movies/:id
      def show
        @movie = Movie.find(params[:id])
        render json: @movie
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Movie not found' }, status: :not_found
      end

      # POST /api/v1/movies
      def create
        @movie = Movie.new(movie_params)

        if @movie.save
          render json: @movie, status: :created
        else
          render json: { errors: @movie.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/movies/:id
      def update
        @movie = Movie.find(params[:id])
        if @movie.update(movie_params)
          render json: @movie
        else
          render json: { errors: @movie.errors.full_messages }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Movie not found' }, status: :not_found
      end

      # DELETE /api/v1/movies/:id
      def destroy
        @movie = Movie.find(params[:id])
        @movie.destroy
        head :no_content # Mengembalikan status 204 No Content
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Movie not found' }, status: :not_found
      end

      private

      def movie_params
        # PASTIKAN SEMUA FIELD YANG AKAN ANDA KIRIM DARI FRONTEND ADA DI SINI
        params.require(:movie).permit(:title, :year, :genre, :poster_url, :synopsis, :average_rating)
      end
    end
  end
end