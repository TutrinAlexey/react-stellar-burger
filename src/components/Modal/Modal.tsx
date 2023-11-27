import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useEffect, FC } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("modals") as Element;
type ModalProps = {
  onClose?: () => void;
};
const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const closeModal = useCallback(() => {
    navigate(location.state?.background);
  }, [navigate, location]);

  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose ? onClose() : closeModal();
      }
    };
    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, []);

  return createPortal(
    <ModalOverlay onClose={onClose ? onClose : closeModal}>
      <ModalCloseIcon onClose={onClose ? onClose : closeModal}>
        {children}
      </ModalCloseIcon>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
