import React, { useState } from "react";
import "../styles.css/SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setWrongPassword(false);
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
          firstname,
          lastname,
          address,
          phone,
          email,
          password,
        });
        console.log("User created successfully");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Passwords do not match");
      setWrongPassword(true);
    }

    setFirstname("");
    setLastname("");
    setAddress("");
    setPhone("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div
      className="principal"
      style={{
        backgroundImage: `url('${
          import.meta.env.VITE_BACKET_URL
        }/bg-grapes.webp')`,
      }}
    >
      <img
        src={`${import.meta.env.VITE_BACKET_URL}/Logo_white.png`}
        alt="logo"
        className="sign-up-logo"
      />
      <div className="container-signup">
        <form className="formulario" onSubmit={handleSignUp}>
          <h2 className="titulo">Sign Up</h2>
          <div className="form-group ">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {wrongPassword && (
              <div className="text-danger fw-semibold text-center">
                Passwords don't match. Try again!
              </div>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
