import React from "react";
import Toast from "react-bootstrap/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import "../../styles.css/ToastsStyles/ProfileToast.css";

function ProfileToast({ setShowToast, showToast }) {
  return (
    <>
      <div className="ProfileToast-container">
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
              icon={faCircleCheck}
              style={{
                marginRight: "15px",
                fontSize: "1.2rem",
                verticalAlign: "middle",
              }}
            />
            <strong className="me-auto text-center fw-semibold fs-6">
              Updated Profile
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
            Your profile changes were saved!
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
}

export default ProfileToast;
