import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            required
          />
          <input type="text" placeholder="Last Name" name="lastName" required />
        </div>
        <input type="email" placeholder="Email Address" name="email" required />
        <input type="text" placeholder="Street" name="street" required />
        <div className="multi-fields">
          <input type="text" placeholder="City" name="city" required />
          <input type="text" placeholder="State" name="state" required />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" name="zipcode" required />
          <input type="text" placeholder="Country" name="country" required />
        </div>
        <input type="text" placeholder="Phone" name="phone" required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotals</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
