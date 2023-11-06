import styles from "./AppMain.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { memo } from "react";

function AppMain() {
  return (
    <main className={`${styles.main}`}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default memo(AppMain);
