import styles from "./Ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes, { element } from "prop-types";
import { openIngredientModal } from "../../services/slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import {
  burgerBuns,
  burgerIngredients,
} from "../../services/selector/burgerSelector";

function Ingredient({ ingredient }) {
  const dispatch = useDispatch();
  const bunsBurger = useSelector(burgerBuns);
  const ingredientsBurger = useSelector(burgerIngredients);
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const counter = useMemo(() => {
    if (bunsBurger === null) {
      return ingredientsBurger.reduce((count, element) => {
        if (ingredient._id === element._id) {
          return (count += 1);
        }
        return count;
      }, 0);
    } else {
      const burger = [bunsBurger, ...ingredientsBurger, bunsBurger];
      return burger.reduce((count, element) => {
        if (ingredient._id === element._id) {
          return (count += 1);
        }
        return count;
      }, 0);
    }
  }, [ingredientsBurger, bunsBurger]);
  return (
    <li className={isDrag ? styles.itemDrag : styles.item} ref={dragRef}>
      {!!counter && <Counter count={counter} size="default" extraClass="m-1" />}
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
};

export default Ingredient;
