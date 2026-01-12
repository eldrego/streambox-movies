import { useEffect, useState } from 'react';
import { fetchMovies } from '../api/moviesApi';

export default function MoviesApp() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies()
      .then(setMovies)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading movies…</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Movies</h2>

      <div className="grid grid-cols-2 gap-4">
        {movies.map((m) => (
          <div key={m.id} className="border p-2 rounded">
            <div className="font-medium">{m.title}</div>
            <div className="text-sm text-gray-500">{m.vote_average}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
