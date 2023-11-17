import styles from "./Profile.module.css";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "../../services/selector/authenticationSelector";
import { FC } from "react";
import { useAppSelector } from "../../utils/types/hooksTypes";

const Profile: FC = () => {
  const isAuth = useAppSelector(isLogin) as boolean;
  if (!isAuth) {
    return <Navigate to={"/login"} replace />;
  }
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ProfileNavigation />
        <Outlet />
      </div>
    </section>
  );
};

export default Profile;
