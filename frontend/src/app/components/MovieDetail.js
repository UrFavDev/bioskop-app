'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import DeleteModal from './components/DeleteModel';

export default function MovieDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      .catch(() => {
        router.push('/movies');
      });
  }, [id]);

  const handleDelete = async () => {
    await fetch(`/api/movies/${movie.id}`, { method: 'DELETE' });
    router.push('/movies');
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!movie) return null;

  return (
    <div className="bg-imdb-dark min-h-screen py-12 px-4">
      {showDeleteModal && (
        <DeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      <div className="max-w-5xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row">
          <img
            src={movie.poster_url || '/placeholder-movie.jpg'}
            alt={movie.title}
            className="w-full md:w-1/3 h-auto object-cover"
          />
          <div className="p-6 md:w-2/3">
            <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
            <p className="text-gray-300 mb-2">{movie.year} • {movie.genre}</p>
            <div className="mb-4">
              <span className="text-imdb-yellow font-bold text-xl">
                ★ {Number(movie.average_rating).toFixed(1) || 'NR'}
              </span>
            </div>
            <p className="text-gray-400 mb-6">{movie.synopsis}</p>

            <div className="flex space-x-4">
              <button
                onClick={() => router.push(`/movies/${movie.id}/edit`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
