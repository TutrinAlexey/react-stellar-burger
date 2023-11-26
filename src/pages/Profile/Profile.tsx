import styles from "./Profile.module.css";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Outlet } from "react-router-dom";
import { FC, useEffect } from "react";
import { useAppDispatch } from "../../utils/types/hooksTypes";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../utils/types/webSocketTypes";
import { checkUserAuth } from "../../utils/authCheck";

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    dispatch(checkUserAuth());
  })
  
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
    <div className={`pt-10 ${styles.container}`}>
      <ProfileNavigation />
      <Outlet />
    </div>
  );
};

export default Profile;
