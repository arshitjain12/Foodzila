import { assets } from "../../assets/assets.js";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} className="logo" alt="" />
      <p className="login-condition">Logout</p>
      <p className="login-condition">Login</p>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
