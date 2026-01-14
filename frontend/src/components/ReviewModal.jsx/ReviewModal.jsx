import React, { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./ReviewModal.css";
import { toast } from "react-toastify";

const ReviewModal = ({ foodId, close }) => {
  const { url, token, fetchFoodList } = useContext(StoreContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    if (rating === 0) {
      toast.error("Please select a rating star");
      return;
    }

    try {
      await axios.post(
        `${url}/api/review/add`,
        {
          foodId,
          rating,
          comment,
        },
        { headers: { token } }
      );
      await fetchFoodList();

      toast.success("Review added successfully");
      close();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding review");
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h3>Add Review</h3>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setRating(n)}
              style={{ color: n <= rating ? "gold" : "#ccc" }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your experience"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={submitReview}>Submit</button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
};

export default ReviewModal;
