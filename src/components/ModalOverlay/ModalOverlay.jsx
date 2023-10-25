import styles from "./ModalOverlay.module.css";
import PropTypes from 'prop-types'

function ModalOverlay({children, onClose}) {

  return (
    <div className={styles.container}>
      <div
        className={styles.overlay}
        onClick={(e) => e.currentTarget === e.target && onClose()}
      >
        {children}
      </div>
    </div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
}
export default ModalOverlay;
