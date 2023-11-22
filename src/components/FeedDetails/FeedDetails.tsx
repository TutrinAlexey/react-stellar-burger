import { FC } from "react";
import styles from "./FeedDetails.module.css";
import FeedDetailsIngredient from "../FeedDetailsIngredient/FeedDetailsIngredient";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { type } from "os";

type FeedDetailsProps = {
    center?: boolean,
}

const FeedDetails: FC<FeedDetailsProps> = ({center}) => {
  const dateFromServer = "2022-10-10T17:33:32.877Z";
  return (
    <div className={`pt-10 pr-10 pl-10 pb-10 ${styles.container}`}>
      <p className={`text text_type_digits-default mt-5 mb-10 ${center ? styles.center : styles.title}`}>
        #123444
      </p>
      <h3 className={`text text_type_main-medium `}>
        Death Star Starship Main бургер
      </h3>
      <p className={`text text_type_main-default mt-2 mb-15 ${styles.status}`}>
        Выполнен
      </p>
      <p className={`text text_type_main-medium mb-6`}>Состав:</p>
      <ul className={`custom-scroll ${styles.list}`}>
        <FeedDetailsIngredient />
        <FeedDetailsIngredient />
        <FeedDetailsIngredient />
        <FeedDetailsIngredient />
        <FeedDetailsIngredient />
      </ul>
      <div className={styles.bottom}>
        <FormattedDate
          className={`text text_type_main-default text_color_inactive `}
          date={new Date(dateFromServer)}
        />
        <p className={`text text_type_digits-default ${styles.totalPrice}`}>510 <CurrencyIcon type="primary" /></p>
      </div>
    </div>
  );
};

export default FeedDetails;
