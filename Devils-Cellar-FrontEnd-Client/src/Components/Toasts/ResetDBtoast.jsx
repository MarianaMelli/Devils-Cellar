import React from "react";
import Toast from "react-bootstrap/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import "../../styles.css/ToastsStyles/ResetDBtoast.css";

function ResetDBtoast({ showToast, setShowToast }) {
  return (
    <>
      <div className="ResetDBtoast-container">
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
              icon={faDatabase}
              style={{
                marginRight: "15px",
                fontSize: "1.2rem",
                verticalAlign: "middle",
              }}
            />
            <strong className="me-auto text-center fw-semibold fs-6">
              Database
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
            Database has been reset successfully!
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
}

export default ResetDBtoast;
