import { menu_list } from "../../assets/frontend_assets/assets";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory }) => {
  const categoryEmoji = {
    "Salad": "",
    "Rolls": "",
    "Deserts": "",
    "Sandwich": "",
    "Cake": "",
    "Pure Veg": "",
    "Pasta": "",
    "Noodles": "",
  };

  return (
    <div className="explore-menu" id="explore-menu">

      <div className="explore-menu-header">
        <span className="sec-pre">Browse by type</span>
        <h1>What are you craving?</h1>
        <p className="explore-menu-text">
          Thoughtfully curated categories to match every craving and occasion.
        </p>
      </div>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            className={`cat-chip ${category === item.menu_name ? "active" : ""}`}
          >
            <span className="cat-emoji">
              {categoryEmoji[item.menu_name] || ""}
            </span>
            <span className="cat-label">{item.menu_name}</span>
          </div>
        ))}
      </div>

      <hr className="explore-divider" />
    </div>
  );
};

export default ExploreMenu;