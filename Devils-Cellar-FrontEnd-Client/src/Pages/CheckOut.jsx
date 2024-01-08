import React, { useEffect, useState } from "react";
import "../styles.css/CheckOut.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCreditCard,
} from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import OrderModal from "../Components/OrderModal";
import { emptyCart } from "../Redux/CartSlice";
import PaymentToast from "../Components/Toasts/PaymentToast";

function CheckOut() {
  const user = useSelector((state) => state.user);
  const [shippingAddress, setShippingAddress] = useState(user.address);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const paymentMethods = ["Visa", "Mastercard", "Mercado Pago", "PayPal"];
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [valuesMissing, setValuesMissing] = useState(false);

  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleClose = () => {
    setShow(false);
    navigate("/");
  };
  const handleShow = () => setShow(true);

  const handleSelection = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const getFiveDaysAheadOptions = () => {
    const options = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i + 1);
      options.push(date);
    }
    return options;
  };

  const handleOrder = async () => {
    if (selectedPaymentMethod !== "" && cart.length > 0) {
      setValuesMissing(false);
      try {
        await axios({
          method: "POST",
          url: `${import.meta.env.VITE_API_URL}/orders`,
          data: {
            productList: cart,
            shippingAddress,
            shippingDate: selectedDate,
            paymentMethod: selectedPaymentMethod,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        dispatch(emptyCart());

        handleShow();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("error en checkout");
      setValuesMissing(true);
    }
  };
  let totalItems = 0;
  {
    cart.map((product) => (totalItems += product.qty));
  }

  return (
    <div>
      <header
        className="banner-checkout"
        style={{
          backgroundImage: `url('${
            import.meta.env.VITE_BACKET_URL
          }/checkout-bg.jpg')`,
        }}
      >
        <div className="info-text-checkout">
          <h2 className="title-checkout">CHECKOUT</h2>
        </div>
      </header>
      <div className="container checkout">
        <div className="checkout-information">
          <div className="checkout-information-section">
            <h2 className="checkout-headers">
              Billing Information
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{
                  color: "orangered",
                  fontSize: "1.3rem",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/profile")}
              />
            </h2>
            <h3>
              Name : {user.firstname} {user.lastname}
            </h3>
            <h3>Address : {user.address}</h3>
            <h3>Email : {user.email}</h3>
            <h3>Phone : {user.phone}</h3>
          </div>

          <div className="checkout-information-section">
            <h2 className="checkout-headers">Shipping Information </h2>
            <div>
              <label
                htmlFor="shippingAddress"
                className="form-label checkout-labels"
              >
                Shipping Address :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter shipping address..."
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                name="shippingAddress"
                id="shippingAddress"
              />
            </div>

            <div>
              <h2 className="checkout-labels mt-2">Select a Date :</h2>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                maxDate={getFiveDaysAheadOptions()[4]}
                dateFormat="dd MMM yyyy"
              />
              {valuesMissing && (
                <p className="text-danger fw-semibold">
                  Please select a shipping date
                </p>
              )}
            </div>
          </div>

          <div className="checkout-information-section payment-section">
            <h2 className="checkout-headers ">Payment & Delivery</h2>
            <h3>
              <FontAwesomeIcon
                icon={faCreditCard}
                style={{ color: "orangered" }}
              />{" "}
              Select a payment method
            </h3>
            <select
              className="form-select"
              aria-label="Default select example"
              value={selectedPaymentMethod}
              onChange={handleSelection}
            >
              <option value="">Select..</option>
              {paymentMethods.map((method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              ))}
            </select>
            {valuesMissing && (
              <p className="text-danger fw-semibold">
                Please select a payment method
              </p>
            )}
          </div>
          {(selectedPaymentMethod === "Visa" ||
            selectedPaymentMethod === "Mastercard") && (
            <div className="form-group ">
              <div className="mb-3">
                <label>Type :</label>
                <input
                  type="text"
                  className="form-control w-100"
                  name="type"
                  value="Credit Card"
                  readOnly
                />
              </div>
              <div className="form-group card-identificatiton mb-3">
                <div className="card-number">
                  {" "}
                  <label>Card number :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="card-number"
                    value="9876-5432-1234-5678"
                    readOnly
                  />
                </div>
                <div className="card-holder">
                  <label>Card holder :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="card-holder"
                    value={`${user.firstname} ${user.lastname}`}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-group card-details">
                <div className="w-50">
                  <label>Expiration date :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="expiration-date"
                    value="MM/YYYY"
                    readOnly
                  />
                </div>

                <div className="w-25">
                  <label>CVV :</label>
                  <input
                    type="email"
                    className="form-control"
                    name="cvv"
                    value="456"
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
          {selectedPaymentMethod === "Mercado Pago" && (
            <button
              className="mercado-pago-paypal-btn "
              onClick={() => {
                setShowToast(true);
                setTimeout(() => {
                  setShowToast(false);
                }, 3000);
              }}
            >
              Go to my Mercado Pago account
            </button>
          )}
          {selectedPaymentMethod === "PayPal" && (
            <button
              className="mercado-pago-paypal-btn "
              onClick={() => {
                setShowToast(true);
                setTimeout(() => {
                  setShowToast(false);
                }, 3000);
              }}
            >
              Go to my PAYPAL account
            </button>
          )}
          <PaymentToast setShowToast={setShowToast} showToast={showToast} />
        </div>

        <div className="check-order-container">
          <h2 className="checkout-order-header">Order summary</h2>
          <div className="check-order">
            <div className="check-scrollable">
              <ul className="check-order-product-list">
                {cart.map((product) => (
                  <li key={product.id}>
                    <div>
                      <img
                        src={`${import.meta.env.VITE_BACKET_URL}/${
                          product.img
                        }`}
                        alt="product"
                        className="check-order-img"
                      />
                    </div>
                    <div className="check-order-product-detail">
                      <div>{product.name}</div>
                      <div className="check-order-product-detail-specifics">
                        <span>{product.unitPrice} UYU</span>
                        <span>Quantity : {product.qty}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <dl className="check-order-payment-summary">
              <div className="check-order-payment">
                <dt>Total items</dt>
                <dd>{totalItems}</dd>
              </div>
              <div className="check-order-payment">
                <dt>Sub-total</dt>
                <dd>
                  {cart.reduce(
                    (acc, product) => acc + product.unitPrice * product.qty,
                    0
                  )}{" "}
                  UYU
                </dd>
              </div>
              <div className="check-order-payment">
                <dt>Shipping</dt>
                <dd>Free</dd>
              </div>
              <div className="check-order-payment total-payment">
                <dt>Total</dt>
                <dd>
                  {cart.reduce(
                    (acc, product) => acc + product.unitPrice * product.qty,
                    0
                  )}{" "}
                  UYU
                </dd>
              </div>
            </dl>
            <div>
              <button
                type="button"
                className="confirm-order-btn"
                onClick={() => handleOrder()}
              >
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </div>

      <OrderModal handleClose={handleClose} show={show} />
    </div>
  );
}

export default CheckOut;
