import { FC } from "react";
import styles from "./OrderList.module.css";
import CardOrder from "../CardOrder/CardOrder";

const OrderList: FC = () => {
  return (
    <section className={`${styles.orderList}`}>
      <h2 className={`text text_type_main-large mb-5`}>Лента заказов</h2>
      <ul className={`custom-scroll ${styles.orders}`}>
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
      </ul>
    </section>
  );
};

export default OrderList;
