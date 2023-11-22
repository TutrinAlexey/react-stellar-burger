import { FC } from "react";
import styles from "./FeedDetailsIngredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const FeedDetailsIngredient: FC = () => {
  return (
    <li className={`mr-6 ${styles.ingredient}`}>
      <img
        className={` ${styles.ingredientImg}`}
        src="https://code.s3.yandex.net/react/code/bun-02.png"
        alt="123"
      />
      <p className={`text text_type_main-default ${styles.text}`}>Флюоресцентная булка R2-D3</p>
      <p className={`text text_type_digits-default ${styles.price}`}>2 x 20 <CurrencyIcon type="primary" /></p>
    </li>
  );
};

export default FeedDetailsIngredient;
