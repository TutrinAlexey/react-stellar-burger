import styles from "./Profile.module.css";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "../../services/selector/authenticationSelector";
import { useSelector } from "react-redux";

function Profile() {
  const isAuth = useSelector(isLogin);
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
}

export default Profile;
