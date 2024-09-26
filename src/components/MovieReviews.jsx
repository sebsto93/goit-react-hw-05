import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../Api"; // Załóżmy, że masz funkcję, która pobiera recenzje

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieReviews(movieId)
      .then((response) => setReviews(response.data.results))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews.</p>;

  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;
