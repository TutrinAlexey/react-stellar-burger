import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useEffect, FC } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";
import { orderOpenSelector } from "../../services/selector/modalSelector";
import { closeAllModals } from "../../services/slice/modalSlice";

const modalRoot = document.getElementById("modals") as Element;

const Modal: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const orderOpen = useAppSelector(orderOpenSelector);
  const navigate = useNavigate();
  const location = useLocation();
  const closeModal = useCallback(() => {
    if (orderOpen) {
      dispatch(closeAllModals());
    }
    navigate(location.state?.background);
  }, [navigate, location]);

  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
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
};

export default Modal;
