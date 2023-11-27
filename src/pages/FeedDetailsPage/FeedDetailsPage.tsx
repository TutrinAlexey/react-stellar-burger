import { FC, useEffect } from "react";
import styles from "./FeedDetailsPage.module.css";
import FeedDetails from "../../components/FeedDetails/FeedDetails";
import { useAppDispatch } from "../../utils/types/hooksTypes";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../utils/types/webSocketTypes";

const FeedDetailsPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "orders/all" });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);
  return (
    <div className={`mt-15 ${styles.container}`}>
      <FeedDetails center={true} />
    </div>
  );
};

export default FeedDetailsPage;
