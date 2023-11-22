import FeedInfo from "../../components/FeedInfo/FeedInfo";
import OrderList from "../../components/OrderList/OrderList";
import styles from "./Feed.module.css";
import { FC } from "react";

const Feed: FC = () => {
  return (
    <div className={styles.feed}>
      <OrderList />
      <FeedInfo />
    </div>
  );
};

export default Feed;
