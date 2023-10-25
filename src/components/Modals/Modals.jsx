import { createPortal } from "react-dom";
import styles from "./Modals.module.css";
import { useEffect } from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import Modal from "../Modal/Modal";
import { closeAllModals } from "../../services/slice/modalSlice";
import { useDispatch } from "react-redux";

const modalRoot = document.getElementById("modals");

function Modals({ children }) {
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
      <Modal ingredientInfo={children} onClose={closeModal}></Modal>
    </ModalOverlay>,
    modalRoot
  );
}

Modals.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
};

export default Modals;
