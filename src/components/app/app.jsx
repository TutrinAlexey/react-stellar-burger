import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { useEffect, useState } from "react";
import Modals from "../Modals/Modals";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderInfo,
  ingredientInfoSelector,
  ingredientOpenSelector,
  orderOpenSelector,
} from "../../services/selector/modalSelector";
import { fetchIngredients } from "../../services/thunk/ingredientsQuery";

function App() {
  const ingredientOpen = useSelector(ingredientOpenSelector);
  const orderOpen = useSelector(orderOpenSelector);
  const ingredientInfo = useSelector(ingredientInfoSelector);
  const orderInfo = useSelector(getOrderInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppMain />
      {ingredientOpen && (
        <Modals>
          <IngredientDetails dataOfIngredients={ingredientInfo} />
        </Modals>
      )}
      {orderOpen && (
        <Modals>
          <OrderDetails orderInfo={orderInfo} />
        </Modals>
      )}
    </div>
  );
}

export default App;
