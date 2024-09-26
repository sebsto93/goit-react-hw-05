import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../Api"; // Upewnij się, że masz tę funkcję
import styles from "./MovieDetailsPage.module.css"; // Importuj style, jeśli je używasz

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId)
      .then((response) => setMovie(response.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movie details.</p>;

  return (
    <div className={styles.movieDetails}>
      <Link to="/" className={styles.goBack}>
        &larr; Go back
      </Link>
      <div className={styles.movieInfo}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={styles.movieText}>
          <h2>{movie.title}</h2>
          <p>User Score: {movie.vote_average * 10}%</p>
          <p>Overview: {movie.overview}</p>
          <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
