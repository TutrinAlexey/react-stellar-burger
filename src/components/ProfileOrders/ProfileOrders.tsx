import { orders } from "../../services/selector/ordersSelector";
import { useAppSelector } from "../../utils/types/hooksTypes";
import CardOrder from "../CardOrder/CardOrder";
import styles from "./ProfileOrders.module.css";
import { FC } from "react";

const ProfileOrders: FC = () => {
  const allOrders = useAppSelector(orders);
  const reverseOrders = allOrders && [...allOrders].reverse();

  return (
    <section>
      <ul className={`custom-scroll ${styles.orders}`}>
        {reverseOrders?.map((order) => (
          <CardOrder key={order._id} profileCards={true} orderInfo={order} />
        ))}
      </ul>
    </section>
  );
};

export default ProfileOrders;
