import styles from "./Profile.module.css";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Outlet } from "react-router-dom";

function Profile() {
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
