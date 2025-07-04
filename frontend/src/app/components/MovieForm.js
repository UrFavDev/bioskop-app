export default function MovieForm({ movie, onSubmit }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">
        {movie.id ? 'Edit Movie' : 'Add New Movie'}
      </h1>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Title</label>
          <input
            type="text"
            defaultValue={movie?.title || ''}
            className="w-full bg-imdb-light border border-gray-700 rounded px-4 py-2 text-white"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Year</label>
            <input
              type="number"
              defaultValue={movie?.year || ''}
              className="w-full bg-imdb-light border border-gray-700 rounded px-4 py-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Genre</label>
            <input
              type="text"
              defaultValue={movie?.genre || ''}
              className="w-full bg-imdb-light border border-gray-700 rounded px-4 py-2 text-white"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Poster URL</label>
          <input
            type="url"
            defaultValue={movie?.poster_url || ''}
            className="w-full bg-imdb-light border border-gray-700 rounded px-4 py-2 text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Synopsis</label>
          <textarea
            defaultValue={movie?.synopsis || ''}
            rows="5"
            className="w-full bg-imdb-light border border-gray-700 rounded px-4 py-2 text-white"
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-imdb-yellow text-imdb-dark px-6 py-2 rounded font-bold hover:bg-yellow-500"
        >
          {movie.id ? 'Update Movie' : 'Add Movie'}
        </button>
      </form>
    </div>
  );
}