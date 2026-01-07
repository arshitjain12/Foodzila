import "./footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="footer-img" src={assets.titlelogo} alt="" />
          <p>
            We are committed to delivering quality food made with fresh
            ingredients and authentic flavors. Every dish is carefully prepared
            to satisfy your cravings and bring you a delightful dining
            experience you can trust.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>
              <i class="fa-solid fa-house"></i> Home
            </li>
            <li>
              <i class="fa-solid fa-circle-user"></i> About Us
            </li>
            <li>
              <i class="fa-solid fa-truck"></i> Delivery
            </li>
            <li>
              <i class="fa-regular fa-copyright"></i> Privacy policy
            </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>
              <i class="fa-solid fa-phone"></i> +91-8871807465
            </li>
            <li>
              <i class="fa-solid fa-box"></i>
              arshitjain7@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        CopyRight 2026 FOODZILA.COM -All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
