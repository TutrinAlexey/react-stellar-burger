import styles from "./ProfileDetailPage.module.css";
import { FC, useEffect } from "react";
import { useAppDispatch } from "../../utils/types/hooksTypes";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../utils/types/webSocketTypes";
import FeedDetails from "../../components/FeedDetails/FeedDetails";

const ProfileDetailPage: FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `orders?token=${accessToken?.replace("Bearer ", "")}`,
    });
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

export default ProfileDetailPage;
