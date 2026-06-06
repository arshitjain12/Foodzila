import React, { useState, useEffect, useContext } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const statusConfig = {
  "Food Processing": { color: "amber",  icon: "ti-clock",           label: "Processing"    },
  "Out for delivery": { color: "blue",  icon: "ti-truck-delivery",  label: "Out for delivery" },
  "Delivered":        { color: "green", icon: "ti-circle-check",    label: "Delivered"     },
  "Cancelled":        { color: "red",   icon: "ti-circle-x",        label: "Cancelled"     },
};

const Orders = ({ url }) => {
  const navigate  = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState("All");
  const [pulse,   setPulse]   = useState(false);

  const fetchAllOrder = async (silent = false) => {
    if (!silent) setLoading(true);
    const response = await axios.get(url + "/api/order/list", {
      headers: { token },
    });
    if (response.data.success) {
      setOrders(response.data.data.reverse());
      if (silent) { setPulse(true); setTimeout(() => setPulse(false), 600); }
    }
    setLoading(false);
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(
      url + "/api/order/status",
      { orderId, status: event.target.value },
      { headers: { token } }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrder(true);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (!admin || !token) {
      toast.error("Please Login First");
      navigate("/");
      return;
    }
    fetchAllOrder();
    const interval = setInterval(() => fetchAllOrder(true), 5000);
    return () => clearInterval(interval);
  }, [admin, token]);

  const statuses = ["All", "Food Processing", "Out for delivery", "Delivered", "Cancelled"];

  const filtered = filter === "All"
    ? orders
    : orders.filter((o) => o.status === filter);

  const countOf = (s) => orders.filter((o) => o.status === s).length;

  return (
    <div className="orders-page">

  
      <div className="orders-header">
        <div>
          <span className="sec-pre">Admin Panel</span>
          <h1>Orders</h1>
        </div>
    
      </div>

  
      <div className="order-stats">
        <div className="ostat-card">
          <span className="ostat-n">{orders.length}</span>
          <span className="ostat-l">Total orders</span>
        </div>
        <div className="ostat-card">
          <span className="ostat-n amber">{countOf("Food Processing")}</span>
          <span className="ostat-l">Processing</span>
        </div>
        <div className="ostat-card">
          <span className="ostat-n blue">{countOf("Out for delivery")}</span>
          <span className="ostat-l">Out for delivery</span>
        </div>
        <div className="ostat-card">
          <span className="ostat-n green">{countOf("Delivered")}</span>
          <span className="ostat-l">Delivered</span>
        </div>
        <div className="ostat-card">
          <span className="ostat-n red">{countOf("Cancelled")}</span>
          <span className="ostat-l">Cancelled</span>
        </div>
      </div>


      <div className="order-filters">
        {statuses.map((s) => (
          <button
            key={s}
            className={`filter-chip ${filter === s ? "on" : ""}`}
            onClick={() => setFilter(s)}
          >
            {s === "All" ? `All (${orders.length})` : `${s} (${countOf(s)})`}
          </button>
        ))}
      </div>

  
      {loading && (
        <div className="orders-list">
          {[1,2,3].map((i) => (
            <div key={i} className="order-skeleton">
              <div className="sk sk-icon"></div>
              <div className="sk-body">
                <div className="sk sk-line wide"></div>
                <div className="sk sk-line mid"></div>
                <div className="sk sk-line short"></div>
              </div>
              <div className="sk sk-select"></div>
            </div>
          ))}
        </div>
      )}

   
      {!loading && filtered.length === 0 && (
        <div className="orders-empty">
          <span>📦</span>
          <p>{filter === "All" ? "No orders yet" : `No "${filter}" orders`}</p>
        </div>
      )}

  
      {!loading && (
        <div className="orders-list">
          {filtered.map((order) => {
            const sc = statusConfig[order.status] || statusConfig["Food Processing"];
            return (
              <div key={order._id} className={`order-card status-${sc.color}`}>

                {/* LEFT — parcel icon */}
                <div className={`order-icon-box c-${sc.color}`}>
                  <i className={`ti ${sc.icon}`}></i>
                </div>

          
                <div className="order-details">

              
                  <p className="order-items-text">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.name}
                        <span className="item-qty"> ×{item.quantity}</span>
                        {i < order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>

               
                  <div className="order-customer">
                    <i className="ti ti-user" aria-hidden="true"></i>
                    <span>
                      {order.address.firstName} {order.address.lastName}
                    </span>
                    <span className="dot-sep">·</span>
                    <i className="ti ti-phone" aria-hidden="true"></i>
                    <span>{order.address.phone}</span>
                  </div>

               
                  <div className="order-address">
                    <i className="ti ti-map-pin" aria-hidden="true"></i>
                    <span>
                      {order.address.street}, {order.address.city},{" "}
                      {order.address.state}, {order.address.country} –{" "}
                      {order.address.zipcode}
                    </span>
                  </div>

                </div>

           
                <div className="order-right">
                  <div className="order-meta">
                    <span className="order-items-count">
                      <i className="ti ti-basket" aria-hidden="true"></i>
                      {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </span>
                    <span className="order-amount">₹{order.amount}</span>
                  </div>

                  {order.status === "Cancelled" ? (
                    <span className="status-pill cancelled">
                      <i className="ti ti-circle-x"></i> Cancelled
                    </span>
                  ) : (
                    <select
                      className={`status-select sel-${sc.color}`}
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default Orders;