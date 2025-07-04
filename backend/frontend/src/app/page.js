'use client';
import { useState, useEffect } from 'react';
import HeroCarousel from './components/HeroCarousel';
import Link from 'next/link';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  const popular = [...movies].sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0)).slice(0, 5);

  return (
    <div className="bg-imdb-dark min-h-screen">
      <HeroCarousel movies={popular} />
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-imdb-yellow">Most Popular</span> Movies
          </h1>
          <Link href="/movies" className="text-white hover:underline mt-4 block text-center">
  See All Movies →
</Link>

        </div>
        {/* tampilkan MovieCard dari top 5 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popular.map((movie) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <div>
                <img src={movie.poster_url || '/placeholder-movie.jpg'} alt={movie.title} className="rounded" />
                <h3 className="text-white mt-2 truncate">{movie.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
