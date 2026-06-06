import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, admin, setAdmin, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken("");
    setAdmin(false);
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="navbar">


      <div className="navbar-left">
       
        <div className="navbar-brand">
          <span className="brand-name"><em>Food</em>Zila</span>
          <span className="brand-tag">Admin Panel</span>
        </div>
      </div>

      
      <div className="navbar-right">

     
        {token && admin && (
          <div className="admin-badge">
            <span className="badge-dot"></span>
            Admin
          </div>
        )}

       
        {token && admin ? (
          <button className="navbar-btn logout-btn" onClick={logout}>
            <i className="ti ti-logout"></i>
            Logout
          </button>
        ) : (
          <button className="navbar-btn login-btn" onClick={() => navigate("/")}>
            <i className="ti ti-login"></i>
            Login
          </button>
        )}

     
        <div className="navbar-avatar">
          <img src={assets.profile_image} alt="profile" />
          <span className="avatar-status"></span>
        </div>

      </div>
    </div>
  );
};

export default Navbar;