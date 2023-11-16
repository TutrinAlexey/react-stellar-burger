import styles from "./ModalOverlay.module.css";

import { FC } from "react";

type ModalOverlayProps = {
  onClose: () => void;
};

const ModalOverlay: FC<ModalOverlayProps> = ({ children, onClose }) => {
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
};

export default ModalOverlay;
