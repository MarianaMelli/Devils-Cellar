import { useEffect, useState } from "react";
import "../Forms.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ProductUpdateToast from "../Components/Toasts/ProductUpdateToast";

function UpdateProduct() {
  const params = useParams();
  const admin = useSelector((state) => state.admin);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [stock, setStock] = useState("");
  const [img, setImg] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [slogan, setSlogan] = useState("");

  const [categories, setCategories] = useState(null);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    try {
      const getProduct = async () => {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/products/${params.id}`,
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });

        setName(response.data.name);
        setDescription(response.data.description);
        setUnitPrice(response.data.unitPrice);
        setStock(response.data.stock);
        setImg(response.data.img);
        setFeaturedImg(response.data.featuredImg);
        setCategory(response.data.category);
        setIsFeatured(response.data.featured);
        setSlogan(response.data.slogan);
      };
      getProduct();
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  let filteredCategories;
  categories &&
    (filteredCategories = categories.filter(
      (filteredCategory) => filteredCategory.id !== category.id
    ));

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_URL}/products/${params.id}`,
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
    name && (
      <div className="product-form dashboard-forms">
        <h1 className="forms-header">UPDATE PRODUCT</h1>
        <form className="rounded form-container" onSubmit={handleUpdateProduct}>
          <div className="mb-3">
            <label htmlFor="name" id="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              id="category"
              aria-label="Floating label select example"
              onChange={(e) => setCategory(e.target.value)}
              name="category"
            >
              <option value={category.id}>{category.name}</option>
              {categories &&
                filteredCategories.map((filteredCategory) => (
                  <option key={filteredCategory.id} value={filteredCategory.id}>
                    {filteredCategory.name}
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
              id="isFeatured"
              aria-label="Floating label select example"
              onChange={(e) => setIsFeatured(e.target.checked)}
              value={isFeatured}
              name="featured"
            >
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
              name="unitPrice"
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="repeatPassword"
              id="repeatPassword"
              className="form-label"
            >
              Stock :
            </label>
            <input
              type="number"
              className="form-control"
              value={stock}
              name="stock"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label">
              Image:
            </label>
            <input
              type="file"
              id="img"
              name="img"
              className="form-control"
              onChange={(e) => {
                const file = URL.createObjectURL(e.target.files[0]);
                setImg(file);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="featuredImg" className="form-label">
              Featured image:
            </label>
            <input
              type="file"
              className="form-control"
              id="featuredImg"
              name="featuredImg"
              onChange={(e) => {
                const file = URL.createObjectURL(e.target.files[1]);
                setImg(file);
              }}
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
            <button type="submit" className="forms-button">
              UPDATE
            </button>
          </div>
        </form>
        {showToast && (
          <ProductUpdateToast
            showToast={showToast}
            setShowToast={setShowToast}
          />
        )}
      </div>
    )
  );
}

export default UpdateProduct;
