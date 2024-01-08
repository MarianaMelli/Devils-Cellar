import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { toggleAgeVerification } from "../Redux/PageSlice";

function AgeVerificationModal() {
  const dispatch = useDispatch();

  const handleClose = () => {
    redirectToGoogle();
  };

  const redirectToGoogle = () => {
    window.location.assign("https://www.google.com");
  };

  const handleConfirm = () => {
    dispatch(toggleAgeVerification());
  };

  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        fullscreen={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body
          className="text-white d-flex flex-column align-items-center justify-content-center p-0 age-verification"
          style={{
            backgroundImage: `url('${
              import.meta.env.VITE_BACKET_URL
            }/bg-age-verification.webp')`,
          }}
        >
          <div className="modal-cont text-center">
            <p className="fw-semibold fs-4">Are you over 18 years old?</p>
            <button
              className="m-1 fw-semibold fs-5 rounded"
              onClick={handleConfirm}
            >
              Yes
            </button>
            <button
              className="m-1 fw-semibold fs-5 rounded"
              onClick={handleClose}
            >
              No
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AgeVerificationModal;
