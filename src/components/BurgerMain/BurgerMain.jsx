import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerMain.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { burgerIngredients } from "../../services/selector/burgerSelector";
import {
  deleteIngredients,
  swapIngredients,
} from "../../services/slice/burgerSlice";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

function BurgerMain({ data, index }) {
  const ingredientsOfBurger = useSelector(burgerIngredients);

  const dispatch = useDispatch();

  const findIndex = (item) => {
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
    hover({ ingredient }) {
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
}

BurgerMain.propTypes = {
  data: ingredientPropType,
  index: PropTypes.number,
};

export default BurgerMain;
