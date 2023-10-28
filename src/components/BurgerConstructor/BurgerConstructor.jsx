import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
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
import BurgerMain from "../BurgerMain/BurgerMain";
import { v4 } from "uuid";
import { useMemo } from "react";
import { fetchOrder } from "../../services/thunk/ingredientsQuery";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const ingredientsOfBurger = useSelector(burgerIngredients);
  const bunsOfBurger = useSelector(burgerBuns);
  const burgerPrice = useSelector(orderPrice);
  
  const [{ isDragging }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      const newElement = { ...item, _constId: v4() };
      dispatch(addIngredients(newElement));
    },
    collect: (monitor) => ({
      isDragging: monitor.isOver(),
    }),
  });

  const burgerIdForOrder = useMemo(() => {
    const burger = bunsOfBurger && [bunsOfBurger, ...ingredientsOfBurger, bunsOfBurger];
    const burgerId = burger && burger.map((ingredient) => ingredient._id)
    return burgerId
  }, [bunsOfBurger, ingredientsOfBurger])

  const handleOrder = () => {
    dispatch(fetchOrder(burgerIdForOrder));
    dispatch(openOrderModal());
  }
  return (
    <section ref={dropRef} className={`mt-15 ${styles.section}`}>
      {bunsOfBurger || ingredientsOfBurger.length !== 0 ? (
        <ul
          className={`custom-scroll ${
            isDragging ? styles.draggingList : styles.list
          }`}
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
          {ingredientsOfBurger.map((ingredient, index) => (
            <BurgerMain
              key={ingredient._constId}
              data={ingredient}
              index={index}
            />
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
      ) : (
        <p
          className={`text text_type_main-medium ${
            isDragging ? styles.draggingText : styles.text
          }`}
        >
          Перетащите ингредиенты для бургера
        </p>
      )}
      <div className={`mt-10  pr-4 ${styles.bottom}`}>
        <p className={`text text_type_digits-medium ${styles.orderPrice}`}>
          {burgerPrice}
          <CurrencyIcon type="primary" />
        </p>
        {bunsOfBurger ? (
          <Button
            onClick={handleOrder}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Оформить заказ
          </Button>
        ) : (
          <Button
            onClick={handleOrder}
            htmlType="button"
            type="primary"
            size="medium"
            disabled
          >
            Оформить заказ
          </Button>
        )}
      </div>
    </section>
  );
}

export default BurgerConstructor;
