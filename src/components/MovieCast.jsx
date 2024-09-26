import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: "Bearer b910f513a7d30f1fad82dcd50c1a829e",
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        setError("Failed to fetch cast data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((member) => (
          <li key={member.cast_id}>
            <p>
              <strong>{member.name}</strong> as {member.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
