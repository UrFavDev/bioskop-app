// frontend/src/app/movies/add/page.js

'use client'; // Penting untuk menggunakan React hooks dan event handlers di komponen klien

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddMoviePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    // Penting: rating disimpan sebagai string karena input type="number" mengembalikan string.
    // Konversi ke number saat mengirim ke backend jika diperlukan.
    rating: '',
    poster_url: '',
    synopsis: '',
  });
  const [error, setError] = useState(null);

  // Mengelola perubahan pada input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Mengelola submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      
      const dataToSend = {
        ...formData,
        average_rating: parseFloat(formData.rating) 
      };
      delete dataToSend.rating; 


      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
        body: JSON.stringify(dataToSend),
      });

     
      if (!res.ok) {
      
      const clonedRes = res.clone(); 

      let errorBody;
      try {
        errorBody = await res.json();
      } catch (jsonErr) {
       
        errorBody = await clonedRes.text(); 
      }

      console.error('Failed to add movie:', res.status, errorBody);

      if (typeof errorBody === 'object' && errorBody.errors) {
        setError(errorBody.errors.join(', '));
      } else if (typeof errorBody === 'string') {
       
        setError(`Error: ${res.status} - ${errorBody.substring(0, 200)}...`);
      } else {
        setError(`Failed to add movie with status: ${res.status}`);
      }
      return;
    }

    
    const data = await res.json();
    console.log('Movie added successfully:', data);
    router.push('/');
  } catch (err) {
    console.error('An unexpected error occurred while adding movie:', err);
    setError('An unexpected error occurred. Please try again.');
  }
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Add New Movie</h1>
      {/* Menampilkan pesan error jika ada */}
      {error && <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Input Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-white text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Movie Title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            required // Membuat field ini wajib diisi
          />
        </div>

        {/* Input Genre */}
        <div className="mb-4">
          <label htmlFor="genre" className="block text-white text-sm font-bold mb-2">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Action, Sci-Fi, Drama"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            required
          />
        </div>

        {/* Input Year */}
        <div className="mb-4">
          <label htmlFor="year" className="block text-white text-sm font-bold mb-2">Year</label>
          <input
            type="number" // Menggunakan type="number" untuk tahun
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g., 2023"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            required
          />
        </div>

        {/* Input Rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-white text-sm font-bold mb-2">Rating (0-10)</label>
          <input
            type="number" // Menggunakan type="number" untuk rating
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="e.g., 8.5"
            step="0.1" // Mengizinkan nilai desimal
            min="0"
            max="10"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            required
          />
        </div>

        {/* Input Poster URL */}
        <div className="mb-4">
          <label htmlFor="poster_url" className="block text-white text-sm font-bold mb-2">Poster URL</label>
          <input
            type="text"
            id="poster_url"
            name="poster_url"
            value={formData.poster_url}
            onChange={handleChange}
            placeholder="https://example.com/poster.jpg"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            // Tidak wajib, tapi Anda bisa tambahkan jika ingin poster selalu ada
          />
        </div>

        {/* Textarea Synopsis */}
        <div className="mb-6">
          <label htmlFor="synopsis" className="block text-white text-sm font-bold mb-2">Synopsis</label>
          <textarea
            id="synopsis"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            placeholder="A brief summary of the movie..."
            rows="4" // Menentukan tinggi textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
}