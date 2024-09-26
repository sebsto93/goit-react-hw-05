import { useParams, Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../Api";

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
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <nav>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
