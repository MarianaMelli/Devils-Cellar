import "../styles.css/Cart.css";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, reduceQty, removeFromCart } from "../Redux/CartSlice";
import CheckOutToast from "./Toasts/CheckOutToast";

function Cart({ name, ...props }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLessQty = (id) => {
    dispatch(reduceQty(id));
  };

  const handleAddQty = (id) => {
    dispatch(increaseQty(id));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  let totalItems = 0;
  {
    cart.map((product) => (totalItems += product.qty));
  }

  const handleCheckOut = () => {
    if (cart.length > 0) {
      navigate("/checkout");
      setShow(!show);
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <>
      <NavLink
        onClick={handleShow}
        className="text-decoration-none p-0 m-0 position-relative"
      >
        <FontAwesomeIcon
          className="cart-icon"
          icon={faCartShopping}
          style={{
            fontSize: "1.8rem",
            cursor: "pointer",
            "@media (max-width: 767px)": {
              fontSize: "0.5rem",
              paddingTop: "0",
            },
          }}
        />
        <span className="count">{cart.length > 0 && totalItems}</span>
      </NavLink>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="cart-body">
          <div className={"scrollable"}>
            {cart.length === 0 && (
              <div className="empty-cart-msg">
                <h2>YOUR CART IS EMPTY</h2>
                <NavLink to="/our-wines" className="cart-lets-shop-link">
                  {" "}
                  LET'S SHOP!
                </NavLink>
              </div>
            )}
            {cart.map((product) => (
              <div key={product.id} className="product-cart my-3">
                <div className="w-25 me-2 text-center">
                  <img
                    className="img-product-cart"
                    src={`${import.meta.env.VITE_BACKET_URL}/${product.img}`}
                    alt={product.name}
                  />
                </div>
                <div className="w-75 ps-2">
                  <div className="product-details-cart pt-1">
                    <span>{product.name}</span>{" "}
                    <i
                      className="bi bi-trash3"
                      onClick={() => handleRemoveFromCart(product.id)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                  <div className="product-details-cart pt-1">
                    <div className="product-manage-qty">
                      <i
                        className="bi bi-dash-circle"
                        onClick={() => handleLessQty(product.id)}
                        style={{
                          opacity: product.qty === 1 ? 0.5 : 1,
                          cursor: product.qty === 1 ? "auto" : "pointer",
                        }}
                      ></i>
                      <span className="mx-1 qty">{product.qty}</span>
                      <i
                        className="bi bi-plus-circle"
                        onClick={() => handleAddQty(product.id)}
                        style={{
                          opacity: product.qty < product.stock ? 1 : 0.5,
                          cursor:
                            product.qty < product.stock ? "pointer" : "auto",
                        }}
                      ></i>
                    </div>
                    <span>{product.unitPrice} UYU</span>
                  </div>
                  <div className="product-details-cart pt-2">
                    <span className="fw-bold ">Sub-total</span>
                    <span className="fw-bold">
                      {product.unitPrice * product.qty} UYU
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showToast && (
            <CheckOutToast showToast={showToast} setShowToast={setShowToast} />
          )}
          <div className="cart-footer">
            <div className="order-total px-2">
              <p className="fw-bold">Order total</p>
              <p className="fw-bold">
                {cart.reduce(
                  (acc, product) => acc + product.unitPrice * product.qty,
                  0
                )}{" "}
                UYU
              </p>
            </div>
            <div className="order-total px-2">
              <p className="fw-bold">Shipping</p>
              <p className="fw-bold">Free</p>
            </div>
            <div>
              <p className="text-center">Are you done shopping?</p>
            </div>
            <div className="buttons-container">
              <NavLink
                to="/our-wines"
                className="cart-button continue-shopping "
                onClick={() => setShow(!show)}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ color: "orangered", paddingRight: "3px" }}
                />
                <span className="p-0 d-inline">Continue shopping</span>
              </NavLink>
              <div
                className="cart-button checkout-btn "
                onClick={() => {
                  handleCheckOut();
                }}
              >
                <i className="bi bi-lock-fill text-black "></i>
                <span className="p-0 d-inline">Checkout</span>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
