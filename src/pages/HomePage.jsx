import { useEffect, useState } from "react";
import { getTrendingMovies } from "../Api";
import MovieList from "../components/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTrendingMovies()
      .then((response) => setMovies(response.data.results))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies.</p>;

  return <MovieList movies={movies} />;
}

export default HomePage;
