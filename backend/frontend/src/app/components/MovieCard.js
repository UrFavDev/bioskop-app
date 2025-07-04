export default function MovieCard({ movie }) {
  return (
    <div className="group relative bg-imdb-light rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:z-10">
      {/* Movie Poster */}
      <div className="aspect-[2/3] relative">
        <img
          src={movie.poster_url || '/placeholder-movie.jpg'}
          alt={movie.title}
          className="w-full h-full object-cover transition-opacity group-hover:opacity-70"
          onError={(e) => (e.target.src = '/placeholder-movie.jpg')}
        />

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-imdb-yellow text-gray-900 font-bold text-sm px-2 py-1 rounded-full flex items-center">
          <span>★</span>
          <span className="ml-1">
            {movie.average_rating != null && !isNaN(Number(movie.average_rating))
              ? Number(movie.average_rating).toFixed(1)
              : 'NR'}
          </span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold truncate">{movie.title}</h3>
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-gray-400">{movie.year}</span>
          <span className="text-imdb-yellow">{movie.genre}</span>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button className="bg-imdb-yellow hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          View Details
        </button>
      </div>
    </div>
  );
}
