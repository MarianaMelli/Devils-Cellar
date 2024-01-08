import { NavLink } from "react-router-dom";
import "../Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faWineGlassEmpty,
  faUsers,
  faUserTie,
  faCubes,
  faCartShopping,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/AdminSlice";

function SideBar() {
  const [activeTab, setActiveTab] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (index) => {
    if (activeTab === index) return;
    setActiveTab(index);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="dashboard-tabs">
      <img
        src={`${import.meta.env.VITE_BACKET_URL}/Logo_white.png`}
        alt=""
        className="logo"
      />
      <ul>
        <li
          className={activeTab === 0 ? "tab-bg rounded-start-5 ms-4" : ""}
          onClick={() => handleClick(0)}
        >
          <NavLink to="/">
            <FontAwesomeIcon icon={faChartLine} /> DASHBOARD
          </NavLink>
        </li>
        <li
          className={activeTab === 1 ? "tab-bg rounded-start-5 ms-4" : ""}
          onClick={() => handleClick(1)}
        >
          <NavLink to="/clients" className="active-border">
            <FontAwesomeIcon icon={faUsers} /> CLIENTS
          </NavLink>
        </li>
        <li
          className={activeTab === 2 ? "tab-bg rounded-start-5 ms-4" : ""}
          onClick={() => handleClick(2)}
        >
          <NavLink to="/administrators">
            <FontAwesomeIcon icon={faUserTie} /> ADMINS
          </NavLink>
        </li>
        <li
          className={activeTab === 3 ? "tab-bg rounded-start-5 ms-4" : ""}
          onClick={() => handleClick(3)}
        >
          <NavLink to="/products">
            <FontAwesomeIcon icon={faWineGlassEmpty} /> PRODUCTS
          </NavLink>
        </li>
        <li
          className={activeTab === 4 ? "tab-bg rounded-start-5 ms-4" : ""}
          onClick={() => handleClick(4)}
        >
          <NavLink to="/categories">
            <FontAwesomeIcon icon={faCubes} /> CATEGORIES
          </NavLink>
        </li>
        <li
          className={activeTab === 5 ? "tab-bg rounded-start-5 ms-4" : ""}
          onClick={() => handleClick(5)}
        >
          <NavLink to="/orders">
            <FontAwesomeIcon icon={faCartShopping} /> ORDERS
          </NavLink>
        </li>
        <li>
          <a
            href={`${import.meta.env.VITE_E_COMMERCE_URL}`}
            target="_blank"
            className="devils-link"
          >
            <img
              src={`${import.meta.env.VITE_BACKET_URL}/Logo_white.png`}
              alt="logo-link"
              className="logo-link"
            />
            <span>DEVIL'S CELLAR</span>
          </a>
        </li>
        <li>
          <NavLink to="/login" onClick={() => handleLogout()}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              rotation={180}
              style={{ marginRight: "0.5rem" }}
            />
            LOGOUT
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
export default SideBar;
