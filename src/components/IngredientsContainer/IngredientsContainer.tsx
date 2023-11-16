import styles from "./IngredientsContainer.module.css";
import Ingredient from "../Ingredient/Ingredient";

import { TIngredient } from "../../utils/types/ingredientType";
import { FC } from "react";

type IngredientsContainerProps = {
  filterIngredients: Array<TIngredient>;
  name: string;
  id: string;
};

const IngredientsContainer: FC<IngredientsContainerProps> = ({
  filterIngredients,
  name,
  id,
}) => {
  return (
    <li id={id}>
      <h2 className="text text_type_main-medium mt-10 mb-6">{name}</h2>
      <ul className={`ml-4 ${styles.list}`}>
        {filterIngredients.map((el) => (
          <Ingredient key={el._id} ingredient={el} />
        ))}
      </ul>
    </li>
  );
};

export default IngredientsContainer;
