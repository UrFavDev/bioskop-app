import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-imdb-dark">
      <body className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-imdb-dark border-b border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-imdb-yellow font-bold text-2xl">UNPRI GACOR</span>
                <span className="text-white text-xl font-light">Clone</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="/" className="text-white hover:text-imdb-yellow transition-colors font-medium">Home</a>
                <a href="/movies/add" className="text-white hover:text-imdb-yellow transition-colors font-medium">Add Movie</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-imdb-dark border-t border-gray-700 py-6">
          <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} IMDb Clone - Kelompok FSWD
          </div>
        </footer>
      </body>
    </html>
  );
}