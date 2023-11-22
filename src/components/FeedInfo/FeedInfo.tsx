import styles from "./FeedInfo.module.css";
import { FC } from "react";

const FeedInfo: FC = () => {
  return (
    <section className={`mt-15 ${styles.feedInfo}`}>
      <div className={`mb-15 ${styles.ordersNum}`}>
        <div className={styles.ready}>
          <h3 className={`text text_type_main-medium mb-6`}>Готовы:</h3>
          <ul
            className={`custom-scroll text text_type_digits-default ${styles.listReady}`}
          >
            <li>123456</li>
            <li>123456</li>
            <li>123456</li>
            <li>123456</li>
            <li>123456</li>
            <li>123456</li>
            <li>123456</li>
            <li>123456</li>
          </ul>
        </div>
        <div className={styles.cooking}>
          <h3 className={`text text_type_main-medium mb-6`}>В работе:</h3>
          <ul
            className={`custom-scroll text text_type_digits-default ${styles.listCooking}`}
          >
            <li>123456</li>
            <li>123456</li>
            <li>123456</li>
            <li>123456</li>
            <li>123456</li>
            <li>123456</li>
          </ul>
        </div>
      </div>
        <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
        <p className={`text text_type_digits-large mb-15 ${styles.shadow}`}>28 752</p>
        <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${styles.shadow}`}>138</p>
    </section>
  );
};

export default FeedInfo;
