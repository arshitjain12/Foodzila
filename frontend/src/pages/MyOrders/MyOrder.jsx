import React, { useContext, useEffect, useState } from "react";
import "./MyOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //cancel order
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

    const response = await axios.post(
      url + "/api/order/cancel",
      { orderId },
      { headers: { token } }
    );

    const data = response.data;

    if (data.success) {
      toast.success("Order cancelled successfully");
      fetchOrders();
    } else {
      toast.error(data.message);
    }
  };

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setData(response.data.data);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchOrders(); // first load ye hoga

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // every 5 seconds me ui update

    return () => clearInterval(interval);
  }, [token]);

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

              {order.status === "Cancelled" && (
                <p style={{ color: "red", fontWeight: "600" }}>Cancelled</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
