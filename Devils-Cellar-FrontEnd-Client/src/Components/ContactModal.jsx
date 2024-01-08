import React from "react";
import "../styles.css/ContactModal.css";
import Modal from "react-bootstrap/Modal";
import { NavLink, useNavigate } from "react-router-dom";

function ContactModal({ show, setShow }) {
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    navigate("/about-this-project");
  };

  return (
    <div className="modal-contact-container">
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">CONTACT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contact-body">
            This section was created in order to simulate the Company contact
            information. If you would like to know more about us, visit our
            page:
            <div
              className="about-this-proyect-contact-btn"
              onClick={() => handleClose()}
            >
              ABOUT THIS PROJECT
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ContactModal;
