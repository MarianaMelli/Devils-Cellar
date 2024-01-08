import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../styles.css/LoginPage.css";
import axios from "axios";
import { getLoggedUser } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("user@test.com");
  const [password, setPassword] = useState("1234");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getToken = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/tokens/user`,
        data: { email, password },
      });

      dispatch(getLoggedUser(response.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url('${
          import.meta.env.VITE_BACKET_URL
        }/bg-grapes.webp')`,
      }}
    >
      <img
        src={`${import.meta.env.VITE_BACKET_URL}/Logo_white.png`}
        alt="logo"
        className="login-logo"
      />

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={getToken}>
          <div className="form-group">
            <label>Email :</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
