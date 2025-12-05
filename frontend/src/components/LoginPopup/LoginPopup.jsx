import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("login");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "login" ? (
            <></>
          ) : (
            <input type="text" placeholder="your name" required />
          )}
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="password" required />
        </div>
        <button>{currState === "signup" ? "create account" : "login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms and condition.</p>
        </div>
        {currState === "login" ? (
          <p>
            Create a New Account
            <span onClick={() => setCurrState("signup")}> Click here </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("login")}> Login here </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
