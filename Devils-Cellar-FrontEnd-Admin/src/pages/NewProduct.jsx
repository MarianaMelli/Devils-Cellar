import { useState, useEffect } from "react";
import "../Forms.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function NewProduct() {
  const [name, setName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [categories, setCategories] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [slogan, setSlogan] = useState("");
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    try {
      const getCategories = async () => {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/categories`,
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });
        setCategories(response.data);
      };
      getCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleNewProduct = async (e) => {
    e.preventDefault();

    try {
      const newFormData = new FormData(e.target);
      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/products`,
        data: newFormData,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${admin.token}`,
        },
      });
      console.log("product was created successfully");
      navigate("/products");
    } catch (error) {
      console.log(error);
    }

    setName("");
    setUnitPrice("");
    setStock("");
    setCategory("");
    setImg("");
    setSlogan("");
    setDescription("");
  };

  return (
    categories && (
      <div className="product-form dashboard-forms">
        <h1 className="forms-header">CREATE A NEW PRODUCT</h1>
        <form className="rounded form-container" onSubmit={handleNewProduct}>
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
          <div className="mb-3 ">
            <label htmlFor="name" id="name" className="form-label">
              Description:
            </label>
            <textarea
              type="text"
              className="form-control"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="floatingSelect" className="form-label">
              Category:
            </label>
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select a category ...</option>
              {categories.map((categoryOption) => (
                <option key={categoryOption.id} value={categoryOption.id}>
                  {categoryOption.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="floatingSelect" className="form-label">
              Is a featured product?
            </label>
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={(e) => setIsFeatured(e.target.checked)}
              name="featured"
            >
              <option>Select an option ...</option>
              <option checked={!isFeatured}>false</option>
              <option checked={isFeatured}>true</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="password" id="password" className="form-label">
              Unit Price:
            </label>
            <input
              type="number"
              className="form-control"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              name="unitPrice"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="repeatPassword"
              id="repeatPassword"
              className="form-label"
            >
              Stock:
            </label>
            <input
              type="number"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              name="stock"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="repeatPassword"
              id="repeatPassword"
              className="form-label"
            >
              Image:
            </label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                const file = URL.createObjectURL(e.target.files[0]);
                setImg(file);
              }}
              name="img"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" id="name" className="form-label">
              Slogan:
            </label>
            <input
              type="text"
              className="form-control"
              name="slogan"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button className="forms-button" type="submit">
              CREATE
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default NewProduct;
