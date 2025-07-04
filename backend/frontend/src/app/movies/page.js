'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setFilteredMovies(data); // Awalnya tampilkan semua
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    const result = movies.filter(movie =>
      movie.title.toLowerCase().includes(lower)
    );
    setFilteredMovies(result);
  };

  return (
    <div className="bg-imdb-dark min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-imdb-yellow">All</span> Movies
          </h1>
          <Link
            href="/movies/add"
            className="bg-imdb-yellow hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded"
          >
            + Add New Movie
          </Link>
        </div>

        {/* 🔍 Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Movie List */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-imdb-light rounded-lg aspect-[2/3] animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <Link key={movie.id} href={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center mt-10">
                No movies found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
