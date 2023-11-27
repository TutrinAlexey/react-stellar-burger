import {
  orders,
  total,
  totalToday,
} from "../../services/selector/ordersSelector";
import { useAppSelector } from "../../utils/types/hooksTypes";
import { TOrderFeed } from "../../utils/types/orderType";
import styles from "./FeedInfo.module.css";
import { FC, useMemo } from "react";

const FeedInfo: FC = () => {
  const totalOrders = useAppSelector(total);
  const totalTodayOrders = useAppSelector(totalToday);
  const allOrders = useAppSelector(orders);
  const readyNums = useMemo(() => {
    const filterArray = allOrders?.filter(
      (item: TOrderFeed) => item.status === "done"
    );
    return filterArray
      ?.slice(0, 20)
      .map((item: TOrderFeed) => <li key={item._id}>{item.number}</li>);
  }, [allOrders]);
  const pendingNums = useMemo(() => {
    const filterArray = allOrders?.filter(
      (item: TOrderFeed) => item.status === "pending"
    );
    return filterArray
      ?.slice(0, 20)
      .map((item: TOrderFeed) => <li key={item._id}>{item.number}</li>);
  }, [allOrders]);

  return (
    <section className={`mt-15 ${styles.feedInfo}`}>
      <div className={`mb-15 ${styles.ordersNum}`}>
        <div className={styles.ready}>
          <h3 className={`text text_type_main-medium mb-6`}>Готовы:</h3>
          <ul
            className={`custom-scroll text text_type_digits-default ${styles.listReady}`}
          >
            {readyNums}
          </ul>
        </div>
        <div className={styles.cooking}>
          <h3 className={`text text_type_main-medium mb-6`}>В работе:</h3>
          <ul
            className={`custom-scroll text text_type_digits-default ${styles.listCooking}`}
          >
            {pendingNums}
          </ul>
        </div>
      </div>
      <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
      <p className={`text text_type_digits-large mb-15 ${styles.shadow}`}>
        {totalOrders}
      </p>
      <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
      <p className={`text text_type_digits-large ${styles.shadow}`}>
        {totalTodayOrders}
      </p>
    </section>
  );
};

export default FeedInfo;
