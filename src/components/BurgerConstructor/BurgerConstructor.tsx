import styles from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { openOrderModal } from "../../services/slice/modalSlice";
import { useDrop } from "react-dnd";
import {
  burgerBuns,
  burgerIngredients,
  orderPrice,
} from "../../services/selector/burgerSelector";
import {
  addIngredients,
  clearIngredients,
} from "../../services/slice/burgerSlice";
import BurgerMain from "../BurgerMain/BurgerMain";
import { v4 } from "uuid";
import { useMemo, memo, useEffect, FC } from "react";
import { fetchOrder } from "../../services/thunk/ingredientsQuery";
import { isLogin } from "../../services/selector/authenticationSelector";
import { useLocation, useNavigate } from "react-router-dom";
import { orderLoading } from "../../services/selector/modalSelector";
import { checkUserAuth } from "../../utils/authCheck";
import { setAuthChecked } from "../../services/slice/authenticationSlice";
import {
  TConstructorIngredient,
  TIngredient,
} from "../../utils/types/ingredientType";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";

const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isOrderLoad = useAppSelector(orderLoading) as boolean;
  const ingredientsOfBurger = useAppSelector(
    burgerIngredients
  ) as Array<TConstructorIngredient>;
  const bunsOfBurger = useAppSelector(
    burgerBuns
  ) as Array<TConstructorIngredient>;
  const burgerPrice = useAppSelector(orderPrice) as number;
  const isAuth = useAppSelector(isLogin) as boolean;

  useEffect(() => {
    dispatch(setAuthChecked(false));
    dispatch(checkUserAuth());
  }, []);

  const [{ isDragging }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      const newElement = { ...item, _constId: v4() };
      dispatch(addIngredients(newElement));
    },
    collect: (monitor) => ({
      isDragging: monitor.isOver(),
    }),
  });
  const burgerIdForOrder = useMemo(() => {
    const bunsId = bunsOfBurger.map(
      (ingredient: TIngredient) => ingredient._id
    );
    const ingredientsId = ingredientsOfBurger.map(
      (ingredient: TIngredient) => ingredient._id
    );
    const burgerId = [...bunsId, ...ingredientsId, ...bunsId];
    return burgerId;
  }, [bunsOfBurger, ingredientsOfBurger]);

  const handleOrder = () => {
    if (isAuth) {
      dispatch(fetchOrder(burgerIdForOrder));
      dispatch(openOrderModal());
      dispatch(clearIngredients());
      navigate(`/`, {
        state: { background: location },
      })
    } else {
      navigate(`/login`)
    }
  };
  return (
    <section ref={dropRef} className={`mt-15 ${styles.section}`}>
      {bunsOfBurger.length !== 0 || ingredientsOfBurger.length !== 0 ? (
        <ul
          className={`custom-scroll ${
            isDragging ? styles.draggingList : styles.list
          }`}
        >
          {bunsOfBurger.length !== 0 && (
            <li className="ml-8">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bunsOfBurger[0].name + "(вверх)"}
                price={bunsOfBurger[0].price}
                thumbnail={bunsOfBurger[0].image}
              />
            </li>
          )}
          {ingredientsOfBurger.map(
            (ingredient: TConstructorIngredient, index: number) => (
              <BurgerMain
                key={ingredient._constId}
                data={ingredient}
                index={index}
              />
            )
          )}
          {bunsOfBurger.length !== 0 && (
            <li className="ml-8">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bunsOfBurger[0].name + "(низ)"}
                price={bunsOfBurger[0].price}
                thumbnail={bunsOfBurger[0].image}
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
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleOrder}
            disabled={
              bunsOfBurger.length === 0 ||
              ingredientsOfBurger.length === 0 ||
              isOrderLoad
            }
          >
            {isOrderLoad ? "Оформление" : "Оформить заказ"}
          </Button>
      </div>
    </section>
  );
};

export default memo(BurgerConstructor);
