import styles from "./AppMain.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function AppMain() {
  return (
    <main className={`${styles.main}`}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default AppMain;
