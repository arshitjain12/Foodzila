// View reviews popup me use...... nhi kiya
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ReviewListModal.css";

// const ReviewListModal = ({ foodId, close }) => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/review/food/${foodId}`)
//       .then((res) => setReviews(res.data.reviews));
//   }, [foodId]);

//   return (
//     <div className="modal-bg">
//       <div className="modal-box">
//         <h3>Reviews</h3>

//         {reviews.length === 0 && <p>Noooooo reviews yet</p>}

//         {reviews.map((r) => (
//           <div key={r._id} className="review-row">
//             <b>{r.user?.name}</b>
//             <div className="stars">
//               {[1, 2, 3, 4, 5].map((n) => (
//                 <span key={n} className={n <= r.rating ? "filled" : ""}>
//                   ★
//                 </span>
//               ))}
//             </div>
//             <p>{r.comment}</p>
//           </div>
//         ))}

//         <button onClick={close}>cccccccccccclose</button>
//       </div>
//     </div>
//   );
// };

// export default ReviewListModal;
