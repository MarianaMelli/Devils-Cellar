import React from "react";
import "../styles.css/ErrorPage.css";
import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <header
        className="bg"
        style={{
          backgroundImage: `url('${
            import.meta.env.VITE_BACKET_URL
          }/bg-enologos@2x.webp')`,
        }}
      >
        <div className="info-text">
          <h2 className="title">Page Not Found</h2>
          <p className="text">
            The page you are trying to access is not available.
          </p>
          <NavLink to="/" className="backHome">
            BACK TO HOME
          </NavLink>
        </div>
      </header>
    </div>
  );
}

export default ErrorPage;
