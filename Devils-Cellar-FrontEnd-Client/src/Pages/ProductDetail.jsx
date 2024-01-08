import React, { useEffect, useState } from "react";
import "../styles.css/ProductDetail.css";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Carrousel from "../Components/Carrousel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty } from "../Redux/CartSlice";
import CartToast from "../Components/Toasts/CartToast";

function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const getCurrentProduct = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/products/${params.id}`,
        });

        setCurrentProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentProduct();
  }, []);

  const handleAddToCart = (currentProduct) => {
    if (
      currentProduct.stock >= 1 &&
      cart.find((product) => product.id === currentProduct.id)
    ) {
      dispatch(increaseQty(currentProduct.id));
    } else {
      dispatch(
        addToCart({
          id: currentProduct.id,
          name: currentProduct.name,
          img: currentProduct.img,
          unitPrice: currentProduct.unitPrice,
          qty: 1,
          stock: currentProduct.stock,
        })
      );
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    currentProduct && (
      <div>
        <header
          className="bg-currentProduct"
          style={{
            backgroundImage: `url(${import.meta.env.VITE_BACKET_URL}/${
              currentProduct.category.img
            })`,
          }}
        >
          <div className="info-text-currentProduct">
            <h2 className="title-currentProduct"> {currentProduct.name}</h2>
            <p className="text-ourwines">{currentProduct.slogan}</p>
          </div>
        </header>
        <div className="product-main container">
          <div className="box-productDetails  rounded">
            <div className="productDetails">
              <img
                className="img-bottle"
                src={`${import.meta.env.VITE_BACKET_URL}/${currentProduct.img}`}
                alt="img"
              />
              <div className="textDetails">
                <p className="description">{currentProduct.description}</p>
                <p className="product-category">
                  <span className="p-0">Type: </span>
                  {currentProduct.category.name}
                </p>
                <p className="price">{currentProduct.unitPrice} UYU</p>
                <p className="text-white">Stock :{currentProduct.stock}</p>
                <div className="box-button">
                  <button
                    className="product-button bg-black border text-white p-2 fw-bold"
                    onClick={() => handleAddToCart(currentProduct)}
                  >
                    ADD TO CART
                  </button>
                  {showToast && (
                    <CartToast
                      setShowToast={setShowToast}
                      showToast={showToast}
                    />
                  )}
                  {currentProduct.stock === 0 && (
                    <span className="d-block text-white">
                      OUR CELLARS RUN OUT OF THIS PRODUCT!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="also-like">
            <p className="text-center">DISCOVER MORE WINES</p>
            {<Carrousel />}
          </div>
          <div className="box-our-Wines-Link">
            <span>
              <NavLink to="/our-wines" className="our-Wines-Link">
                <FontAwesomeIcon icon={faArrowLeft} /> BACK TO OUR WINES
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductDetail;
