import "./AppDownload.css";
import { assets } from "../../assets/frontend_assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">

      <div className="app-download-inner">

        {/* LEFT — TEXT */}
        <div className="app-download-left">
          <span className="sec-pre">Mobile app</span>
          <h2>For a better experience,<br />download the <em>FoodZila</em> app</h2>
          <p>Live order tracking, exclusive app-only deals, and one-tap reorder — all in your pocket.</p>

          <div className="app-feats">
            <div className="app-feat">
              <span className="feat-dot"></span>
              Real-time order tracking
            </div>
            <div className="app-feat">
              <span className="feat-dot"></span>
              Exclusive app-only deals
            </div>
            <div className="app-feat">
              <span className="feat-dot"></span>
              One-tap reorder
            </div>
          </div>

          <div className="app-download-platforms">
            <img src={assets.play_store} alt="Get it on Google Play" />
            <img src={assets.app_store} alt="Download on App Store" />
          </div>
        </div>

        {/* RIGHT — PHONE MOCKUP */}
        <div className="app-download-right">
          <div className="phone-mockup">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="phone-logo"><em>Food</em>Zila</div>
              <div className="phone-line"></div>
              <div className="phone-items">
                <div className="phone-item hi"></div>
                <div className="phone-item"></div>
                <div className="phone-item hi short"></div>
                <div className="phone-item"></div>
                <div className="phone-item hi mid"></div>
              </div>
              <div className="phone-card">
                <div className="phone-card-dot"></div>
                <div className="phone-card-text">
                  <div className="pct-top"></div>
                  <div className="pct-bot"></div>
                </div>
                <div className="phone-card-price">₹220</div>
              </div>
            </div>
            <div className="phone-home-bar"></div>
          </div>

          {/* float badge */}
          <div className="app-float-badge">
            <span className="badge-icon"> </span>
            <div>
              <div className="badge-t">50k+ Downloads</div>
              <div className="badge-s">4.9 ★ rated</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AppDownload;