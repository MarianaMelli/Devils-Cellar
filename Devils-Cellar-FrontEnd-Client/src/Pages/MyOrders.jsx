import React, { useEffect, useState } from "react";
import "../styles.css/MyOrders.css";
import Accordion from "react-bootstrap/Accordion";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart, increaseQty } from "../Redux/CartSlice";
import { format } from "date-fns";
import BuyAgainToast from "../Components/Toasts/BuyAgainToast";

function MyOrders() {
  const [myOrders, setMyOrders] = useState(null);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const getMyOrders = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/orders`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setMyOrders(response.data);
    };
    getMyOrders();
  }, []);

  const handleSeeAgain = async (product) => {
    const response = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/products/${product.id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.data) {
      navigate(`/product/${product.id}`);
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const handleAddToCart = async (orderProduct) => {
    const response = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/products/${orderProduct.id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.data) {
      if (
        orderProduct.stock > 0 &&
        cart.find((product) => product.id === orderProduct.id)
      ) {
        dispatch(increaseQty(orderProduct.id));
      } else {
        dispatch(
          addToCart({
            id: orderProduct.id,
            name: orderProduct.name,
            img: orderProduct.img,
            unitPrice: orderProduct.unitPrice,
            qty: 1,
            stock: orderProduct.stock,
          })
        );
      }
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };
  return (
    myOrders && (
      <div>
        <header
          className="banner-my-orders"
          style={{ backgroundImage: `url('${import.meta.env.VITE_BACKET_URL}/my-orders-bg.webp')` }}
        >
          <div className="info-text-my-orders">
            <h2 className="title-my-orders">ORDER HISTORY</h2>
          </div>
        </header>
        <div className="my-orders-container">
          {myOrders.length === 0 && (
            <div className="no-orders-yet-container">
              <div className="no-orders-yet">
                <h3>There are no orders yet!</h3>
                <NavLink to="/our-wines" className="lets-shop-link">
                  {" "}
                  LET'S SHOP!
                </NavLink>
              </div>
            </div>
          )}
          {myOrders &&
            myOrders.map((order) => {
              const orderTotalItems = order.productList.reduce(
                (total, product) => total + product.qty,
                0
              );
              return (
                <Accordion
                  defaultActiveKey="0"
                  className="order-accordion"
                  key={order.id}
                >
                  <Accordion.Item>
                    <Accordion.Header className="order-accordion-header-container">
                      <h4 className="order-accordion-header">
                        ORDER : {order.id} | DATE PLACED :{" "}
                        {format(new Date(order.createdAt), "dd MMM yyyy")}
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="order">
                        <div className="order-summary">
                          <h3>
                            <span className="order-highligth-text">
                              Total items :
                            </span>
                            {orderTotalItems}
                          </h3>

                          <h3>
                            <span className="order-highligth-text">
                              Shipping Address :
                            </span>{" "}
                            {order.shippingAddress}
                          </h3>
                          <h3>
                            <span className="order-highligth-text">
                              Shipping date :
                            </span>
                            {format(
                              new Date(order.shippingDate),
                              "dd MMM yyyy"
                            )}
                          </h3>
                          <h3>
                            <span className="order-highligth-text">
                              Payment Method :
                            </span>{" "}
                            {order.paymentMethod}
                          </h3>
                          <h3>
                            {" "}
                            <span className="order-highligth-text">
                              Total amount :
                            </span>
                            {"  "}
                            {order.productList.reduce(
                              (acc, product) =>
                                acc + product.qty * product.unitPrice,
                              0
                            )}{" "}
                            UYU
                          </h3>
                          <h3>
                            <span className="order-highligth-text">
                              Status:{" "}
                            </span>
                            {order.status}
                          </h3>
                        </div>
                        <div className="order-product-details">
                          <ul className="order-product-list">
                            {order.productList.map((product) => (
                              <li key={product.id} className="order-product">
                                <div className="order-img-container">
                                  <img
                                    src={`${import.meta.env.VITE_BACKET_URL}/${
                                      product.img
                                    }`}
                                    alt="product"
                                    className="order-img"
                                  />
                                </div>
                                <div className="order-product-description">
                                  <div>
                                    <h3 className="order-product-name">
                                      {product.name}
                                    </h3>
                                    <div className="order-product-price-qty">
                                      <span>
                                        Unit price : {product.unitPrice} UYU
                                      </span>
                                      <span>Quantity : {product.qty}</span>
                                    </div>

                                    <div className="order-btns">
                                      <div
                                        onClick={() => handleSeeAgain(product)}
                                      >
                                        View Product
                                      </div>
                                      <button
                                        className="buy-again-btn"
                                        onClick={() => handleAddToCart(product)}
                                      >
                                        Buy Again
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              );
            })}
        </div>
        {showToast && (
          <BuyAgainToast showToast={showToast} setShowToast={setShowToast} />
        )}
      </div>
    )
  );
}

export default MyOrders;
