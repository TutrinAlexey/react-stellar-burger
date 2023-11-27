import styles from "./Profile.module.css";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Outlet } from "react-router-dom";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/types/hooksTypes";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../utils/types/webSocketTypes";
import { connected } from "../../services/selector/ordersSelector";

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const connect = useAppSelector(connected);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `orders?token=${accessToken?.replace("Bearer ", "")}`,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);
  return connect ? (
    <div className={`pt-10 ${styles.container}`}>
      <ProfileNavigation />
      <Outlet />
    </div>
  ) : null;
};

export default Profile;
