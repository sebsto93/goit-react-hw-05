import { useEffect, useState } from "react";
import { getTrendingMovies } from "../Api";
import MovieList from "../components/MovieList";
import styles from "./HomePage.module.css";

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

  return (
    <div>
      <h2 className={styles.heading}>Trending Today</h2>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
