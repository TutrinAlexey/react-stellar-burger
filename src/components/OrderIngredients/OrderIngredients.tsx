import { number } from "prop-types";
import { TIngredient } from "../../utils/types/ingredientType";
import styles from "./OrderIngredients.module.css";
import {FC} from 'react'

type OrderIngredientsProps = {
    item?: TIngredient;
    num?: number;
    remainIngredients?: number;

}

const OrderIngredients: FC<OrderIngredientsProps> = ({remainIngredients, item, num}) => {
  return (
    <li className={` ${styles.ingredient}`}>
      <img
        className={`${num === 5 ? styles.opacity : styles.ingredientImg}`}
        src={item?.image}
        alt={item?.name}
      />
      {(num === 5 && remainIngredients !== 0) && <p className={`text text_type_digits-default ${styles.amount}`}>{`+${remainIngredients}`}</p>}
    </li>
  );
};

export default OrderIngredients;
