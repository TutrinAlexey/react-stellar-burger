import { FC } from "react";
import styles from "./FeedDetails.module.css";
import FeedDetailsIngredient from "../FeedDetailsIngredient/FeedDetailsIngredient";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router";
import { orders } from "../../services/selector/ordersSelector";
import { useAppSelector } from "../../utils/types/hooksTypes";
import { TOrderFeed } from "../../utils/types/orderType";
import { TIngredient, TIngredientSort } from "../../utils/types/ingredientType";
import { getIngredients } from "../../services/selector/ingredientsSelector";

type FeedDetailsProps = {
  center?: boolean;
};

const FeedDetails: FC<FeedDetailsProps> = ({ center }) => {
  const ingredients = useAppSelector(getIngredients);
  const allOrders = useAppSelector(orders);
  const { id } = useParams();

  const order = allOrders?.find((item) => item._id === id) as TOrderFeed;
  const dateFromServer = new Date(order?.createdAt);
  const ingredientsInfo = order?.ingredients.map((ingredient: string) => {
    const filterIngredients = ingredients.find(
      (item) => item._id === ingredient
    );
    return filterIngredients;
  }) as Array<TIngredient>;
  const totalPrice = ingredientsInfo
    ?.map((item) => item?.price)
    .reduce((sum, price) => (sum! += price!));

  const ingredientsInfoSort = ingredientsInfo?.reduce(
    (acc: Array<TIngredientSort>, ingredient) => {
      if (acc.find((item) => item._id === ingredient._id)) {
        return acc.map((element) =>
          element._id === ingredient._id
            ? { ...element, amount: element.amount + 1 }
            : element
        );
      }
      return [...acc, { ...ingredient, amount: 1 }];
    },
    []
  );

  return order ? (
    <div className={`pt-10 pr-10 pl-10 pb-10 ${styles.container}`}>
      <p
        className={`text text_type_digits-default mt-5 mb-10 ${
          center ? styles.center : styles.title
        }`}
      >
        {`#${order.number}`}
      </p>
      <h3 className={`text text_type_main-medium `}>{order.name}</h3>
      <p
        className={`text text_type_main-default mt-2 mb-15 ${
          order.status === "done" && styles.done
        }`}
      >
        {order.status === "pending"
          ? "Готовится"
          : order.status === "done"
          ? "Выполнен"
          : order.status === "created"
          ? "Создан"
          : null}
      </p>
      <p className={`text text_type_main-medium mb-6`}>Состав:</p>
      <ul className={`custom-scroll ${styles.list}`}>
        {ingredientsInfoSort.map(
          (ingredient: TIngredientSort, index: number) => (
            <FeedDetailsIngredient key={index} ingredientInfo={ingredient} />
          )
        )}
      </ul>
      <div className={styles.bottom}>
        <FormattedDate
          className={`text text_type_main-default text_color_inactive `}
          date={dateFromServer}
        />
        <p className={`text text_type_digits-default ${styles.totalPrice}`}>
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  ) : null;
};

export default FeedDetails;
