import styles from "./App.module.css";
import { FC, useEffect } from "react";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
  ingredientInfoSelector,
  ingredientOpenSelector,
  orderInfoSelector,
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
import { OnlyAuth, OnlyUnAuth } from "../Protected/Protected";
import { TIngredient } from "../../utils/types/ingredientType";
import { TOrderInfo } from "../../utils/types/orderType";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";

const App: FC = () => {
  const ingredientOpen = useAppSelector(ingredientOpenSelector) as boolean;
  const orderOpen = useAppSelector(orderOpenSelector) as boolean;
  const ingredientInfo = useAppSelector(ingredientInfoSelector) as TIngredient;
  const orderInfo = useAppSelector(orderInfoSelector) as TOrderInfo;
  const location = useLocation();

  const background =
    ingredientOpen || orderOpen ? location.state.background : null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      {orderOpen && (
        <Modal>
          <OrderDetails orderInfo={orderInfo} />
        </Modal>
      )}
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<OnlyUnAuth component={<Login />} />} />
          <Route
            path="register"
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            path="forgot-password"
            element={<OnlyUnAuth component={<ForgotPass />} />}
          />
          <Route
            path="reset-password"
            element={<OnlyUnAuth component={<ResetPass />} />}
          />
          <Route path="order-list" element={<OrderList />} />
          <Route path="profile" element={<Profile />}>
            <Route
              path="user"
              element={<OnlyAuth component={<ProfileMain />} />}
            />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal>
                <IngredientDetails dataOfIngredients={ingredientInfo} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
