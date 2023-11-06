import styles from "./Ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { openIngredientModal } from "../../services/slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { DragPreviewImage, useDrag } from "react-dnd";
import { useMemo } from "react";
import {
  burgerBuns,
  burgerIngredients,
} from "../../services/selector/burgerSelector";
import { ingredientPropType } from "../../utils/prop-types";

function Ingredient({ ingredient }) {
  const dispatch = useDispatch();
  const bunsBurger = useSelector(burgerBuns);
  const ingredientsBurger = useSelector(burgerIngredients);
  const [{ isDrag }, preview, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const counter = useMemo(() => {
    const burger = [...bunsBurger, ...ingredientsBurger, ...bunsBurger];
    return burger.reduce((count, item) => {
      if (ingredient._id === item._id) {
        return (count += 1);
      } else {
        return count;
      }
    }, 0);
  }, [ingredientsBurger, bunsBurger]);

  return (
    <>
      <DragPreviewImage connect={preview} src={ingredient.image} />
      <li className={isDrag ? styles.itemDrag : styles.item} ref={dragRef}>
        {!!counter && (
          <Counter count={counter} size="default" extraClass="m-1" />
        )}
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
    </>
  );
}

Ingredient.propTypes = {
  ingredient: ingredientPropType,
};

export default Ingredient;
