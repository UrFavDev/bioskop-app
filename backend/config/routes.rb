# config/routes.rb

Rails.application.routes.draw do
  # ... rute lain jika ada

  namespace :api do
    namespace :v1 do
      resources :movies 
    end
  end
end