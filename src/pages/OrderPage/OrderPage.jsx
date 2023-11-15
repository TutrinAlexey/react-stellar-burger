import { useSelector } from "react-redux";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import styles from "./OrderPage.module.css";
import { getOrderInfo } from "../../services/selector/modalSelector";

function OrderPage() {
  const orderInfo = useSelector(getOrderInfo);
  return (
    <div className={`pt-20 ${styles.container}`}>
      <OrderDetails orderInfo={orderInfo} />
    </div>
  );
}

export default OrderPage;
