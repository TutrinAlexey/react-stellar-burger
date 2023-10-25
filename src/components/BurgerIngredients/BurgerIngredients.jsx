import { useState, useMemo, useEffect } from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsContainer from "../IngredientsContainer/IngredientsContainer";
import PropTypes from "prop-types";
import { getIngredients } from "../../services/selector/ingredientsSelector";
import { useSelector } from "react-redux";

function BurgerIngredients() {
  const [current, setCurrent] = useState("Соусы");
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

  return (
    <section className={`${styles.section}`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <ul className={`${styles.tab}`}>
        <li>
          <a href="#buns" className={styles.link}>
            <Tab
              value="Булки"
              active={current === "Булки"}
              onClick={(e) => {
                setCurrent("Булки");
              }}
            >
              Булки
            </Tab>
          </a>
        </li>
        <li>
          <a href="#sauce" className={styles.link}>
            <Tab
              value="Соусы"
              active={current === "Соусы"}
              onClick={() => {
                setCurrent("Соусы");
              }}
            >
              Соусы
            </Tab>
          </a>
        </li>
        <li>
          <a href="#main" className={styles.link}>
            <Tab
              value="Начинки"
              active={current === "Начинки"}
              onClick={() => {
                setCurrent("Начинки");
              }}
            >
              Начинки
            </Tab>
          </a>
        </li>
      </ul>
      <ul className={`custom-scroll ${styles.ingredients}`}>
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

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
};

export default BurgerIngredients;
