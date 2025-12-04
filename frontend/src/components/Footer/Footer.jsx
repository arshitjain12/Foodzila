import "./footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer ">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="footer-img" src={assets.titlelogo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            ipsa obcaecati vel quia commodi quaerat corporis illo, facere
            architecto quidem explicabo tenetur temporibus eum repellendus!
            Illum quisquam repellendus accusantium necessitatibus!
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
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+91-8871807465</li>
            <li>contact :arshitjain7@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        CopyRight 2025 FOODZILA.COM -All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
