import React, { useEffect, useState, useContext } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const categoryEmoji = {
  Salad: "🥗", Rolls: "🌯", Deserts: "🍰",
  Sandwich: "🥪", Cake: "🎂", "Pure Veg": "🥦",
  Pasta: "🍝", Noodles: "🍜",
};

const List = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const fetchList = async () => {
    setLoading(true);
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching list");
    }
    setLoading(false);
  };

  const removeFood = async (foodId) => {
    setDeletingId(foodId);
    try {
      const response = await axios.delete(`${url}/api/food/remove/${foodId}`, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
    setDeletingId(null);
  };

  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
    fetchList();
  }, []);

  const categories = ["All", ...Object.keys(categoryEmoji)];

  const filtered = list.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || item.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="list-page">

      
      <div className="list-header">
        <div>
          <span className="sec-pre">Menu Management</span>
          <h1>All Food Items</h1>
        </div>
        <div className="list-meta">
          <span className="total-badge">{list.length} items</span>
        </div>
      </div>

     
      <div className="list-controls">
        <div className="list-search">
          <i className="ti ti-search"></i>
          <input
            type="text"
            placeholder="Search dish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>
              <i className="ti ti-x"></i>
            </button>
          )}
        </div>

        <div className="list-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${filterCat === cat ? "on" : ""}`}
              onClick={() => setFilterCat(cat)}
            >
              {cat !== "All" && categoryEmoji[cat]} {cat}
            </button>
          ))}
        </div>
      </div>

    
      <div className="list-card">

  
        <div className="list-table-head">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

  
        {loading && (
          <div className="list-loading">
            {[1,2,3,4].map((i) => (
              <div key={i} className="skeleton-row">
                <div className="sk sk-img"></div>
                <div className="sk sk-text"></div>
                <div className="sk sk-badge"></div>
                <div className="sk sk-price"></div>
                <div className="sk sk-btn"></div>
              </div>
            ))}
          </div>
        )}

  
        {!loading && filtered.length === 0 && (
          <div className="list-empty">
            <span>🍽</span>
            <p>{search ? `No results for "${search}"` : "No items found"}</p>
          </div>
        )}

    
        {!loading && filtered.map((item) => (
          <div key={item._id} className="list-table-row">

            <div className="list-img-wrap">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="list-name">
              <p className="item-name">{item.name}</p>
              <p className="item-desc">{item.description?.slice(0, 45)}...</p>
            </div>

            <div>
              <span className="cat-pill">
                {categoryEmoji[item.category] || "🍽"} {item.category}
              </span>
            </div>

            <div className="item-price">₹{item.price}</div>

            <button
              className={`delete-btn ${deletingId === item._id ? "deleting" : ""}`}
              onClick={() => removeFood(item._id)}
              disabled={deletingId === item._id}
              aria-label={`Delete ${item.name}`}
            >
              {deletingId === item._id ? (
                <i className="ti ti-loader-2 spin"></i>
              ) : (
                <i className="ti ti-trash"></i>
              )}
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default List;