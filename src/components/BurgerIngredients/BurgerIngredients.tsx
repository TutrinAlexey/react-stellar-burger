import { useMemo, useCallback, useState, memo, FC } from "react";
import styles from "./BurgerIngredients.module.css";
import IngredientsContainer from "../IngredientsContainer/IngredientsContainer";
import { getIngredients } from "../../services/selector/ingredientsSelector";
import { useSelector } from "react-redux";
import Tabs from "../Tabs/Tabs";
import { TIngredient } from "../../utils/types/ingredientType";

const BurgerIngredients: FC = () => {
  const [value, setValue] = useState(0);
  const ingredients = useSelector(getIngredients) as Array<TIngredient>;

  const buns = useMemo(
    () => ingredients.filter((el: TIngredient) => el.type === "bun"),
    [ingredients]
  );
  const sauce = useMemo(
    () => ingredients.filter((el: TIngredient) => el.type === "sauce"),
    [ingredients]
  );
  const main = useMemo(
    () => ingredients.filter((el: TIngredient) => el.type === "main"),
    [ingredients]
  );

  const scrollValue = useCallback((e) => {
    setValue(e.currentTarget.scrollTop);
  }, []);

  return (
    <section className={`${styles.section}`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <Tabs value={value} />
      <ul
        className={`custom-scroll ${styles.ingredients}`}
        onScroll={scrollValue}
      >
        <IngredientsContainer id="buns" name="Булки" filterIngredients={buns} />
        <IngredientsContainer
          id="sauce"
          name="Соусы"
          filterIngredients={sauce}
        />
        <IngredientsContainer
          id="main"
          name="Начинки"
          filterIngredients={main}
        />
      </ul>
    </section>
  );
};

export default memo(BurgerIngredients);
