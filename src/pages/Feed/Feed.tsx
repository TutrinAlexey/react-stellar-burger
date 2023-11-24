import FeedInfo from "../../components/FeedInfo/FeedInfo";
import OrderList from "../../components/OrderList/OrderList";
import { error, orders } from "../../services/selector/ordersSelector";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../utils/types/webSocketTypes";
import styles from "./Feed.module.css";
import { FC, useEffect } from "react";

const Feed: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "orders/all" });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  const err = useAppSelector(error);
  console.log(err);

  return (
    <div className={styles.feed}>
      <OrderList />
      <FeedInfo />
    </div>
  );
};

export default Feed;
