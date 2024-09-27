import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../Api";
import styles from "./MovieCast.module.css";
import ClipLoader from "react-spinners/ClipLoader";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieCast(movieId)
      .then((response) => setCast(response.data.cast))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color={"#123abc"} loading={loading} size={150} />
      </div>
    );
  }
  if (error) return <p>Error loading casts.</p>;

  return (
    <div className={styles.castList}>
      <h3>Cast</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className={styles.castImage}
            />
            <span className={styles.actorName}>{actor.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
