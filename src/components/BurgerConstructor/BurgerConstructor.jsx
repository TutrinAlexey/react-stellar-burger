import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { openOrderModal } from "../../services/slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  burgerBuns,
  burgerIngredients,
  orderPrice,
} from "../../services/selector/burgerSelector";
import { addIngredients } from "../../services/slice/burgerSlice";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const ingredientsOfBurger = useSelector(burgerIngredients);
  const bunsOfBurger = useSelector(burgerBuns);
  const burgerPrice = useSelector(orderPrice)

  const [{ isDragging }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      const newElement = { ...item };
      dispatch(addIngredients(newElement));
    },
    collect: (monitor) => ({
      isDragging: monitor.isOver(),
    }),
  });

  return (
    <section ref={dropRef} className={`mt-15 ${styles.section}`}>
      {bunsOfBurger || ingredientsOfBurger.length !== 0 ?
      (
      <ul
        className={`custom-scroll ${styles.list}`}
      >
        {bunsOfBurger && (
          <li className="ml-8">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bunsOfBurger.name}
              price={bunsOfBurger.price}
              thumbnail={bunsOfBurger.image}
            />
          </li>
        )}
        {ingredientsOfBurger.map((ingredient) => (
          <li className={styles.element}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
        {bunsOfBurger && (
          <li className="ml-8">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunsOfBurger.name}
              price={bunsOfBurger.price}
              thumbnail={bunsOfBurger.image}
            />
          </li>
        )}
      </ul>
      ): (
        <p className={`text text_type_main-medium ${isDragging ? styles.dragging : styles.text}`}>Перетащите ингредиенты для бургера</p>
      )
      }
      <div className={`mt-10  pr-4 ${styles.bottom}`}>
        <p className={`text text_type_digits-medium ${styles.orderPrice}`}>
          {burgerPrice}
          <CurrencyIcon type="primary" />
        </p>
        <Button
          onClick={() => dispatch(openOrderModal())}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {};

export default BurgerConstructor;
