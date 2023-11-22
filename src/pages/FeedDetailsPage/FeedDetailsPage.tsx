import { FC } from "react";
import styles from "./FeedDetailsPage.module.css";
import FeedDetails from "../../components/FeedDetails/FeedDetails";

const FeedDetailsPage: FC = () => {
  return (
    <div className={`mt-15 ${styles.container}`}>
      <FeedDetails center={true}/>
    </div>
  );
};

export default FeedDetailsPage;
