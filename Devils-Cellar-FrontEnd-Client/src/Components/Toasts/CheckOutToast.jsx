import React from "react";
import Toast from "react-bootstrap/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../../styles.css/ToastsStyles/CheckOutToast.css";

function CheckOutToast({ setShowToast, showToast }) {
  return (
    <>
      <div className="CheckOutToast-container">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{
                marginRight: "15px",
                fontSize: "1.2rem",
                verticalAlign: "middle",
              }}
            />
            <strong className="me-auto text-center fw-semibold fs-6">
              Check out
            </strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body
            style={{
              fontWeight: "bold",
              color: "black",
              fontFamily: "Cinzel",
              fontSize: "1rem",
            }}
          >
            Your cart is still empty! Please add products to cart before check
            out
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
}

export default CheckOutToast;
