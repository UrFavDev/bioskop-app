'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditMoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`);
        const data = await res.json();
        setFormData({
          title: data.title || '',
          genre: data.genre || '',
          year: data.year || '',
          rating: data.average_rating || '',
          poster_url: data.poster_url || '',
          synopsis: data.synopsis || '',
        });
      } catch (err) {
        console.error('Failed to fetch movie data:', err);
        setError('Failed to load movie data.');
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const dataToSend = {
        ...formData,
        average_rating: parseFloat(formData.rating),
      };
      delete dataToSend.rating;

      const res = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie: dataToSend }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData?.errors?.join(', ') || 'Failed to update movie.');
        return;
      }

      router.push(`/movies/${id}`);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  if (!formData) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Edit Movie</h1>
      {error && <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {['title', 'genre', 'year', 'rating', 'poster_url'].map((field) => (
          <div className="mb-4" key={field}>
            <label htmlFor={field} className="block text-white text-sm font-bold mb-2">
              {field === 'poster_url' ? 'Poster URL' : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'year' || field === 'rating' ? 'number' : 'text'}
              step={field === 'rating' ? '0.1' : undefined}
              min={field === 'rating' ? '0' : undefined}
              max={field === 'rating' ? '10' : undefined}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              required={field !== 'poster_url'}
            />
          </div>
        ))}
        <div className="mb-6">
          <label htmlFor="synopsis" className="block text-white text-sm font-bold mb-2">Synopsis</label>
          <textarea
            id="synopsis"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
}
