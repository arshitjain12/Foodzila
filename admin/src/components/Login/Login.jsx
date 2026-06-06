import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Login = ({ url }) => {
  const navigate = useNavigate();
  const { admin, setAdmin, token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(url + "/api/user/login", data);
      if (response.data.success) {
        if (response.data.role === "admin") {
          setToken(response.data.token);
          setAdmin(true);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("admin", true);
          toast.success("Login Successfully");
          navigate("/add");
        } else {
          toast.error("You are not an admin");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (admin && token) navigate("/add");
  }, []);

  return (
    <div className="login-page">

     
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-logo">
            <i className="ti ti-bowl-spoon"></i>
          </div>
          <h1><em>Food</em>Zila</h1>
          <p>Admin Panel</p>
        </div>

        <div className="login-taglines">
          <div className="login-feat">
            <div className="feat-icon"><i className="ti ti-chart-bar"></i></div>
            <div>
              <span className="feat-t">Manage Orders</span>
              <span className="feat-s">Track and update in real-time</span>
            </div>
          </div>
          <div className="login-feat">
            <div className="feat-icon"><i className="ti ti-tools-kitchen-2"></i></div>
            <div>
              <span className="feat-t">Menu Control</span>
              <span className="feat-s">Add, edit or remove dishes</span>
            </div>
          </div>
          <div className="login-feat">
            <div className="feat-icon"><i className="ti ti-users"></i></div>
            <div>
              <span className="feat-t">Customer Insights</span>
              <span className="feat-s">Monitor orders and feedback</span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="login-right">
        <div className="login-card">

          <div className="login-card-header">
            <span className="sec-pre">Welcome </span>
            <h2>Admin Login</h2>
            <p>Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={onLogin} className="login-form">

           
            <div className="login-field">
              <label className="field-label">
                <i className="ti ti-mail"></i> Email address
              </label>
              <div className="field-input-wrap">
                <input
                  className="field-input"
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder="admin@foodzila.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            
            <div className="login-field">
              <label className="field-label">
                <i className="ti ti-lock"></i> Password
              </label>
              <div className="field-input-wrap pass-wrap">
                <input
                  className="field-input"
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="pass-toggle"
                  onClick={() => setShowPass((p) => !p)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  <i className={`ti ${showPass ? "ti-eye-off" : "ti-eye"}`}></i>
                </button>
              </div>
            </div>

        
            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="ti ti-loader-2 spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="ti ti-login"></i>
                  Sign in to Dashboard
                </>
              )}
            </button>

          </form>

          <p className="login-note">
            <i className="ti ti-shield-lock"></i>
            Admin access only — unauthorized access is prohibited
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;