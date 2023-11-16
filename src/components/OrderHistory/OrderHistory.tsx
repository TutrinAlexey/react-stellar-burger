import { useSelector } from "react-redux";
import { isLogin } from "../../services/selector/authenticationSelector";
import styles from "./OrderHistory.module.css";
import { Navigate } from "react-router-dom";
import { FC } from "react";

const OrderHistory: FC = () => {
  const isAuth = useSelector(isLogin) as boolean;
  if (!isAuth) {
    return <Navigate to={"/login"} replace />;
  }
  return <p>Order list</p>;
};

export default OrderHistory;
