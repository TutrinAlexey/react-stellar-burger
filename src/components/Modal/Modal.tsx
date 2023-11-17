import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useEffect, FC } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import { closeAllModals } from "../../services/slice/modalSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ingredientInfoSelector } from "../../services/selector/modalSelector";
import { TIngredient } from "../../utils/types/ingredientType";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";

const modalRoot = document.getElementById("modals") as Element;

const Modal: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ingredientInfo = useAppSelector(ingredientInfoSelector) as TIngredient;
  const closeModal = useCallback(() => {
    dispatch(closeAllModals());
    {
      ingredientInfo && navigate("/");
    }
  }, []);

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
