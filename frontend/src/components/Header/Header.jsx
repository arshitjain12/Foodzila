import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      
      {/* LEFT SIDE */}
      <div className="header-left">
        <div className="hero-tag">
          <span className="tag-dot"></span> Now delivering in Bhopal
        </div>
        <h2>Cravings deserve<br /><em>real</em> flavour.</h2>
        <p>
          Chef-crafted dishes, fresh ingredients, delivered hot to your door.
          No compromise, ever.
        </p>
        <div className="hero-btns">
          <button className="btn-main">Explore Menu</button>
          <button className="btn-ghost">How it works</button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-n">50k+</span>
            <span className="stat-l">Customers</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-n">200+</span>
            <span className="stat-l">Dishes</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-n">4.9 ★</span>
            <span className="stat-l">Rating</span>
          </div>
        </div>
      </div>

     
      <div className="header-right">
        <div className="plate-wrap">
          <div className="plate-badge">Free delivery</div>
          <div className="plate-circle">
            <div className="plate-inner">
              <svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
                <circle cx="65" cy="65" r="58" fill="#2a2a2a"/>
                <circle cx="65" cy="65" r="46" fill="#333"/>
                <ellipse cx="65" cy="72" rx="28" ry="8" fill="#1a1a1a" opacity="0.5"/>
                <rect x="40" y="50" width="50" height="30" rx="6" fill="#FF4500" opacity="0.18"/>
                <rect x="46" y="56" width="18" height="14" rx="4" fill="#FF6535"/>
                <rect x="68" y="54" width="14" height="16" rx="4" fill="#FF8C00"/>
                <rect x="50" y="62" width="30" height="10" rx="3" fill="#FF4500" opacity="0.7"/>
                <circle cx="55" cy="58" r="3" fill="#fff" opacity="0.2"/>
                <circle cx="75" cy="60" r="2" fill="#fff" opacity="0.15"/>
                <circle cx="64" cy="55" r="2.5" fill="#FFB347" opacity="0.8"/>
                <ellipse cx="65" cy="80" rx="20" ry="5" fill="#f5e6d0" opacity="0.08"/>
              </svg>
            </div>
          </div>
          <div className="float-card">
            <div className="fc-icon">🕐</div>
            <div>
              <div className="fc-t">Avg delivery</div>
              <div className="fc-s">28 mins</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;