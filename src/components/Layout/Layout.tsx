import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import styles from "./Layout.module.css";
import { FC } from "react";

const Layout: FC = () => {
  return (
    <div className={styles.container}>
      <AppHeader />
      <AppMain />
    </div>
  );
};

export default Layout;
