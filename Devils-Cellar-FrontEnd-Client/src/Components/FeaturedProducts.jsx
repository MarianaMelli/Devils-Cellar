import { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css/FeaturedProducts.css";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/products/featured`,
        });

        setFeaturedProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFeaturedProducts();
  }, []);

  return (
    <div className="featured ">
      <h2 className="featured-title">FEATURED WINES</h2>
      {featuredProduct.map((product) => (
        <div className="featured-product-card" key={product.id}>
          <div className="featured-img-container">
            <img
              src={`${import.meta.env.VITE_BACKET_URL}/${product.featuredImg}`}
              alt="featured wine"
              className="featured-img"
            />
          </div>
          <div className="featured-text">
            <h2>{product.name}</h2>
            <p>{truncate(product.description, 100)}</p>
            <Link
              to={`/product/${product.id}`}
              className="see-featured-product"
            >
              SEE MORE
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeaturedProducts;
