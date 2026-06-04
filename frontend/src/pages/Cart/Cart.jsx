import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list, cartItems, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const cartList = food_list.filter((item) => cartItems[item._id] > 0);

  return (
    <div className="cart">

      {/* PAGE HEADER */}
      <div className="cart-header">
        <span className="sec-pre">Your order</span>
        <h1>Cart</h1>
      </div>

      {/* EMPTY STATE */}
      {cartList.length === 0 ? (
        <div className="cart-empty">
          <span className="cart-empty-icon">🛒</span>
          <p>Your cart is empty</p>
          <button onClick={() => navigate("/")}>Browse Menu</button>
        </div>
      ) : (
        <>
          {/* ITEMS TABLE */}
          <div className="cart-items">
            <div className="cart-items-title">
              
              <p>Name</p>
              <p>Price</p>
              <p>Qty</p>  
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr className="cart-divider" />

            {cartList.map((item) => (
              <div key={item._id}>
                <div className="cart-items-title cart-items-row">
                  
                  <p className="cart-item-name">{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>
                    <span className="qty-badge">{cartItems[item._id]}</span>
                  </p>
                  <p className="cart-item-total">
                    ₹{item.price * cartItems[item._id]}
                  </p>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item._id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <i className="ti ti-x"></i>
                  </button>
                </div>
                <hr className="cart-divider" />
              </div>
            ))}
          </div>

          {/* BOTTOM */}
          <div className="cart-bottom">

            {/* TOTALS */}
            <div className="cart-total">
              <h2>Order Summary</h2>
              <div className="cart-total-rows">
                <div className="cart-total-row">
                  <p>Subtotal</p>
                  <p>₹{getTotalCartAmount()}</p>
                </div>
                <hr className="cart-divider" />
                <div className="cart-total-row">
                  <p>Delivery fee</p>
                  <p className={getTotalCartAmount() === 0 ? "" : "delivery-fee"}>
                    {getTotalCartAmount() === 0 ? "₹0" : "₹50"}
                  </p>
                </div>
                <hr className="cart-divider" />
                <div className="cart-total-row total-row">
                  <b>Total</b>
                  <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 15}</b>
                </div>
              </div>
              <button
                className="checkout-btn"
                onClick={() => navigate("/order")}
              >
                Proceed to Checkout
                <i className="ti ti-arrow-right"></i>
              </button>
            </div>

            {/* PROMO */}
            <div className="cart-promocode">
              <h2>Promo Code</h2>
              <p>Have a coupon? Enter it below for a discount.</p>
              <div className="cart-promocode-input">
                <i className="ti ti-tag"></i>
                <input type="text" placeholder="Enter promo code" />
                <button>Apply</button>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Cart;