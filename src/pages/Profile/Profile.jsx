import {
  Input,
  Button,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Profile.module.css";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import ProfileMain from "../../components/ProfileMain/ProfileMain";
import OrderHistory from "../../components/OrderHistory/OrderHistory";

function Profile() {

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ProfileNavigation explanation={"В этом разделе вы можете изменить свои персональные данные"} />
        <Routes>
          <Route path="/" element={<ProfileMain />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </div>
    </section>
  );
}

export default Profile;
