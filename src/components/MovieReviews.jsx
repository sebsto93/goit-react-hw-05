import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: "Bearer b910f513a7d30f1fad82dcd50c1a829e",
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>No reviews available.</p>;

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>
              <strong>{review.author}</strong>: {review.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
