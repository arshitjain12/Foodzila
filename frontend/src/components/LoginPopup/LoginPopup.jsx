import { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const newUrl = url + (currState === "login" ? "/api/user/login" : "/api/user/register");
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success(currState === "login" ? "Login Successfully" : "Account Created!");
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="lp-overlay" onClick={(e) => e.target === e.currentTarget && setShowLogin(false)}>
      <form onSubmit={onLogin} className="lp-card">

        {/* HEADER */}
        <div className="lp-header">
          <div className="lp-header-left">
            <span className="lp-pre">{currState === "login" ? "Welcome back" : "Join us"}</span>
            <h2>{currState === "login" ? "Sign in" : "Create account"}</h2>
          </div>
          <button
            type="button"
            className="lp-close"
            onClick={() => setShowLogin(false)}
            aria-label="Close"
          >
            <i className="ti ti-x"></i>
          </button>
        </div>

    
        <div className="lp-brand">
          <div className="lp-brand-icon">
            <i className="ti ti-bowl-spoon"></i>
          </div>
          <div>
            <div className="lp-brand-name"><em>Food</em>Zila</div>
            <div className="lp-brand-sub">Order fresh, eat happy</div>
          </div>
        </div>

      
        <div className="lp-inputs">

          {currState === "signup" && (
            <div className="lp-field">
              <label className="lp-label">
                <i className="ti ti-user"></i> Full name
              </label>
              <input
                className="lp-input"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your full name"
                required
              />
            </div>
          )}

          <div className="lp-field">
            <label className="lp-label">
              <i className="ti ti-mail"></i> Email address
            </label>
            <input
              className="lp-input"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="lp-field">
            <label className="lp-label">
              <i className="ti ti-lock"></i> Password
            </label>
            <div className="lp-pass-wrap">
              <input
                className="lp-input"
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="lp-eye"
                onClick={() => setShowPass((p) => !p)}
                aria-label="Toggle password"
              >
                <i className={`ti ${showPass ? "ti-eye-off" : "ti-eye"}`}></i>
              </button>
            </div>
          </div>

        </div>

    
        <div className="lp-terms">
          <input type="checkbox" id="lp-check" required />
          <label htmlFor="lp-check">
            I agree to the <span>Terms & Conditions</span>
          </label>
        </div>

        
        <button type="submit" className="lp-submit" disabled={loading}>
          {loading ? (
            <><i className="ti ti-loader-2 lp-spin"></i> Please wait...</>
          ) : currState === "login" ? (
            <><i className="ti ti-login"></i> Sign in</>
          ) : (
            <><i className="ti ti-user-plus"></i> Create account</>
          )}
        </button>

      
        <p className="lp-switch">
          {currState === "login" ? (
            <>Don't have an account? <span onClick={() => setCurrState("signup")}>Sign up</span></>
          ) : (
            <>Already have an account? <span onClick={() => setCurrState("login")}>Sign in</span></>
          )}
        </p>

      </form>
    </div>
  );
};

export default LoginPopup;