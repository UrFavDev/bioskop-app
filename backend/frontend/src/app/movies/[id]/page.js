'use client';
import { ROUTES_MANIFEST } from 'next/dist/shared/lib/constants';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function MovieDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Movie not found');
        return res.json();
      })
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-imdb-dark min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-imdb-yellow"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="bg-imdb-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Movie Not Found</h2>
          <button 
            onClick={() => router.push('/movies')}
            className="bg-imdb-yellow hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-imdb-dark min-h-screen py-12">
      <div className="container mx-auto px-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back
        </button>

        <div className="bg-imdb-light rounded-lg overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={movie.poster_url || '/placeholder-movie.jpg'}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:w-2/3">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                <div className="bg-imdb-yellow text-gray-900 font-bold text-lg px-3 py-1 rounded-full flex items-center">
                  <span>★</span>
                  <span className="ml-1">
  {typeof movie.average_rating === 'number'
    ? movie.average_rating.toFixed(1)
    : !isNaN(Number(movie.average_rating))
      ? Number(movie.average_rating).toFixed(1)
      : 'NR'}
</span>
                </div>
              </div>

              <div className="flex items-center mt-4 mb-6">
                <span className="text-gray-400 mr-6">{movie.year}</span>
                <span className="bg-gray-800 text-imdb-yellow px-3 py-1 rounded-full text-sm">
                  {movie.genre}
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">Synopsis</h3>
                <p className="text-gray-300">{movie.synopsis}</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => router.push(`/movies/${movie.id}/edit`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    if (confirm('Are you sure you want to delete this movie?')) {
                      await fetch(`/api/movies/${movie.id}`, { method: 'DELETE' });
                      router.push('/movies');
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}