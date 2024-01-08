import React from "react";
import "../ErrorPage.css";
import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <header
        className="bg"
        style={{ backgroundImage: `url("../src/assets/bg-enologos@2x.webp` }}
      >
        <div className="info-text">
          <h2 className="title">Page Not Found</h2>
          <p className="text">
            The page you are trying to access is not available.
          </p>
          <NavLink to="/" className="backHome">
            BACK TO ADMIN
          </NavLink>
        </div>
      </header>
    </div>
  );
}

export default ErrorPage;
