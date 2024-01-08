import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles.css/NavBarFooter.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/UserSlice";
import ContactModal from "./ContactModal";

function NavBarFooter() {
  const [showNavDropDown, setShowNavDropDown] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const [show, setShow] = useState(false);

  const handleContactModal = () => {
    setShow(true);
    document.querySelector("body").removeAttribute("style");
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <nav className="nav-footer">
        <div className="container">
          <ul className="nav-page">
            <li className="nav-item-footer">
              <NavLink to="/about-this-project" onClick={scrollToTop}>
                ABOUT THIS PROJECT
              </NavLink>
            </li>
            <li className="nav-item-footer">
              <NavLink to="/our-wines" onClick={scrollToTop}>
                OUR WINES
              </NavLink>
            </li>
            <li className="nav-item-footer">
              <NavLink>
                <span onClick={() => handleContactModal()}> CONTACT</span>
              </NavLink>
            </li>
            <li
              className="nav-item-footer dyhaa"
              onClick={() => setShowNavDropDown(!showNavDropDown)}
            >
              {!user ? <>DO YOU HAVE AN ACCOUNT?</> : <>MY ACCOUNT</>}
              {showNavDropDown && (
                <ul className="list-dropdown-user list-unstyled">
                  {!user ? (
                    <>
                      {" "}
                      <li>
                        <NavLink to="/sign-in">Sign In</NavLink>
                      </li>
                      <li>
                        <NavLink to="/login">Login</NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink
                          to="/"
                          onClick={() => handleLogout()}
                          className="user-dropdown"
                        >
                          Logout
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/profile" className="user-dropdown">
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/my-orders" className="user-dropdown">
                          My Orders
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>
      {show && <ContactModal show={show} setShow={setShow} />}
    </div>
  );
}

export default NavBarFooter;
