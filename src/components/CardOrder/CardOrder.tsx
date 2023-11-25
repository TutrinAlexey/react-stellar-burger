import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./CardOrder.module.css";
import { FC, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TOrderFeed } from "../../utils/types/orderType";
import { getIngredients } from "../../services/selector/ingredientsSelector";
import { useAppSelector } from "../../utils/types/hooksTypes";
import { TIngredient } from "../../utils/types/ingredientType";
import OrderIngredients from "../OrderIngredients/OrderIngredients";

type CardOrderProps = {
  profileCards?: boolean;
  orderInfo: TOrderFeed;
};

const CardOrder: FC<CardOrderProps> = ({ profileCards, orderInfo }) => {
  const ingredients = useAppSelector(getIngredients) as Array<TIngredient>;
  const navigate = useNavigate();
  const location = useLocation();
  const dateFromServer = orderInfo.createdAt;

  const openOrder = useCallback(() => {
    navigate(`/feed/${orderInfo._id}`, {
      state: { background: location },
    });
  }, [navigate, location]);
  const openProfileOrder = useCallback(() => {
    navigate(`/profile/orders/${orderInfo._id}`, {
      state: { background: location },
    });
  }, [navigate, location]);

  const orderIngredients = orderInfo.ingredients.map((ingredient) => {
    const filterIngredients = ingredients.find(
      (item) => item._id === ingredient
    );
    return filterIngredients;
  });
  const totalPrice = orderIngredients
    .map((item) => item?.price)
    .reduce((sum, price) => (sum! += price!));
  return (
    <li onClick={profileCards ? openProfileOrder : openOrder}>
      <div
        className={`pt-6 pl-6 pr-6 pb-6 mr-1 ${
          profileCards ? styles.profileCard : styles.card
        }`}
      >
        <div className={` ${styles.top}`}>
          <p
            className={`text text_type_digits-default`}
          >{`#${orderInfo.number}`}</p>
          <FormattedDate
            className={`text text_type_main-default text_color_inactive`}
            date={new Date(dateFromServer)}
          />
        </div>
        <h3 className={`text text_type_main-medium`}>{orderInfo.name}</h3>
        {profileCards && (
          <p className={`text text_type_main-default ${orderInfo.status === "done" ? styles.done : styles.status}`}>
            {orderInfo.status === "pending"
          ? "Готовится"
          : orderInfo.status === "done"
          ? "Выполнен"
          : orderInfo.status === "created"
          ? "Создан"
          : null}
          </p>
        )}
        <div className={styles.bottom}>
          <ul className={styles.ingredients}>
            {orderIngredients.slice(0, 6).map((item, index) => (
              <OrderIngredients
                key={index}
                item={item}
                num={index}
                remainIngredients={orderIngredients.slice(6).length}
              />
            ))}
          </ul>
          <p className={`text text_type_digits-default ${styles.price}`}>
            {totalPrice} <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </li>
  );
};

export default CardOrder;
