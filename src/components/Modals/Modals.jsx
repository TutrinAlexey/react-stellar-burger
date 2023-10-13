import { createPortal } from "react-dom";
import styles from "./Modals.module.css";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types'

const modalRoot = document.getElementById("modals");

function Modals(props) {
  const closeOnEsc = (e) => {
    if (e.key === "Escape") {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  });

  return createPortal(
    <div style={{ overflow: "hidden" }}>
      <div
        className={styles.overlay}
        onClick={(e) => e.currentTarget === e.target && props.onClose()}
      >
        <div className={styles.modal}>
        <button onClick={props.onClose} className={styles.icon}>
            <CloseIcon type="primary" />
          </button>
          {props.children}
        </div>
      </div>
    </div>,
    modalRoot
  );
}

Modals.propTypes = {
  onClose: PropTypes.func
}

export default Modals;
