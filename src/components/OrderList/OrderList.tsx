import { FC } from "react";
import styles from "./OrderList.module.css";
import CardOrder from "../CardOrder/CardOrder";
import { orders } from "../../services/selector/ordersSelector";
import { useAppSelector } from "../../utils/types/hooksTypes";
import { TOrderFeed } from "../../utils/types/orderType";

const OrderList: FC = () => {
  const allOrders = useAppSelector(orders);
  
  return (
    <section className={`${styles.orderList}`}>
      <h2 className={`text text_type_main-large mb-5`}>Лента заказов</h2>
      <ul className={`custom-scroll ${styles.orders}`}>
        {allOrders && allOrders.map((order:TOrderFeed) => <CardOrder key={order._id} orderInfo={order} />)}
      </ul>
    </section>
  );
};

export default OrderList;
