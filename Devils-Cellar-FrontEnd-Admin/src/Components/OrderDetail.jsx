import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../OrderDetails.css";
import { format } from "date-fns";

function OrderDetail() {
  const params = useParams();
  const admin = useSelector((state) => state.admin);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/orders/${params.id}`,
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });

        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, []);

  return (
    <div className="order-detail-max-container">
      {order && (
        <div className="order-detail-container">
          <h1 className="details-header mb-3">DETAILS</h1>
          <div className="order">
            <div className="order-summary">
              <h3>
                <span className="order-highligth-text">Total items:</span>{" "}
                {order.productList.reduce(
                  (total, product) => total + product.qty,
                  0
                )}
              </h3>

              <h3>
                <span className="order-highligth-text">Shipping Address:</span>{" "}
                {order.shippingAddress}
              </h3>
              <h3>
                <span className="order-highligth-text">Shipping date:</span>
                {format(new Date(order.shippingDate), "dd MMM yyyy")}
              </h3>
              <h3>
                <span className="order-highligth-text">Payment Method:</span>{" "}
                {order.paymentMethod}
              </h3>
              <h3>
                {" "}
                <span className="order-highligth-text">Total amount:</span>
                {"  "}
                {order.productList.reduce(
                  (acc, product) => acc + product.qty * product.unitPrice,
                  0
                )}{" "}
                UYU
              </h3>
              <h3>
                <span className="order-highligth-text">Status: </span>
                {order.status}
              </h3>
            </div>
            <div className="order-product-details">
              <h2 className="order-product-list-header">Products</h2>
              <ul className="order-product-list">
                {order.productList.map((product) => (
                  <li key={product.id} className="order-product">
                    <div className="order-img-container">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/img/${
                          product.img
                        }`}
                        alt="product"
                        className="order-img"
                      />
                    </div>
                    <div className="order-product-description">
                      <div>
                        <h3 className="order-product-name">{product.name}</h3>
                        <div className="order-product-price-qty">
                          <p>
                            <span className="order-highligth-text">
                              Unit price :
                            </span>{" "}
                            {product.unitPrice} UYU
                          </p>
                          <p>
                            <span className="order-highligth-text">
                              {" "}
                              Quantity :
                            </span>{" "}
                            {product.qty}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
