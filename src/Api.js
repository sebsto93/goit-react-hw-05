import axios from "axios";

const API_KEY = "b910f513a7d30f1fad82dcd50c1a829e";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTEwZjUxM2E3ZDMwZjFmYWQ4MmRjZDUwYzFhODI5ZSIsIm5iZiI6MTcyNzM2ODM4Mi4yMDgwOTcsInN1YiI6IjY2ZjU4NGJkZTE0YTNjOGU2MjczZmYyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HtxbFoPXI7_2PFB0I7MMEJ-U1k4Ap9kuSDcDpLPI_Rw",
  },
});

export const getTrendingMovies = () => api.get("/trending/movie/day");
export const searchMovies = (query) => api.get(`/search/movie?query=${query}`);
export const getMovieDetails = (id) => api.get(`/movie/${id}`);
export const getMovieCredits = (id) => api.get(`/movie/${id}/credits`);
export const getMovieReviews = (id) => api.get(`/movie/${id}/reviews`);
export const getMovieCast = (id) => api.get(`/movie/${id}/credits`);
