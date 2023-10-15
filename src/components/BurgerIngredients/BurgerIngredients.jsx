import { useState, useMemo, useEffect } from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsContainer from "../IngredientsContainer/IngredientsContainer";
import PropTypes from "prop-types";

function BurgerIngredients({ ingredients, openIngredient }) {
  const [current, setCurrent] = useState("Булки");
  const bunsSector = useMemo(() => document.getElementById("buns"),[current]);
  const sauceSector = useMemo(() => document.getElementById("sauce"),[current]);
  const toppingSector = useMemo(() => document.getElementById("main"),[current]);

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
          <Tab
            value="Булки"
            active={current === "Булки"}
            onClick={() => {
              setCurrent("Булки");
              bunsSector.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Булки
          </Tab>
        </li>
        <li>
          <Tab
            value="Соусы"
            active={current === "Соусы"}
            onClick={() => {
              setCurrent("Соусы");
              sauceSector.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Соусы
          </Tab>
        </li>
        <li>
          <Tab
            value="Начинки"
            active={current === "Начинки"}
            onClick={() => {
              setCurrent("Начинки");
              toppingSector.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Начинки
          </Tab>
        </li>
      </ul>
      <ul className={`custom-scroll ${styles.ingredients}`}>
        <IngredientsContainer
          id="buns"
          openIngredient={openIngredient}
          name="Булки"
          filterIngredients={buns}
        />
        <IngredientsContainer
          id="sauce"
          openIngredient={openIngredient}
          name="Соусы"
          filterIngredients={sauce}
        />
        <IngredientsContainer
          id="main"
          openIngredient={openIngredient}
          name="Начинки"
          filterIngredients={main}
        />
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
  openIngredient: PropTypes.func,
};

export default BurgerIngredients;
