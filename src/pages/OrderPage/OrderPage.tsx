import OrderDetails from "../../components/OrderDetails/OrderDetails";
import styles from "./OrderPage.module.css";
import { orderInfoSelector } from "../../services/selector/modalSelector";
import { FC } from "react";
import { useAppSelector } from "../../utils/types/hooksTypes";
import { TOrderInfo } from "../../utils/types/orderType";

const OrderPage: FC = () => {
  const orderInfo = useAppSelector(orderInfoSelector) as TOrderInfo;
  return (
    <div className={`pt-20 ${styles.container}`}>
      <OrderDetails orderInfo={orderInfo} />
    </div>
  );
};

export default OrderPage;
