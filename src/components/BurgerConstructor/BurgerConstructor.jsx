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
import {
  addIngredients,
  clearIngredients,
} from "../../services/slice/burgerSlice";
import BurgerMain from "../BurgerMain/BurgerMain";
import { v4 } from "uuid";
import { useMemo, memo, useEffect } from "react";
import { fetchOrder } from "../../services/thunk/ingredientsQuery";
import { isLogin, token } from "../../services/selector/authenticationSelector";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { orderLoading } from "../../services/selector/modalSelector";
import { fetchUserInfo } from "../../services/thunk/authenticationQuery";
import { checkUserAuth } from "../../utils/authCheck";
import { setAuthChecked } from "../../services/slice/authenticationSlice";

function BurgerConstructor() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isOrderLoad = useSelector(orderLoading);
  const ingredientsOfBurger = useSelector(burgerIngredients);
  const bunsOfBurger = useSelector(burgerBuns);
  const burgerPrice = useSelector(orderPrice);
  const isAuth = useSelector(isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAuthChecked(false));
    dispatch(checkUserAuth());
  }, []);

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
    const bunsId = bunsOfBurger.map((ingredient) => ingredient._id);
    const ingredientsId = ingredientsOfBurger.map(
      (ingredient) => ingredient._id
    );
    const burgerId = [...bunsId, ...ingredientsId, ...bunsId];
    return burgerId;
  }, [bunsOfBurger, ingredientsOfBurger]);
  
  const handleOrder = () => {
    if (!isAuth) {
      navigate("/login")
    } else {
      dispatch(fetchOrder(burgerIdForOrder));
      dispatch(openOrderModal());
      dispatch(clearIngredients());
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
          {ingredientsOfBurger.map((ingredient, index) => (
            <BurgerMain
              key={ingredient._constId}
              data={ingredient}
              index={index}
            />
          ))}
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
        <Link onClick={handleOrder} to={`/order-info`} state={{ background: location }}>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          disabled={
            bunsOfBurger.length === 0 ||
            ingredientsOfBurger.length === 0 ||
            isOrderLoad
          }
        >
          {isOrderLoad ? ("Оформление") :("Оформить заказ")}
        </Button>
        </Link>
      </div>
    </section>
  );
}

export default memo(BurgerConstructor);
