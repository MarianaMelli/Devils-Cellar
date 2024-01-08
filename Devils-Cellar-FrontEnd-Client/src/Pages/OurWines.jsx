import "../styles.css/OurWines.css";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function OurWines() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/products`,
        });
        setAllProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();

    const getAllCategories = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/categories`,
        });
        setAllCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <header
        className="bg-ourwines"
        style={{
          backgroundImage: `url('${
            import.meta.env.VITE_BACKET_URL
          }/premium-backgrund.webp')`,
        }}
      >
        <div className="info-text-ourwines">
          <h2 className="title-ourwines">OUR WINE SELECTION</h2>
          <p className="text-ourwines">Where every bottle tells a story</p>
        </div>
      </header>
      <div className="ourwines-container">
        <span
          className={selectedCategory === null ? "selected-type" : "type"}
          onClick={() => handleCategoryClick(null)}
        >
          Show All
        </span>
        {allCategories &&
          allCategories.map((category) => (
            <span
              key={category.id}
              className={
                selectedCategory === category.id ? "selected-type" : "type"
              }
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </span>
          ))}
      </div>
      <div className="container carrousel">
        <div className="products-carrousel container">
          {allProducts &&
            allProducts
              .filter(
                (product) =>
                  selectedCategory === null ||
                  product.category.id === selectedCategory
              )
              .map((product) => {
                return (
                  <div key={product.id}>
                    <div className="img-name-container">
                      <span className="img-container">
                        <img
                          className="img-our-wines"
                          src={`${import.meta.env.VITE_BACKET_URL}/${
                            product.img
                          }`}
                          alt={product.name}
                          onClick={() => {
                            navigate(`/product/${product.id}`);
                            scrollToTop();
                          }}
                        />
                      </span>
                      <span className="wine-name">{product.name}</span>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="box-home-Link">
        <span>
          <NavLink to="/" className="home-Link">
            <FontAwesomeIcon icon={faArrowLeft} /> BACK TO HOME
          </NavLink>
        </span>
      </div>
    </div>
  );
}

export default OurWines;
