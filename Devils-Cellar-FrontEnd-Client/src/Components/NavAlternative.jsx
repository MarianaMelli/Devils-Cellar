import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown, faBars } from "@fortawesome/free-solid-svg-icons";
import "../styles.css/NavAlt.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/UserSlice";

function NavAlternative() {
  const [showMobileDropDown, handleshowMobileDropDown] = useState(false);
  const [showDropDown, handleShowDropDown] = useState(false);
  const [showNavDropDown, handleShowNavDropDown] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="hamburger-menu ">
        <FontAwesomeIcon
          icon={faBars}
          style={{ fontSize: "2.5rem", color: "white", cursor: "pointer" }}
          onClick={() => {
            handleshowMobileDropDown(!showMobileDropDown);
            handleShowDropDown(false);
          }}
        />
        {showMobileDropDown && (
          <nav className="navAlt-mobile">
            <ul className="mobile-list">
              <li className="nav-item">
                <div
                  onClick={() => {
                    navigate("/about-this-project");
                    handleshowMobileDropDown(!showMobileDropDown);
                    handleShowDropDown(false);
                  }}
                  style={{ cursor: "pointer" }}
                  className="nav-to-hover"
                >
                  ABOUT THIS PROJECT
                </div>
              </li>
              <li className="nav-item">
                <div
                  onClick={() => {
                    navigate("/our-wines");
                    handleshowMobileDropDown(!showMobileDropDown);
                    handleShowDropDown(false);
                  }}
                  style={{ cursor: "pointer" }}
                  className="nav-to-hover"
                >
                  OUR WINES
                </div>
              </li>
              <li>
                <span onClick={() => handleShowDropDown(!showDropDown)}>
                  {!user ? (
                    <>
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ cursor: "pointer" }}
                      />
                      <FontAwesomeIcon icon={faCaretDown} />
                    </>
                  ) : (
                    <>
                      <img
                        src={`${import.meta.env.VITE_BACKET_URL}/${
                          user.avatar
                        }`}
                        className="nav-user-avatar"
                        alt="nav-user-avatar"
                      />
                    </>
                  )}
                </span>
                {showDropDown && (
                  <ul className="list-unstyled dropdown-user-mobile">
                    {!user ? (
                      <>
                        <li>
                          <NavLink to="/login" className="user-dropdown">
                            LOGIN
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/signup" className="user-dropdown">
                            SIGN UP
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <NavLink
                            to="/"
                            onClick={() => {
                              handleLogout();
                              handleshowMobileDropDown(!showMobileDropDown);
                              handleShowDropDown(false);
                            }}
                            className="user-dropdown"
                          >
                            LOGOUT
                          </NavLink>
                        </li>
                        <li>
                          <div
                            onClick={() => {
                              navigate("/profile");
                              handleshowMobileDropDown(!showMobileDropDown);
                              handleShowDropDown(false);
                            }}
                            style={{ cursor: "pointer" }}
                            className="user-dropdown"
                          >
                            PROFILE
                          </div>
                        </li>
                        <li>
                          <div
                            onClick={() => {
                              navigate("/my-orders");
                              handleshowMobileDropDown(!showMobileDropDown);
                              handleShowDropDown(false);
                            }}
                            style={{ cursor: "pointer" }}
                            className="user-dropdown"
                          >
                            MY ORDERS
                          </div>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
      <img
        src={`${import.meta.env.VITE_BACKET_URL}/Logo_white.png`}
        alt="Logo"
        className="logo-mobile"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />

      <nav className="navAlt">
        <div className="container">
          <div className="nav-list">
            <li className="nav-item">
              <NavLink to="/about-this-project">ABOUT THIS PROJECT</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/our-wines">OUR WINES</NavLink>
            </li>

            <li className="nav-user">
              <span onClick={() => handleShowNavDropDown(!showNavDropDown)}>
                {!user ? (
                  <>
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        fontSize: "1.8rem",
                        color: "whitesmoke",
                        cursor: "pointer",
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ color: "whitesmoke" }}
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={`${import.meta.env.VITE_BACKET_URL}/${user.avatar}`}
                      className="nav-user-avatar"
                      alt="nav-user-avatar"
                    />
                  </>
                )}
              </span>
              {showNavDropDown && (
                <ul className="list-unstyled dropdown-user">
                  {!user ? (
                    <>
                      <li>
                        <div
                          onClick={() => navigate("/login")}
                          className="user-dropdown fw-5"
                          style={{ cursor: "pointer" }}
                        >
                          LOGIN
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => navigate("/signup")}
                          className="user-dropdown"
                          style={{ cursor: "pointer" }}
                        >
                          SIGN UP
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink
                          to="/"
                          onClick={() => {
                            handleLogout();
                            handleShowNavDropDown(!showNavDropDown);
                          }}
                          className="user-dropdown"
                        >
                          LOGOUT
                        </NavLink>
                      </li>
                      <li>
                        <div
                          onClick={() => {
                            navigate("/profile");
                            handleShowNavDropDown(!showNavDropDown);
                          }}
                          className="user-dropdown"
                          style={{ cursor: "pointer" }}
                        >
                          PROFILE
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => {
                            navigate("/my-orders");
                            handleShowNavDropDown(!showNavDropDown);
                          }}
                          className="user-dropdown"
                          style={{ cursor: "pointer" }}
                        >
                          MY ORDERS
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </li>
          </div>
        </div>
      </nav>
      <img
        src={`${import.meta.env.VITE_BACKET_URL}/Logo_white.png`}
        alt="Logo"
        className="logo-navAlt"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
    </>
  );
}

export default NavAlternative;
