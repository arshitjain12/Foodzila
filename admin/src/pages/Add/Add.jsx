import React, { useState, useEffect, useContext } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Add = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData, {
      headers: { token },
    });

    setLoading(false);

    if (response.data.success) {
      setData({ name: "", description: "", price: "", category: "Salad" });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
  }, []);

  const categories = [
    { value: "Salad",    emoji: "🥗" },
    { value: "Rolls",    emoji: "🌯" },
    { value: "Deserts",  emoji: "🍰" },
    { value: "Sandwich", emoji: "🥪" },
    { value: "Cake",     emoji: "🎂" },
    { value: "Pure Veg", emoji: "🥦" },
    { value: "Pasta",    emoji: "🍝" },
    { value: "Noodles",  emoji: "🍜" },
  ];

  return (
    <div className="add">

  
      <div className="add-header">
        <span className="sec-pre">Menu Management</span>
        <h1>Add New Item</h1>
        <p>Fill in the details below to add a new dish to your menu.</p>
      </div>

      <form onSubmit={onSubmitHandler} className="add-form">

       
        <div className="add-top-row">

          
          <div className="add-img-section">
            <label className="add-img-label" htmlFor="image">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="add-img-preview"
                />
              ) : (
                <div className="add-img-placeholder">
                  <i className="ti ti-photo-up"></i>
                  <span>Click to upload</span>
                  <span className="upload-hint">JPG, PNG up to 5MB</span>
                </div>
              )}
              {image && (
                <div className="add-img-overlay">
                  <i className="ti ti-pencil"></i>
                  <span>Change</span>
                </div>
              )}
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
              hidden
              required
            />
          </div>

       
          <div className="add-right-fields">

            
            <div className="add-field">
              <label className="field-label">
                <i className="ti ti-pencil"></i> Dish name
              </label>
              <input
                className="field-input"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                name="name"
                placeholder="e.g. Paneer Tikka Roll"
                required
              />
            </div>

         
            <div className="add-row-two">
              <div className="add-field">
                <label className="field-label">
                  <i className="ti ti-category"></i> Category
                </label>
                <select
                  className="field-input field-select"
                  name="category"
                  required
                  onChange={onChangeHandler}
                  value={data.category}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.emoji} {cat.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="add-field">
                <label className="field-label">
                  <i className="ti ti-currency-rupee"></i> Price
                </label>
                <div className="price-input-wrap">
                  <span className="price-prefix">₹</span>
                  <input
                    className="field-input price-input"
                    onChange={onChangeHandler}
                    value={data.price}
                    type="number"
                    name="price"
                    placeholder="120"
                    min="50"
                    required
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

     
        <div className="add-field">
          <label className="field-label">
            <i className="ti ti-align-left"></i> Description
          </label>
          <textarea
            className="field-input field-textarea"
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="4"
            placeholder="Describe the dish — ingredients, taste, special notes..."
            required
          />
          <span className="char-count">{data.description.length} / 300</span>
        </div>

      
        <div className="add-footer">
          <button
            type="button"
            className="add-btn-cancel"
            onClick={() => {
              setData({ name: "", description: "", price: "", category: "Salad" });
              setImage(false);
            }}
          >
            Clear
          </button>
          <button type="submit" className="add-btn-submit" disabled={loading}>
            {loading ? (
              <>
                <i className="ti ti-loader-2 spin"></i> Adding...
              </>
            ) : (
              <>
                <i className="ti ti-plus"></i> Add Dish
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Add;