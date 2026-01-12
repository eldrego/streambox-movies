import axios from 'axios';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 8000,
});

export async function fetchMovies() {
  const res = await moviesApi.get('/movie/popular', {
    params: { api_key: apiKey },
  });

  return res.data.results;
}
