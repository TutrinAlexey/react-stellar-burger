import styles from "./ModalCloseIcon.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

function ModalCloseIcon({onClose, ingredientInfo}) {

  return (
    <div className={styles.modal}>
      <button onClick={onClose} className={styles.icon}>
        <CloseIcon type="primary" />
      </button>
      {ingredientInfo}
    </div>
  );
}

ModalCloseIcon.propTypes = {
  onClose: PropTypes.func,
  ingredientInfo: PropTypes.element,
}

export default ModalCloseIcon;
