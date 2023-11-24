import styles from "./Ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DragPreviewImage, useDrag } from "react-dnd";
import { FC, useMemo } from "react";
import {
  burgerBuns,
  burgerIngredients,
} from "../../services/selector/burgerSelector";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TConstructorIngredient,
  TIngredient,
} from "../../utils/types/ingredientType";
import { useAppSelector } from "../../utils/types/hooksTypes";
type IngredientProps = {
  ingredient: TIngredient;
};
const Ingredient: FC<IngredientProps> = ({ ingredient }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const bunsBurger = useAppSelector(
    burgerBuns
  ) as Array<TConstructorIngredient>;
  const ingredientsBurger = useAppSelector(
    burgerIngredients
  ) as Array<TConstructorIngredient>;
  const [{ isDrag }, dragRef, preview] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const openIngredient = () => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };
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
          onClick={openIngredient}
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
};

export default Ingredient;
