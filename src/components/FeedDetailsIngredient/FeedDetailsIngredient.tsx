import { FC } from "react";
import styles from "./FeedDetailsIngredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientSort } from "../../utils/types/ingredientType";

type FeedDetailsIngredientProps = {
  ingredientInfo: TIngredientSort
}

const FeedDetailsIngredient: FC<FeedDetailsIngredientProps> = ({ingredientInfo}) => {
  return (
    <li className={`mr-6 ${styles.ingredient}`}>
      <img
        className={` ${styles.ingredientImg}`}
        src={ingredientInfo.image}
        alt={ingredientInfo.name}
      />
      <p className={`text text_type_main-default ${styles.text}`}>{ingredientInfo.name}</p>
      <p className={`text text_type_digits-default ${styles.price}`}>{`${ingredientInfo.amount} x ${ingredientInfo.price}`}<CurrencyIcon type="primary" /></p>
    </li>
  );
};

export default FeedDetailsIngredient;
