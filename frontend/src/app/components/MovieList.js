// src/app/components/MovieList.js
export default function MovieList({ movies }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map(movie => (
        <div key={movie.id} className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">{movie.title}</h3>
          <p className="text-gray-600">{movie.year}</p>
        </div>
      ))}
    </div>
  );
}