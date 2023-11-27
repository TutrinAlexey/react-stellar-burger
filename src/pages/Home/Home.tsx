import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import styles from "./Home.module.css";
import { FC } from "react";

const Home: FC = () => {
  return (
    <div className={`${styles.container}`}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
};

export default Home;
