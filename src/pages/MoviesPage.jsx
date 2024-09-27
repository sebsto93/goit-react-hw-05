import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../Api";
import MovieList from "../components/MovieList";
import styles from "./MoviesPage.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import useDebounce from "../hooks/useDebounce";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      searchMovies(debouncedQuery)
        .then((response) => {
          if (response.data.results.length === 0) {
            throw new Error("No movies found for this query.");
          }
          setMovies(response.data.results);
        })
        .catch((error) => {
          if (!error.response) {
            setError("Network error. Please check your internet connection.");
          } else if (error.response.status === 404) {
            setError("No results found for this query.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        })
        .finally(() => setLoading(false));
    } else {
      setMovies([]);
    }
  }, [debouncedQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.query.value;
    setSearchParams({ query: searchQuery });
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color={"#123abc"} size={150} />
      </div>
    );
  }
  if (error) {
    return <p className={styles.errorMessage}>{error}</p>;
  }

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
