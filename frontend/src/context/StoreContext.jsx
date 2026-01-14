import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:8080";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev?.[itemId] || 0) + 1,
    }));

    if (token) {
      const response = await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );

      response.data.success
        ? toast.success("Item Added to Cart")
        : toast.error("Something went wrong");
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response = await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("item Removed from Cart");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      alert("Error! Products are not fetching..");
    }
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);
  const loadCardData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData || {});
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCardData(savedToken);

        // User profile load karte waqt try-catch lagayein
        try {
          const res = await axios.post(
            // Make sure ye endpoint backend me exist krta ho
            url + "/api/user/profile", // Agar ye route nahi hai to banayein
            {},
            { headers: { token: savedToken } }
          );
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.log("Error loading user profile", err);
        }
      }
    }
    loadData();
  }, []);
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    user,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
