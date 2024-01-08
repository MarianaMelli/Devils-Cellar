import React, { useState } from "react";
import "../styles.css/ResetDBModal.css";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { toggleDatabaseToast, toggleResetDB } from "../Redux/PageSlice";
import axios from "axios";

function ResetDBModal({ show, setShow }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const handleConfirm = () => {
    dispatch(toggleResetDB());
    setShow(false);
  };

  const handleResetDB = async () => {
    try {
      await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/resetdb`,
      });
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="modalreset-container"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="resetDB-title"
          >
            Welcome to Devil's Cellar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contact-body">
            For a better experience you may want to reset the database.
            <div className="btn-box-resetdb">
              <button
                onClick={() => {
                  handleResetDB();
                  handleConfirm();
                  dispatch(toggleDatabaseToast());
                }}
                className="resetdb-btn reset-btn"
              >
                Reset data base
              </button>
              <button
                className="resetdb-btn close-reset-btn"
                onClick={() => handleClose()}
              >
                Close
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResetDBModal;
