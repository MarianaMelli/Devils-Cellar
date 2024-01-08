import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import "../styles.css/OrderModal.css";

function OrderModal({ handleClose, show }) {
  return (
    <div className="order-modal-container">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="order-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>YOUR ORDER HAS BEEN MADE.</Modal.Title>
        </Modal.Header>
        <Modal.Body className="order-modal-body">
          Thank you for choosing our wines!
        </Modal.Body>
        <Modal.Footer>
          <NavLink to="/my-orders" className="order-modal-btn">
            See my orders
          </NavLink>

          <NavLink to="/" className="order-modal-btn">
            Back to home
          </NavLink>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderModal;
