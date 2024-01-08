import { useState, useEffect } from "react";
import "../Forms.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import CategoryUpdateToast from "../Components/Toasts/CategoryUpdateToast";

function UpdateCategory() {
  const admin = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/categories/${params.id}`,
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });

      setName(response.data.name);
      setImage(response.data.img);
    };
    getCategory();
  }, []);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/categories/${params.id}`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${admin.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="product-form dashboard-forms">
      <h1 className="forms-header">UPDATE CATEGORY</h1>
      <form className="rounded form-container" onSubmit={handleUpdateCategory}>
        <div className="mb-3">
          <label htmlFor="name" id="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="img" id="repeatPassword" className="form-label">
            Image:
          </label>
          <input
            type="file"
            className="form-control"
            name="img"
            onChange={(e) => {
              const file = URL.createObjectURL(e.target.files[0]);
              setImage(file);
            }}
          />
        </div>
        <div className="button-container">
          <button className="forms-button" type="submit">
            UPDATE
          </button>
        </div>
      </form>
      {showToast && (
        <CategoryUpdateToast
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
    </div>
  );
}

export default UpdateCategory;
