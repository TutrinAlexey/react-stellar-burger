import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsContainer from "../IngredientsContainer/IngredientsContainer";
import { data } from "../../utils/data";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("Булки");
  const buns = data.filter((el) => el.type === "bun");
  const sauce = data.filter((el) => el.type === "sauce");
  const main = data.filter((el) => el.type === "main");

  return (
    <section className={`mb-10 ${styles.section}`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <ul className={`${styles.tab}`}>
        <li>
          <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
            Булки
          </Tab>
        </li>
        <li>
          <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
            Соусы
          </Tab>
        </li>
        <li>
          <Tab
            value="Начинки"
            active={current === "Начинки"}
            onClick={setCurrent}
          >
            Начинки
          </Tab>
        </li>
      </ul>
      <ul className={`custom-scroll ${styles.ingredients}`}>
        <IngredientsContainer name="Булки" data={buns}></IngredientsContainer>
        <IngredientsContainer name="Соусы" data={sauce}></IngredientsContainer>
        <IngredientsContainer name="Начинки" data={main}></IngredientsContainer>
      </ul>
    </section>
  );
}

export default BurgerIngredients;
