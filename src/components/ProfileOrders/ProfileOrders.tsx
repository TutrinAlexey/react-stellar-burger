import CardOrder from "../CardOrder/CardOrder";
import styles from "./ProfileOrders.module.css";
import { FC } from "react";

const ProfileOrders: FC = () => {
  return (
    <section>
      <ul className={`custom-scroll ${styles.orders}`}>
        <CardOrder profileCards={true} />
        <CardOrder profileCards={true} />
        <CardOrder profileCards={true} />
        <CardOrder profileCards={true} />
        <CardOrder profileCards={true} />
      </ul>
    </section>
  );
};

export default ProfileOrders;
