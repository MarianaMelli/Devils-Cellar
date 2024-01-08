import { useState } from "react";
import "../Forms.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function NewAdmin() {
  const admin = useSelector((state) => state.admin);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const navigate = useNavigate();

  const handleNewAdmin = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setWrongPassword(false);
      try {
        await axios({
          method: "POST",
          url: `${import.meta.env.VITE_API_URL}/admins`,
          data: {
            firstname,
            lastname,
            email,
            password,
          },
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });
        console.log("User created successfully");
        navigate("/administrators");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Passwords do not match");
      setWrongPassword(true);
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="admin-form dashboard-forms">
      <h1 className="forms-header">CREATE A NEW ADMIN</h1>
      <form className="rounded form-container" onSubmit={handleNewAdmin}>
        <div className="mb-3">
          <label htmlFor="firstname" id="firstname" className="form-label">
            Firstname :
          </label>
          <input
            type="text"
            className="form-control"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder=""
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" id="lastname" className="form-label">
            Lastname :
          </label>
          <input
            type="text"
            className="form-control"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder=""
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" id="email" className="form-label">
            Email :
          </label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" id="password" className="form-label">
            Password :
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="repeatPassword"
            id="repeatPassword"
            className="form-label"
          >
            Repeat password :
          </label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder=""
          />
          {wrongPassword && (
            <div className="text-danger fw-semibold text-center">
              Passwords don't match. Try again!
            </div>
          )}
        </div>
        <div className="button-container">
          <button className="forms-button" type="submit">
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAdmin;
