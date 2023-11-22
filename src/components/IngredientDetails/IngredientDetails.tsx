import { useParams } from "react-router";
import { TIngredient } from "../../utils/types/ingredientType";
import styles from "./IngredientDetails.module.css";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../utils/types/hooksTypes";
import { getIngredients } from "../../services/selector/ingredientsSelector";

type IngredientDetailsProps = {
  center?: boolean;
};

const IngredientDetails: FC<IngredientDetailsProps> = ({ center }) => {
  const [dataOfIngredients, setData] = useState<TIngredient>();
  const { id } = useParams();
  const ingredients = useAppSelector(getIngredients);
  useEffect(() => {
    setData(ingredients.find((ingredient) => ingredient._id === id))
  })
  return (
    <div className={`pt-10 pr-10 pl-10 pb-15 ${styles.container}`}>
      <h3
        className={`text text_type_main-large ${
          center ? styles.center : styles.title
        } mt-3 mb-3`}
      >
        Детали ингредиента
      </h3>
      <img src={dataOfIngredients?.image_large} alt={dataOfIngredients?.name} />
      <p className={`text text_type_main-medium mt-4 mb-8 ${styles.name}`}>
        {dataOfIngredients?.name}
      </p>
      <ul className={`${styles.list}`}>
        <li className={` ${styles.listItem}`}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
          >
            Калории,ккал
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.count}`}
          >
            {dataOfIngredients?.calories}
          </p>
        </li>
        <li className={` ${styles.listItem}`}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
          >
            Белки, г
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.count}`}
          >
            {dataOfIngredients?.proteins}
          </p>
        </li>
        <li className={` ${styles.listItem}`}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
          >
            Жиры, г
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.count}`}
          >
            {dataOfIngredients?.fat}
          </p>
        </li>
        <li className={` ${styles.listItem}`}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
          >
            Углеводы, г
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.count}`}
          >
            {dataOfIngredients?.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
