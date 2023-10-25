import styles from "./Ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types'
import { openIngredientModal } from "../../services/slice/modalSlice";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";


function Ingredient({ingredient}) {
  const dispatch = useDispatch();
  
  const [{isDragStart}, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragStart: monitor.isDragging(),
    })
  })


  return (
    <li className={styles.item} ref={dragRef}>
      <div className={styles.countInactive}>
      <Counter count={1} size="default" extraClass="m-1" />
      </div>
      <img
        onClick={() => dispatch(openIngredientModal(ingredient))}
        className={`ml-4 mr-4 ${styles.image}`}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <p className={`text text_type_main-default mt-1 mb-1 ${styles.price}`}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </p>
      <p className={`text text_type_main-default ${styles.title}`}>
        {ingredient.name}
      </p>
    </li>
  );
}

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
  }),
  openIngredient: PropTypes.func,
}

export default Ingredient;
