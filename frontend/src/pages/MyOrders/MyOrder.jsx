import React, { useContext, useEffect, useState } from "react";
import "./MyOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ReviewModal from "../../components/ReviewModal.jsx/ReviewModal";
import ItemSelectionModal from "../../components/ItemSelectionModal/ItemSelectionModal";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const [pendingItems, setPendingItems] = useState([]);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);

  const cancelOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Cancel Order?",
      text: "You want to cancel order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axios.post(
        url + "/api/order/cancel",
        { orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Order cancelled successfully");
        fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error cancelling order");
    }
  };

  const handleReview = async (order) => {
    try {
      const res = await axios.post(
        `${url}/api/review/pending`,
        { orderId: order._id },
        { headers: { token } }
      );

      const pending = res.data.pending;

      if (pending.length === 0) {
        Swal.fire("All items already reviewed");
        return;
      }

      if (pending.length === 1) {
        setSelectedFoodId(pending[0].food);
        setShowReviewModal(true);
      } else {
        setPendingItems(pending);
        setShowSelectionModal(true);
      }
    } catch (error) {
      toast.error("Error fetching pending reviews");
      console.error(error);
    }
  };

  const handleItemSelect = (foodId) => {
    setShowSelectionModal(false);
    setSelectedFoodId(foodId);
    setShowReviewModal(true);
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching orders");
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchOrders();

    if (!showReviewModal && !showSelectionModal) {
      const interval = setInterval(fetchOrders, 4000);
      return () => clearInterval(interval);
    }
  }, [token, showReviewModal, showSelectionModal]);

  return (
    <div className="my-orders">
      <h2>Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  } else {
                    return item.name + " X " + item.quantity + ",";
                  }
                })}
              </p>
              <p>₹{order.amount}.00</p>
              <p>items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b> {order.status}</b>
              </p>
              {order.status === "Food Processing" && (
                <button
                  className="cancel-btn"
                  onClick={() => cancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}

              {order.status === "Delivered" && (
                <button
                  className="review-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReview(order);
                  }}
                >
                  Add Review
                </button>
              )}

              {order.status === "Cancelled" && (
                <p style={{ color: "red", fontWeight: "600" }}>Cancelled</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Single Review Modal */}
      {showReviewModal && (
        <ReviewModal
          foodId={selectedFoodId}
          close={() => {
            setShowReviewModal(false);
            fetchOrders();
          }}
        />
      )}

      {showSelectionModal && (
        <ItemSelectionModal
          items={pendingItems}
          onSelect={handleItemSelect}
          close={() => setShowSelectionModal(false)}
        />
      )}
    </div>
  );
};

export default MyOrders;
