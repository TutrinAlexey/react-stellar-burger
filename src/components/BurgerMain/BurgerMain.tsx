import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerMain.module.css";
import { useDrag, useDrop } from "react-dnd";
import { burgerIngredients } from "../../services/selector/burgerSelector";
import {
  deleteIngredients,
  swapIngredients,
} from "../../services/slice/burgerSlice";
import { TConstructorIngredient } from "../../utils/types/ingredientType";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";

type BurgerMainProps = { data: TConstructorIngredient; index: number };

const BurgerMain: FC<BurgerMainProps> = ({ data, index }) => {
  const ingredientsOfBurger = useAppSelector(
    burgerIngredients
  ) as Array<TConstructorIngredient>;

  const dispatch = useAppDispatch();

  const findIndex = (item: TConstructorIngredient) => {
    return ingredientsOfBurger.indexOf(item);
  };

  const [{ isDragStart }, dragRef] = useDrag({
    type: "sort",
    item: { ingredient: data },
    collect: (monitor) => ({
      isDragStart: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "sort",
    hover(ingredient: TConstructorIngredient) {
      if (ingredient._constId === data._constId) return;
      dispatch(
        swapIngredients({
          indexFrom: findIndex(ingredient),
          indexTo: index,
          ingredient: ingredient,
        })
      );
    },
  });

  return (
    <li
      ref={(node) => dropRef(dragRef(node))}
      className={isDragStart ? styles.opacity : styles.element}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => dispatch(deleteIngredients(data._constId))}
      />
    </li>
  );
};

export default BurgerMain;
