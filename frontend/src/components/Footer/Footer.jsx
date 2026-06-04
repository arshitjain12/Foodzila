import "./footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">

        {/* LEFT */}
          <div className="footer-content-left">
            <img className="footer-img" src={assets.titlelogo} alt="FoodZila" />
            <p>
              We are committed to delivering quality food made with fresh
              ingredients and authentic flavors. Every dish is carefully prepared
              to satisfy your cravings and bring you a delightful dining
            experience you can trust.
          </p>
          <div className="footer-social-icons">
            <a href="#" aria-label="Facebook">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li><i className="ti ti-home"></i> Home</li>
            <li><i className="ti ti-user-circle"></i> About Us</li>
            <li><i className="ti ti-truck-delivery"></i> Delivery</li>
            <li><i className="ti ti-shield-lock"></i> Privacy Policy</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>
              <i className="ti ti-phone"></i>
              +91-8871807465
            </li>
            <li>
              <i className="ti ti-mail"></i>
              arshitjain7@gmail.com
            </li>
            <li>
              <i className="ti ti-map-pin"></i>
              Bhopal, Madhya Pradesh
            </li>
          </ul>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2026 FoodZila.com — All rights reserved</p>
        <p className="footer-made">Made with ♥ in India</p>
      </div>
    </div>
  );
};

export default Footer;