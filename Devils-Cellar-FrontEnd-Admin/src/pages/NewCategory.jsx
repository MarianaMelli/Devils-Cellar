import { useState } from "react";
import "../Forms.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
function NewCategory() {
  const admin = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleNewCategory = async (e) => {
    e.preventDefault();

    try {
      const newFormData = new FormData(e.target);
      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/categories`,
        data: newFormData,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${admin.token}`,
        },
      });
      console.log("category created successfully");
      navigate("/categories");
    } catch (error) {
      console.log(error);
    }

    setName("");
    setImage("");
  };
  return (
    <div className="product-form dashboard-forms">
      <h1 className="forms-header">CREATE A NEW CATEGORY</h1>
      <form className="rounded form-container" onSubmit={handleNewCategory}>
        <div className="mb-3">
          <label htmlFor="name" id="name" className="form-label">
            Name :
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="img" id="repeatPassword" className="form-label">
            Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="img"
            name="img"
            onChange={(e) => {
              const file = URL.createObjectURL(e.target.files[0]);
              setImage(file);
            }}
          />
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

export default NewCategory;
