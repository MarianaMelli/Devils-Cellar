import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home.jsx";
import Footer from "../src/Components/Footer";
import ProductDetail from "./Pages/ProductDetail";
import AboutUs from "./Pages/AboutUs";
import NavAlternative from "./Components/NavAlternative";
import Buttons from "./Components/Buttons";
import OurWines from "./Pages/OurWines";
import MyOrders from "./Pages/MyOrders";
import CheckOut from "./Pages/CheckOut";
import Profile from "./Pages/Profile";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Pages/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toggleAgeVerification, toggleResetDB } from "./Redux/PageSlice";

function App() {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const currentPage = location.pathname;
  const excludedPaths = ["/login", "/signup"];
  const excludeComponent = !excludedPaths.includes(currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("unload", handleAgeVerification);
    return () => window.removeEventListener("unload", handleAgeVerification);
  }, []);

  useEffect(() => {
    window.addEventListener("unload", handleResetDB);
    return () => window.removeEventListener("unload", handleResetDB);
  }, []);

  const handleAgeVerification = () => {
    dispatch(toggleAgeVerification());
  };

  const handleResetDB = () => {
    dispatch(toggleResetDB());
  };

  const cart = useSelector((state) => state.cart);
  return (
    <div className="main">
      {excludeComponent && <NavAlternative />}
      {excludeComponent && <Buttons />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/our-wines" element={<OurWines />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about-this-project" element={<AboutUs />} />

        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {excludeComponent && <Footer />}
    </div>
  );
}

export default App;
