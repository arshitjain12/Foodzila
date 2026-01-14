import { useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./FoodItem.css";
import StarRating from "../StarRating/StarRating";
import { useNavigate } from "react-router-dom";

const FoodItem = ({ id, name, price, description, image, avgRating }) => {
  // const [itemCount, setItemCount] = useState(0);
  const navigate = useNavigate();

  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
        />
        {!cartItems || !cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />{" "}
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>

          <div
            onClick={() => navigate(`/reviews/${id}`)}
            style={{ cursor: "pointer" }}
          >
            <StarRating value={Math.round(avgRating || 0)} />
          </div>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
