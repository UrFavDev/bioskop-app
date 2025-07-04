'use client';

import { useState, useEffect } from 'react';
import styles from './HeroCarousel.module.css';

export default function HeroCarousel({ movies = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movies.length) {
    return (
      <div className={`${styles.heroContainer} bg-gray-800 flex items-center justify-center text-white`}>
        Loading Carousel...
      </div>
    );
  }

  const movie = movies[current];

  return (
    <div className={`${styles.heroContainer}`}>
      <img
        src={movie.poster_url || '/placeholder-movie.jpg'}
        alt={movie.title}
        className={styles.heroImage}
        onError={(e) => (e.target.src = '/placeholder-movie.jpg')}
      />
      <div className={styles.heroOverlay}></div>
      <h2 className={styles.heroTitle}>{movie.title}</h2>
    </div>
  );
}
