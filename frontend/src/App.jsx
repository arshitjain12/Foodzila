import Navbar from "./components/Navbar/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrder.jsx";
import FoodReviews from "./pages/FoodReviews/FoodReviews";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/reviews/:foodId" element={<FoodReviews />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
