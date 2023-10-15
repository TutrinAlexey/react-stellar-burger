import { createPortal } from "react-dom";
import styles from "./Modals.module.css";
import { useEffect } from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import Modal from "../Modal/Modal";

const modalRoot = document.getElementById("modals");

function Modals({onClose, children}) {
  const closeOnEsc = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  });

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <Modal onClose={onClose} ingredientInfo={children}></Modal>
    </ModalOverlay>,
    modalRoot
  );
}

Modals.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element
};

export default Modals;
