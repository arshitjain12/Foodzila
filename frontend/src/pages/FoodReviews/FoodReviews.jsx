import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./FoodReviews.css";
import { StoreContext } from "../../context/StoreContext";

const FoodReviews = () => {
  const { foodId } = useParams();
  const { url } = useContext(StoreContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/api/review/food/${foodId}`)
      .then((res) => setReviews(res.data.reviews));
  }, [foodId, url]);

  return (
    <div className="reviews-page">
      <h2>Customer Reviews</h2>

      {reviews.length === 0 && <p>No reviews yet</p>}

      {reviews.map((r) => (
        <div key={r._id} className="review-card">
          <div className="review-header">
            <b>{r.user?.name || "User"}</b>
            <span className="stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={n <= r.rating ? "filled" : ""}>
                  ★
                </span>
              ))}
            </span>
          </div>

          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default FoodReviews;
