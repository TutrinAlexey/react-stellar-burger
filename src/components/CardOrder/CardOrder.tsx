import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./CardOrder.module.css";
import { FC, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type CardOrderProps = {
  profileCards?: boolean;
};

const CardOrder: FC<CardOrderProps> = ({ profileCards }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dateFromServer = "2022-10-10T17:33:32.877Z";
  const openOrder = useCallback(() => {
    navigate(`/feed/123`, {
      state: { background: location },
    });
  }, [navigate, location]);
  const openProfileOrder = useCallback(() => {
    navigate(`/profile/orders/123`, {
      state: { background: location },
    });
  }, [navigate, location]);
  return (
    <li onClick={profileCards ? openProfileOrder : openOrder}>
      <div
        className={`pt-6 pl-6 pr-6 pb-6 mr-1 ${
          profileCards ? styles.profileCard : styles.card
        }`}
      >
        <div className={` ${styles.top}`}>
          <p className={`text text_type_digits-default`}>#123444</p>
          <FormattedDate
            className={`text text_type_main-default text_color_inactive`}
            date={new Date(dateFromServer)}
          />
        </div>
        <h3 className={`text text_type_main-medium`}>
          Death Star Starship Main бургер
        </h3>
        {profileCards && (
          <p className={`text text_type_main-default ${styles.status}`}>
            Создан
          </p>
        )}
        <div className={styles.bottom}>
          <ul className={styles.ingredients}>
            <li className={` ${styles.ingredient}`}>
              <img
                className={` ${styles.ingredientImg}`}
                src="https://code.s3.yandex.net/react/code/bun-02.png"
                alt="123"
              />
            </li>
            <li className={` ${styles.ingredient}`}>
              <img
                className={` ${styles.ingredientImg}`}
                src="https://code.s3.yandex.net/react/code/bun-02.png"
                alt="123"
              />
            </li>
            <li className={` ${styles.ingredient}`}>
              <img
                className={` ${styles.ingredientImg}`}
                src="https://code.s3.yandex.net/react/code/bun-02.png"
                alt="123"
              />
            </li>
            <li className={` ${styles.ingredient}`}>
              <img
                className={` ${styles.ingredientImg}`}
                src="https://code.s3.yandex.net/react/code/bun-02.png"
                alt="123"
              />
            </li>
            <li className={` ${styles.ingredient}`}>
              <img
                className={` ${styles.ingredientImg}`}
                src="https://code.s3.yandex.net/react/code/bun-02.png"
                alt="123"
              />
            </li>
            <li className={` ${styles.ingredient}`}>
              <img
                className={` ${styles.ingredientImg}`}
                src="https://code.s3.yandex.net/react/code/bun-02.png"
                alt="123"
              />
            </li>
          </ul>
          <p className={`text text_type_digits-default ${styles.price}`}>
            480 <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </li>
  );
};

export default CardOrder;
