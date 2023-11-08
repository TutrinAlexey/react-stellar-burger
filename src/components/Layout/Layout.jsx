import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.container}>
      <AppHeader />
      <AppMain />
    </div>
  );
}

export default Layout;
