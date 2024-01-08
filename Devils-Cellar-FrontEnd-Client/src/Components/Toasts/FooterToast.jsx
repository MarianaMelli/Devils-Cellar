import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import "../../styles.css/ToastsStyles/FooterToast.css";

function FooterToast({ setInputFooter }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="footerToast-container">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{
                marginRight: "15px",
                fontSize: "1.2rem",
                verticalAlign: "middle",
              }}
            />
            <strong className="me-auto text-center fw-semibold fs-6">
              Newsletter
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
            This functionality is still in development!
          </Toast.Body>
        </Toast>
      </div>

      <span
        className="btn btn-light rounded-end-pill p-3 newsletter-btn"
        onClick={() => {
          setShow(true);
          setInputFooter("");
        }}
      >
        <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "1.2rem" }} />
      </span>
    </>
  );
}

export default FooterToast;
