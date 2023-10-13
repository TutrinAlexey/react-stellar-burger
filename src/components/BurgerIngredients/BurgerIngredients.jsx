import { useState } from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsContainer from "../IngredientsContainer/IngredientsContainer";
import PropTypes from 'prop-types'

function BurgerIngredients(props) {
  const [current, setCurrent] = useState("Булки");
  
  const buns = props.data.filter((el) => el.type === "bun");
  const sauce = props.data.filter((el) => el.type === "sauce");
  const main = props.data.filter((el) => el.type === "main");

  return (
    <section className={`${styles.section}`}>
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
        <IngredientsContainer openIngredient={props.openIngredient} name="Булки" data={buns}></IngredientsContainer>
        <IngredientsContainer openIngredient={props.openIngredient} name="Соусы" data={sauce}></IngredientsContainer>
        <IngredientsContainer openIngredient={props.openIngredient} name="Начинки" data={main}></IngredientsContainer>
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array,
  openIngredient: PropTypes.func,
}

export default BurgerIngredients;
