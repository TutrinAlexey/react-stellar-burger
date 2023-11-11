import styles from "./App.module.css";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
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
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPass from "../../pages/ForgotPass/ForgotPass";
import ResetPass from "../../pages/ResetPass/ResetPass";
import Profile from "../../pages/Profile/Profile";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import NotFound from "../../pages/NotFound/NotFound";
import Home from "../../pages/Home/Home";
import Layout from "../Layout/Layout";
import OrderList from "../../pages/OrderList/OrderList";
import ProfileMain from "../ProfileMain/ProfileMain";
import OrderHistory from "../OrderHistory/OrderHistory";
import OrderPage from "../../pages/OrderPage/OrderPage";
import { checkUserAuth } from "../../utils/authCheck";

function App() {
  const ingredientOpen = useSelector(ingredientOpenSelector);
  const orderOpen = useSelector(orderOpenSelector);
  const ingredientInfo = useSelector(ingredientInfoSelector);
  const orderInfo = useSelector(getOrderInfo);
  const location = useLocation();

  const background =
    ingredientOpen || orderOpen ? location.state.background : null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      {ingredientOpen && (
        <Modal>
          <IngredientDetails dataOfIngredients={ingredientInfo} />
        </Modal>
      )}
      {orderOpen && (
        <Modal>
          <OrderDetails orderInfo={orderInfo} />
        </Modal>
      )}
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPass />} />
          <Route path="reset-password" element={<ResetPass />} />
          <Route path="order-list" element={<OrderList />} />
          <Route path="profile" element={<Profile />}>
            <Route path="user" element={<ProfileMain />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="order-info/" element={<OrderPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
