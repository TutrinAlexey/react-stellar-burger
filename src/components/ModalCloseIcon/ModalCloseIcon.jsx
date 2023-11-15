import styles from "./ModalCloseIcon.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function ModalCloseIcon({ onClose, children }) {
  return (
    <div className={styles.modal}>
      <button onClick={onClose} className={styles.icon}>
        <CloseIcon type="primary" />
      </button>
      {children}
    </div>
  );
}

ModalCloseIcon.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
};

export default ModalCloseIcon;
