import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../Api";
import MovieList from "../components/MovieList";
import styles from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchMovies(query)
        .then((response) => setMovies(response.data.results))
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.query.value;
    setSearchParams({ query: searchQuery });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies.</p>;

  return (
    <div className={styles.moviesPage}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          name="query"
          type="text"
          placeholder="Search movies..."
          defaultValue={query}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
