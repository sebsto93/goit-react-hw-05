import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../Api";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading cast.</p>;

  return (
    <div>
      <h3>Cast</h3>
      <ul>
        {cast.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
