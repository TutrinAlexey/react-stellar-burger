import styles from "./Ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types'

function Ingredient(props) {
  return (
    <li className={styles.item}>
      <div className={styles.countInactive}>
      <Counter count={1} size="default" extraClass="m-1" />
      </div>
      <img
        onClick={props.openIngredient}
        className={`ml-4 mr-4 ${styles.image}`}
        src={props.data.image}
        alt={props.data.name}
      />
      <p className={`text text_type_main-default mt-1 mb-1 ${styles.price}`}>
        {props.data.price}
        <CurrencyIcon type="primary" />
      </p>
      <p className={`text text_type_main-default ${styles.title}`}>
        {props.data.name}
      </p>
    </li>
  );
}

Ingredient.propTypes = {
  data: PropTypes.object,
  openIngredient: PropTypes.func,
}

export default Ingredient;
