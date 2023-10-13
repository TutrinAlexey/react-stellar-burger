import styles from "./AppMain.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import PropTypes from 'prop-types'

function AppMain(props) {
  return (
    <main className={`${styles.main}`}>
      <BurgerIngredients data={props.data} openIngredient={props.openIngredient}></BurgerIngredients>
      <BurgerConstructor data={props.data} openOrder={props.openOrder}></BurgerConstructor>
    </main>
  );
}

AppMain.propTypes = {
  data: PropTypes.array,
  openIngredient: PropTypes.func,
  openOrder: PropTypes.func,
}

export default AppMain;
