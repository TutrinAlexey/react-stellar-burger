import styles from "./OrderDetails.module.css";
import acceptOrderIcon from "../../images/graphics.svg";

function ModalOrder(props) {

  return (
    <div className={`pt-15 pr-25 pb-30 pl-25 ${styles.container}`}>
          <h3 className={`text text_type_digits-large mt-15 mb-8`}>034536</h3>
          <p className={`text text_type_main-medium`}>идентификатор заказа</p>
          <img
            className={`mt-15 mb-15 ${styles.img}`}
            src={acceptOrderIcon}
            alt="Order accept icon"
          />
          <p className={`text text_type_main-default mb-2`}>
            Ваш заказ начали готовить
          </p>
          <p className={`text text_type_main-default text_color_inactive`}>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
  );
}

export default ModalOrder;
