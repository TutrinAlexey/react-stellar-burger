import { isLogin } from "../../services/selector/authenticationSelector";
import styles from "./OrderHistory.module.css";
import { Navigate } from "react-router-dom";
import { FC } from "react";
import { useAppSelector } from "../../utils/types/hooksTypes";

const OrderHistory: FC = () => {
  const isAuth = useAppSelector(isLogin) as boolean;
  if (!isAuth) {
    return <Navigate to={"/login"} replace />;
  }
  return <p>Order list</p>;
};

export default OrderHistory;
