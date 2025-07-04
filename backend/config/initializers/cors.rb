
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3000', 'localhost:3001' # Sesuaikan dengan asal frontend Anda
    # Atau jika Anda ingin mengizinkan dari semua origin (hanya untuk pengembangan!):
    # origins '*'

    resource '/api/*', # Izinkan semua resource di bawah /api
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options],
      credentials: false # Set true jika Anda menggunakan cookie/session
  end
end