import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="navbar">

      {/* LOGO */}
      <Link to="/">
        <img src={assets.titlelogo} alt="FoodZila" className="logo" />
      </Link>

      {/* NAV LINKS */}
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          home
        </Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>
          menu
        </a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>
          mobile app
        </a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>
          contact us
        </a>
      </ul>

      {/* RIGHT SECTION */}
      <div className="navbar-right">

        {/* Search icon */}
        <div className="icon-btn">
          <img src={assets.search_icon} alt="search" />
        </div>

        
        <div className="navbar-search-icon icon-btn">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

     
        {!token ? (
          <button className="signin-btn" onClick={() => setShowLogin(true)}>
            sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <div className="profile-avatar">
              <img src={assets.profile_icon} alt="profile" />
            </div>
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>My Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;