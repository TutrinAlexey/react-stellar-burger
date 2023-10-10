import styles from "./AppMain.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function AppMain(props) {
  return (
    <main className={styles.main}>
      <BurgerIngredients></BurgerIngredients>
    </main>
  );
}

export default AppMain;
