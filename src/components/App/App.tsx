import styles from "./App.module.css";
import { FC, useCallback, useEffect } from "react";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
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
import Feed from "../../pages/Feed/Feed";
import ProfileMain from "../ProfileMain/ProfileMain";
import { checkUserAuth } from "../../utils/authCheck";
import { OnlyAuth, OnlyUnAuth } from "../Protected/Protected";

import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";
import FeedDetailsPage from "../../pages/FeedDetailsPage/FeedDetailsPage";
import FeedDetails from "../FeedDetails/FeedDetails";
import ProfileOrders from "../ProfileOrders/ProfileOrders";
import ProfileDetailPage from "../../pages/ProfileDetailPage/ProfileDetailPage";
import { closeAllModals } from "../../services/slice/modalSlice";

const App: FC = () => {
  const orderOpen = useAppSelector(orderOpenSelector);
  const orderInfo = useAppSelector(orderInfoSelector);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, []);

  const onClose = useCallback(() => {
    dispatch(closeAllModals());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      {orderOpen && (
        <Modal onClose={onClose}>
          <OrderDetails orderInfo={orderInfo} />
        </Modal>
      )}
      <Routes location={location.state?.background || location}>
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
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="feed" element={<Feed />} />
          <Route path="feed/:id" element={<FeedDetailsPage />} />
          <Route
            path="profile/orders/:id"
            element={<OnlyAuth component={<ProfileDetailPage />} />}
          />
          <Route path="profile" element={<OnlyAuth component={<Profile />} />}>
            <Route path="user" element={<ProfileMain />} />
            <Route path="orders" element={<ProfileOrders />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {location.state?.background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="feed/:id"
            element={
              <Modal>
                <FeedDetails />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:id"
            element={
              <OnlyAuth
                component={
                  <Modal>
                    <FeedDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
