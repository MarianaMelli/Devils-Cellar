import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faCirclePlus,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductDeleteToast from "./Toasts/ProductDeleteToast";
import { useSelector } from "react-redux";

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin);
  const [showToast, setShowToast] = useState(false);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/products/${productId}`,
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/products`,
        });

        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [handleDeleteProduct]);

  return (
    <>
      <div className="products-bg table-container">
        <h1 className="tables-header">
          PRODUCTS
          <FontAwesomeIcon
            icon={faCirclePlus}
            style={{ cursor: "pointer", fontSize: "3rem" }}
            onClick={() => navigate("/new-product")}
          />
        </h1>
        <div className="products-table">
          <table className="table table-hover text-center align-middle rounded rounded-3 dashboard-table ">
            <thead className="align-middle">
              <tr>
                <th scope="col" className="products-table-header header">
                  Id
                </th>
                <th scope="col" className="products-table-header header">
                  Name
                </th>
                <th scope="col" className="products-table-header header">
                  Category
                </th>
                <th scope="col" className="products-table-header header">
                  Featured
                </th>
                <td scope="col" className="products-table-header header">
                  Price
                </td>
                <td scope="col" className="products-table-header header">
                  Stock
                </td>
                <th scope="col" className="products-table-header header">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="table-content">
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td>
                    {product.featured ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: "green" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faXmark}
                        style={{ color: "red" }}
                      />
                    )}
                  </td>
                  <td>{product.unitPrice}</td>
                  <td>{product.stock}</td>

                  <td>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{
                        color: "#5d5dff",
                        marginRight: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/update-product/${product.id}`)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ color: "grey", cursor: "pointer" }}
                      onClick={() => handleDeleteProduct(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showToast && (
          <ProductDeleteToast
            showToast={showToast}
            setShowToast={setShowToast}
          />
        )}
      </div>
    </>
  );
}

export default ProductsTable;
