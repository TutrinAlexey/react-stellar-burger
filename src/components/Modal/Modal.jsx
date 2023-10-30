import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useEffect } from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import { closeAllModals } from "../../services/slice/modalSlice";
import { useDispatch } from "react-redux";

const modalRoot = document.getElementById("modals");

function Modal({ children }) {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, []);

  return createPortal(
    <ModalOverlay onClose={closeModal}>
      <ModalCloseIcon onClose={closeModal}>{children}</ModalCloseIcon>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element,
};

export default Modal;
