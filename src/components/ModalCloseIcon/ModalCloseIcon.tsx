import styles from "./ModalCloseIcon.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

type ModalCloseIconProps = {
  onClose: () => void;
};

const ModalCloseIcon: FC<ModalCloseIconProps> = ({ onClose, children }) => {
  return (
    <div className={styles.modal}>
      <button onClick={onClose} className={styles.icon}>
        <CloseIcon type="primary" />
      </button>
      {children}
    </div>
  );
};

export default ModalCloseIcon;
