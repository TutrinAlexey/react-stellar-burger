import { useSelector } from "react-redux";
import { isLogin } from "../../services/selector/authenticationSelector";
import styles from "./OrderHistory.module.css";
import { Navigate } from "react-router-dom";

function OrderHistory() {
  const isAuth = useSelector(isLogin);
  if (!isAuth) {
    return <Navigate to={"/login"} replace />;
  }
  return <p>Order list</p>;
}

export default OrderHistory;
