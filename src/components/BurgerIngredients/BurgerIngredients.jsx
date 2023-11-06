import { useMemo, useCallback, useState, memo } from "react";
import styles from "./BurgerIngredients.module.css";
import IngredientsContainer from "../IngredientsContainer/IngredientsContainer";
import PropTypes from "prop-types";
import { getIngredients } from "../../services/selector/ingredientsSelector";
import { useSelector } from "react-redux";
import Tabs from "../Tabs/Tabs";

function BurgerIngredients() {
  const [value, setValue] = useState(0);
  const ingredients = useSelector(getIngredients);

  const buns = useMemo(
    () => ingredients.filter((el) => el.type === "bun"),
    [ingredients]
  );
  const sauce = useMemo(
    () => ingredients.filter((el) => el.type === "sauce"),
    [ingredients]
  );
  const main = useMemo(
    () => ingredients.filter((el) => el.type === "main"),
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
}

export default memo(BurgerIngredients);
