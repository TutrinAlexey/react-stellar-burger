import styles from "./AppMain.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import PropTypes from 'prop-types'

function AppMain({ingredientsFromApi, openIngredient, openOrder}) {
  return (
    <main className={`${styles.main}`}>
      <BurgerIngredients ingredients={ingredientsFromApi} openIngredient={openIngredient} />
      <BurgerConstructor ingredients={ingredientsFromApi} openOrder={openOrder} />
    </main>
  );
}

AppMain.propTypes = {
  ingredientsFromApi: PropTypes.arrayOf(PropTypes.object),
  openIngredient: PropTypes.func,
  openOrder: PropTypes.func,
}

export default AppMain;
